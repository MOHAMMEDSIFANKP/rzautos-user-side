import React, { useEffect } from "react";
import { Col } from "reactstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import servicesData from "../../assets/data/serviceData";

const ServicesList = ({data}) => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: 'ease-in-out', // Easing function
      once: false, // Whether animation should happen only once
    });
  }, []);

  return (
    <>
      <style>
        {`
          .service__item {
            cursor: pointer;
            transition: all 0.3s ease;
            border: 1px solid #e0e0e0; // Light grey border
            border-radius: 5px;
            color: #000; // Default text color
          }
          .service__item:hover {
            background-color: #000d6b; // Change background color on hover
            color: white; // Change text color on hover
            box-shadow: 0 4px 25px rgba(0, 0, 0, 0.1);
            transform: translateY(-5px);
          }
          .service__item .icon {
            color: #f9a826; // Custom color for icon
            font-size: 2rem; // Increased icon size
          }
          .service__item:hover h6,
          .service__item:hover p {
            color: white; // Change title and description color on hover
          }
        `}
      </style>
      {data.map((item) => (
        <ServiceItem item={item} key={item.id} />
      ))}
    </>
  );
};

const ServiceItem = ({ item }) => {
  const itemStyle = {
    padding: '15px', // Keep the original padding
  };

  return (
    <Col
      lg="4"
      md="4"
      sm="6"
      className="mb-3"
      data-aos="fade-up" // AOS animation type
    >
      <div className="service__item" style={itemStyle}>
        <span className="mb-3 d-inline-block icon">
          <img src={item?.icon} alt="" width={14} />
        </span>

        <h6>{item?.title}</h6>
        <p className="section__description">{item?.description}</p>
      </div>
    </Col>
  );
};

export default ServicesList;
