import React from "react";
import { Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/car-item.css";
import { nav } from "framer-motion/client";
import styled from "styled-components";

const CarItem = (props) => {
  const navigate = useNavigate()
  const { id ,thumbnail, company, model, transmission, fuel_type,  carName, selling_price } = props.item;

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <ImageConainer className="car__img" image={thumbnail}>
          {/* <img src={thumbnail} alt="" className="w-100" /> */}
        </ImageConainer>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center capitalize">{company?.company_name}</h4>
          <h6 className="rent__price text-center mt-">
            {selling_price && (`£${selling_price}`)}
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-car-line"></i> {model}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-settings-2-line"></i> {transmission?.transmission}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-gas-station-line"></i> {fuel_type?.fuel_type}
            </span>
          </div>

          {/* <button className=" w-50 car__item-btn car__btn-rent">
            <Link>Enquiry</Link>
          </button> */}

          <button className=" w-100 car__item-btn car__btn-details" onClick={()=>navigate(`/cars/${id}/`)}>
            <Link>Details</Link>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;

const ImageConainer = styled.div`
  background-image: url(${props => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 250px;
  @media (max-width:1399px){
    height: 200px;
  }
  @media (max-width:1199px){
    height: 180px;
  }
  @media (min-width:576px) and (max-width:991px){
    height: 140px;
  }
  @media (max-width:375px){
    height: 200px;
  }
  @media (max-width:320px){
    height: 180px;
  }
`