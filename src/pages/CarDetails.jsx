import React, { useEffect, useState } from "react";

import carData from "../assets/data/carData";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useNavigate, useParams } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import Carousel from "../components/UI/Carousel";
import { getCarDetailsApi } from "../services/services";
import styled from "styled-components";
import AOS from 'aos';
import 'aos/dist/aos.css';

const CarDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [carInfo, setCarInfo] = useState({})
  const [carImages, setCarImages] = useState([])

  // Fetch Car Infor Data
  const fetchData = async () => {
    try {
      const res = await getCarDetailsApi(id);
      const { car_data, car_images } = res.data.data;
      if (res.data?.StatusCode === 6000) {
        setCarInfo(car_data);
        setCarImages(car_images)
      } else {
        setCarInfo({});
        setCarImages([])
      }
    } catch (error) {
      setCarInfo({});
      setCarImages([])
    }
  };

  useEffect(() => {
    if (id) {
      fetchData()
    } else {
      navigate('/cars')
    }
    window.scrollTo(0, 0);
    AOS.init({
      duration: 1000,
      once: true
    });
  }, [])
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

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                  {carInfo?.selling_price ? `£${carInfo.selling_price}` : "N/A"}
                  </h6>
                </div>
                <p
                  className="section__description"
                  dangerouslySetInnerHTML={{ __html: carInfo?.description }}
                />
                <AmenityList>
                  <span className="d-flex align-items-center gap-1 section__description" title="Vehicle Registration">
                    <i className="ri-roadster-line" style={{ color: "#f9a826" }}></i>
                    <strong>Registration:</strong> {carInfo?.vehicle_registration || "N/A"}
                  </span>
                  <span className="d-flex align-items-center gap-1 section__description" title="Transmission Type">
                    <i className="ri-settings-2-line" style={{ color: "#f9a826" }}></i>
                    <strong>Transmission:</strong> {carInfo?.transmission?.transmission || "N/A"}
                  </span>
                  <span className="d-flex align-items-center gap-1 section__description" title="Fuel Type">
                    <i className="ri-gas-station-line" style={{ color: "#f9a826" }}></i>
                    <strong>Fuel Type:</strong> {carInfo?.fuel_type?.fuel_type || "N/A"}
                  </span>
                  <span className="d-flex align-items-center gap-1 section__description" title="Car Color">
                    <i className="ri-paint-brush-line" style={{ color: "#f9a826" }}></i>
                    <strong>Color:</strong> {carInfo?.color?.color || "N/A"}
                  </span>
                  <span className="d-flex align-items-center gap-1 section__description" title="Mileage">
                    <i className="ri-dashboard-line" style={{ color: "#f9a826" }}></i>
                    <strong>Mileage:</strong> {carInfo?.mileage ? `${carInfo.mileage} km` : "N/A"}
                  </span>
                  <span className="d-flex align-items-center gap-1 section__description" title="Body Type">
                    <i className="ri-car-line" style={{ color: "#f9a826" }}></i>
                    <strong>Body Type:</strong> {carInfo?.body_type || "N/A"}
                  </span>
                  
                  <span className="d-flex align-items-center gap-1 section__description" title="CO2 Emissions">
                    <i className="ri-leaf-line" style={{ color: "#f9a826" }}></i>
                    <strong>CO2 Emissions:</strong> {carInfo?.co2_emissions ? `${carInfo.co2_emissions} g/km` : "N/A"}
                  </span>
                  <span className="d-flex align-items-center gap-1 section__description" title="Number of Doors">
                    <i className="ri-door-line" style={{ color: "#f9a826" }}></i>
                    <strong>Doors:</strong> {carInfo?.number_of_doors ? `${carInfo.number_of_doors}` : "N/A"}
                  </span>
                  <span className="d-flex align-items-center gap-1 section__description" title="Number of Keys">
                    <i className="ri-key-2-line" style={{ color: "#f9a826" }}></i>
                    <strong>Keys:</strong> {carInfo?.number_of_keys ? `${carInfo.number_of_keys}` : "N/A"}
                  </span>
                  <span className="d-flex align-items-center gap-1 section__description" title="Number of Owners">
                    <i className="ri-user-line" style={{ color: "#f9a826" }}></i>
                    <strong>Owners:</strong> {carInfo?.number_of_owners ? `${carInfo.number_of_owners}` : "N/A"}
                  </span>
                  <span className="d-flex align-items-center gap-1 section__description" title="Registration Date">
                    <i className="ri-calendar-line" style={{ color: "#f9a826" }}></i>
                    <strong>Registration Date:</strong> {carInfo?.registration_date ? new Date(carInfo.registration_date).toLocaleDateString() : "N/A"}
                  </span>
                </AmenityList>
              </div>
            </Col>

            <Col lg="12" className="mt-3">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold " data-aos="zoom-in">Booking Information</h5>
                {carInfo.id &&<BookingForm car_id={carInfo.id} />}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;

const AmenityList = styled.div`
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 8px;

  @media (max-width:767px){
    grid-template-columns: repeat(1,1fr);
  }
`