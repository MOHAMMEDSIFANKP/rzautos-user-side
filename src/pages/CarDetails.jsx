import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import styled from "styled-components";
import AOS from 'aos';
import 'aos/dist/aos.css';

import Helmet from "../components/Helmet/Helmet";
import BookingForm from "../components/UI/BookingForm";
import Carousel from "../components/UI/Carousel";
import { getCarDetailsApi } from "../services/services";

const AmenityList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;

  @media (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const CarDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [carInfo, setCarInfo] = useState({});
  const [carImages, setCarImages] = useState([]);

  // Fetch Car Info Data
  const fetchData = async () => {
    if (!id) {
      navigate('/cars');
      return;
    }

    try {
      const res = await getCarDetailsApi(id);
      const { StatusCode, data } = res.data;

      if (StatusCode === 6000) {
        setCarInfo(data.car_data);
        setCarImages(data.car_images);
      } else {
        throw new Error('Failed to fetch car details');
      }
    } catch (error) {
      console.error(error);
      setCarInfo({});
      setCarImages([]);
    }
  };

  useEffect(() => {
    fetchData();
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <Helmet title="RZAUTOS | Car Details">
      <section>
        <Container>
          <Row>
            <Col lg="6" data-aos="fade-left">
              {carImages.length > 0 && <Carousel images={carImages} />}
            </Col>
            <Col lg="6" className="d-flex align-items-center" data-aos="fade-right">
              <div className="car__info">
                <h2 className="section__title">{carInfo?.company?.company_name} {carInfo?.model}</h2>
                <h6 className="rent__price fw-bold fs-4">
                  {carInfo?.selling_price ? `£${carInfo.selling_price}` : "N/A"}
                </h6>
                <p className="section__description" dangerouslySetInnerHTML={{ __html: carInfo?.description }} />
                <AmenityList>
                  {renderAmenities(carInfo)}
                </AmenityList>
              </div>
            </Col>

            <Col lg="12" className="mt-3">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold" data-aos="zoom-in">Booking Information</h5>
                {carInfo.id && <BookingForm car_id={carInfo.id} />}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

// Helper function to render amenities
const renderAmenities = (carInfo) => {
  const amenities = [
    { title: "Registration", value: carInfo?.vehicle_registration || "N/A", icon: "ri-roadster-line" },
    { title: "Transmission", value: carInfo?.transmission?.transmission || "N/A", icon: "ri-settings-2-line" },
    { title: "Fuel Type", value: carInfo?.fuel_type?.fuel_type || "N/A", icon: "ri-gas-station-line" },
    { title: "Color", value: carInfo?.color?.color || "N/A", icon: "ri-paint-brush-line" },
    { title: "Mileage", value: carInfo?.mileage ? `${carInfo.mileage} km` : "N/A", icon: "ri-dashboard-line" },
    { title: "Body Type", value: carInfo?.body_type || "N/A", icon: "ri-car-line" },
    { title: "CO2 Emissions", value: carInfo?.co2_emissions ? `${carInfo.co2_emissions} g/km` : "N/A", icon: "ri-leaf-line" },
    { title: "Doors", value: carInfo?.number_of_doors || "N/A", icon: "ri-door-line" },
    { title: "Keys", value: carInfo?.number_of_keys || "N/A", icon: "ri-key-2-line" },
    { title: "Owners", value: carInfo?.number_of_owners || "N/A", icon: "ri-user-line" },
    { title: "Registration Date", value: carInfo?.registration_date ? new Date(carInfo.registration_date).toLocaleDateString() : "N/A", icon: "ri-calendar-line" }
  ];

  return amenities.map(({ title, value, icon }, index) => (
    <span className="d-flex align-items-center gap-1 section__description" title={title} key={index}>
      <i className={icon} style={{ color: "#f9a826" }}></i>
      <strong>{title}:</strong> {value}
    </span>
  ));
};

export default CarDetails;
