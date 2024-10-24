import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import styled from "styled-components";
import Select from 'react-select';
import { FuelTypesApi, getCarsApi, getSeoApi, TransmissionApi } from "../services/services";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Skelten from "../components/UI/Skelten";
import debounce from "lodash.debounce";

const CarListing = () => {
  const [filters, setFilters] = useState({
    price: null,
    transmission: null,
    fuelType: null,
    search: ''
  });
  const [carData, setCarData] = useState(null);
  const [seoData, setSeoData] = useState({});
  const [transmissionOptions, setTransmissionOptions] = useState([]);
  const [fuelTypeOptions, setFuelTypeOptions] = useState([]);

  // Fetch car data with memoized debounce
  const fetchData = useCallback(debounce(async () => {
    try {
      const { price, transmission, fuelType, search } = filters;
      const res = await getCarsApi('all', search, transmission?.value || "", fuelType?.value || "", price?.value || "");
      const { data, StatusCode } = res.data;
      if (StatusCode === 6000) {
        setCarData(data);
      } else {
        setCarData([]);
      }
    } catch (error) {
      setCarData([]);
    }
  }, 300), [filters]);

  // Fetch SEO data
  const fetchSeoData = useCallback(async () => {
    try {
      const res = await getSeoApi('/cars');
      const { data, StatusCode } = res.data;
      if (StatusCode === 6000) {
        setSeoData(data[0]);
      } else {
        setSeoData({});
      }
    } catch (error) {
      setSeoData({});
    }
  }, []);

  // Fetch filter options
  const fetchFilterData = useCallback(async () => {
    try {
      const [transRes, fuelRes] = await Promise.all([TransmissionApi(), FuelTypesApi()]);
      if (transRes.data.StatusCode === 6000) {
        setTransmissionOptions(transRes.data.data.map(trans => ({
          value: trans.transmission,
          label: trans.transmission,
        })));
      }
      if (fuelRes.data.StatusCode === 6000) {
        setFuelTypeOptions(fuelRes.data.data.map(fuel => ({
          value: fuel.fuel_type,
          label: fuel.fuel_type,
        })));
      }
    } catch (error) {
      console.error("Error fetching filter data:", error);
      setTransmissionOptions([]);
      setFuelTypeOptions([]);
    }
  }, []);

  useEffect(() => {
    fetchSeoData();
    fetchFilterData();
    window.scrollTo(0, 0);
    AOS.init({
      duration: 1000,
      once: true
    });
  }, [fetchSeoData, fetchFilterData]);

  useEffect(() => {
    fetchData();
  }, [filters, fetchData]);

  const handleFilterChange = (filterName, option) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: option,
    }));
  };

  const clearHandler = () => {
    setFilters({
      price: null,
      transmission: null,
      fuelType: null,
      search: ''
    });
  };

  // Moved custom styles outside to prevent recreation on every render
  const customStyles = useMemo(() => ({
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#000d6b' : provided.borderColor,
      boxShadow: state.isFocused ? '0 0 0 1px #000d6b' : provided.boxShadow,
      '&:hover': {
        borderColor: '#000d6b'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#000d6b'
        : state.isFocused
          ? '#E5E5E5'
          : 'white',
      color: state.isSelected
        ? 'white'
        : '#000d6b',
      '&:hover': {
        backgroundColor: '#E5E5E5',
        color: '#000d6b'
      }
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#000d6b'
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 1000,
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 1000,
    }),
  }), []);

  return (
    <Helmet title={seoData?.meta_title || "Cars"}>
      <CommonSection title="Car Listing" />
      <Section>
        <Container>
          <Row>
            <Col lg="12" className="filter-and-search pb-4 d-flex align-items-center justify-content-between z-1 gap-3" data-aos="fade-left">
              <FilterBox>
                <Select
                  value={filters.price}
                  onChange={(option) => handleFilterChange('price', option)}
                  options={[
                    { value: 'low', label: 'Low' },
                    { value: 'high', label: 'High' }
                  ]}
                  placeholder="Choose a price range..."
                  styles={customStyles}
                />
                <Select
                  value={filters.transmission}
                  onChange={(option) => handleFilterChange('transmission', option)}
                  options={transmissionOptions}
                  placeholder="Choose transmission..."
                  styles={customStyles}
                />
                <Select
                  value={filters.fuelType}
                  onChange={(option) => handleFilterChange('fuelType', option)}
                  options={fuelTypeOptions}
                  placeholder="Choose fuel type..."
                  styles={customStyles}
                />
                <SearchBox>
                  <input
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    type="text"
                    className="searchTerm"
                    value={filters.search}
                    placeholder="What are you looking for?"
                  />
                  <button type="submit" className="searchButton">
                    <i className="ri-search-line"></i>
                  </button>
                </SearchBox>
                <ClearBtn onClick={clearHandler}>
                  Clear
                </ClearBtn>
              </FilterBox>
            </Col>

            {carData === null ? (
              <Skelten />
            ) : carData.length === 0 ? (
              <DataNotFound>No cars found</DataNotFound>  
            ) : (
              carData.map((item) => (
                <CarItem item={item} key={item.id} />
              ))
            )}

          </Row>
        </Container>
      </Section>
    </Helmet>
  );
};

export default React.memo(CarListing);

const Section = styled.section`
  @media (max-width:767px){
    .filter-and-search{
      display: flex;
      flex-direction: column;
    }
  }
`;

const FilterBox = styled.div`
  border: 2px solid #E5E5E5;
  width: 100%;
  border-radius:6px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 80px;
  gap: 20px;
  padding: 10px;

  @media (max-width:1439px){
    grid-template-columns: repeat(2,1fr);
  }
  @media (max-width:767px){
    grid-template-columns: repeat(1,1fr);
  }
`;

const SearchBox = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  .searchTerm {
    width: 100%;
    border: 3px solid #E5E5E5;
    border-right: none;
    padding: 4px ;
    border-radius: 5px 0 0 5px;
    outline: none;
    color: #9DBFAF;
  }

  .searchTerm:focus{
    color: var(--primary-cl);
  }

  .searchButton {
    width: 40px;
    border: 1px solid var(--primary-cl);
    background: var(--primary-cl);
    text-align: center;
    color: #fff;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    font-size: 20px;
  }
`

const ClearBtn = styled.button`
  background-color: transparent;
  border-radius: 6px;
  border: 1px solid #E5E5E5;
  height: 36px;
  width: 100%;
  text-align: center;
  color: #000000b2;
  transition: background-color 0.3s ease, color 0.3s ease; 
  &:hover{
    background-color: var(--primary-cl);
    color: white;
  }
`

const DataNotFound = styled.div`
  height: 300px;
`