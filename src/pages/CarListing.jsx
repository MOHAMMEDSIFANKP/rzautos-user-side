import React from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import carData from "../assets/data/carData";
import styled from "styled-components";

const CarListing = () => {
  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />
      <Section>
        <Container>
          <Row>
            <Col lg="12" className="filter-and-search pb-4 d-flex align-items-center justify-content-between gap-3">
              <FilterBox>
                <div className="d-flex align-items-center gap-3">
                  <span className="span d-flex align-items-center gap-2">
                  <i class="ri-sort-asc"></i> 
                  </span>
                  <StyledSelect>
                    <option>Order by</option>
                    <option value="low">Low to High</option>
                    <option value="high">High to Low</option>
                  </StyledSelect>
                  <StyledSelect>
                    <option>Transmission</option>
                    <option value="low">Petrol</option>
                  </StyledSelect>
                  <StyledSelect>
                    <option>Color</option>
                    <option value="low">Balck</option>
                    <option value="high">Blue</option>
                  </StyledSelect>
                </div>
              </FilterBox>
              <SearchBox>
                <input type="text" className="searchTerm" placeholder="What are you looking for?"/>
                <button type="submit" className="searchButton">
                <i class="ri-search-line"></i>
                </button>
              </SearchBox>
            </Col>

            {carData.map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </Section>
    </Helmet>
  );
};

export default CarListing;

const Section = styled.section`
  @media (max-width:767px){
    .filter-and-search{
      display: flex;
      flex-direction: column;
    }
  }
`

const FilterBox = styled.div`
  @media (max-width:767px){
    width: 100%;

  }
`

const SearchBox = styled.div`
  position: relative;
  display: flex;
  @media (max-width:767px){
    width: 100%;
  }
  .searchTerm {
    width: 100%;
    border: 3px solid var(--primary-cl);
    border-right: none;
    padding: 5px ;
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

const StyledSelect = styled.select`
  padding: 5px;
  border: 1px solid var(--primary-cl);
  border-radius: 5px;
  outline: none;
  background: #fff;
  color: #9DBFAF;
  font-size: 16px;
  cursor: pointer;

  &:focus {
    color: var(--primary-cl);
    border-color: var(--primary-cl);
  }

  option {
    color: #000;
  }
  @media (max-width:767px){
    width: 100%;
    gap: 10px !important;
  }
`;
