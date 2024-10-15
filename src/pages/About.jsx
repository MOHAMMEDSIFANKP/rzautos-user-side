import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";
import styled from "styled-components";
// Components
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import AboutSection from "../components/UI/AboutSection";

// Images
import driveImage from '../assets/all-images/drive.jpg'

import "../styles/about.css";
import { getSeoApi, getTestimonialsApi } from "../services/services";

const About = () => {
  const [testimonials,setTestimonials] = useState([])
  const [seoData, setSeoData] = useState({});

  const fetchData = async () => {
    try {
      const res = await getTestimonialsApi()
      const { data, StatusCode } = res.data
      if (StatusCode === 6000) {
        setTestimonials(data)
      }
      else {
        setTestimonials([])
      }

    } catch (error) {
      setTestimonials([])
    }
  }

  const fetchSeoData = async () => {
    try {
      const res = await getSeoApi('/about');
      const { data, StatusCode } = res.data;
      if (StatusCode === 6000) {
        setSeoData(data[0]);        
      } else {
        setSeoData({});
      }
    } catch (error) {
      setSeoData({});
    }
  };
  
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
    fetchData()
    fetchSeoData()
  }, []);


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };
  return (
    <Helmet title={seoData?.meta_title || "Reviews & History"}>
      <CommonSection title="Who We Are" />
      <AboutSection aboutClass="aboutPage" />
      <Section bg='#000d6b' color='white' >
        <Container>
          <Row className="align-items-center">
            <Col lg="6" data-aos="fade-right">
              <div className="history-content pr-lg-5">
                <Title className="mb-4 section__title">Our Exciting Journey</Title>
                <p className="mb-4 journy">
                  Founded in 2024, RZ Autos embarked on a mission to redefine how people
                  buy and exchange cars. Our vision is simple yet ambitious: to provide a
                  seamless, transparent, and customer-focused car buying and exchange experience.
                </p>
                <p className="mb-4 journy">
                  Although we're a young company, our passion for innovation sets us apart.
                  At RZ Autos, we’ve integrated the latest technology to simplify the car
                  buying and exchange process, offering everything from detailed listings
                  to hassle-free transactions, all from the comfort of your home. Whether
                  you’re looking to buy your dream car or trade in your current one, we’ve
                  got you covered.
                </p>
                <p className="journy">
                  As we grow, our commitment to building trust, ensuring quality, and delivering
                  exceptional service remains at the core of what we do. With every vehicle sold
                  or exchanged, we aim to make the car buying experience smarter, easier, and
                  more enjoyable for our customers.
                </p>
              </div>
            </Col>
            <Col lg="6" data-aos="fade-left">
              <div className="history-image-wrapper mt-4 mt-lg-0">
                <img
                  src={driveImage}
                  alt="Our History"
                  className="img-fluid rounded"
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover'
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </Section>

      <section className="testimonials-section py-5 bg-light" data-aos="fade-up">
        <Container>
          <Title color="#000d6b" className="text-center mb-5 section__title">What Our Customers Say</Title>
          <Row>
            <Col lg="12">
              <Slider {...settings}>
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="px-2">
                    <div
                      className="testimonial-card h-100 d-flex flex-column"
                      style={{
                        border: '1px solid #e0e0e0',
                        borderRadius: '10px',
                        padding: '20px',
                        backgroundColor: '#ffffff',
                        transition: 'all 0.3s ease, box-shadow 2s ease-in-out',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        animation: 'shadowPulse 2s infinite',
                      }}
                    >
                      <div className="text-center d-flex gap-5 align-items-center  mb-3">
                        <img
                          src={testimonial?.profile_picture}
                          alt={`${testimonial?.name}`}
                          className="rounded-circle mb-3"
                          style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'cover',
                            border: '3px solid #f8f9fa'
                          }}
                        />
                        <div>
                        <h5 className="mb-1">{testimonial?.name}</h5>
                        <p className="text-muted small">{testimonial?.location}</p>
                        </div>
                      </div>
                      {testimonial?.review_text && <p className="flex-grow-1 section__description" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>"{testimonial?.review_text}"</p>}
                      <div className="text-center mt-3">
                        <p className="text-warning mb-0">
                          {"★".repeat(5)}{"☆".repeat(5 - 5)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
              {/* <Testimonial/> */}
            </Col>
          </Row>
          
        </Container>
       
      </section>

      <style jsx>{`
        @keyframes shadowPulse {
          0% {
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          50% {
            box-shadow: 0 8px 12px rgba(0,0,0,0.2);
          }
          100% {
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
        }
        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.15);
        }
      `}</style>
    </Helmet>
  );
};

export default About;

const Section = styled.section`
  background-color: ${(props) => props.bg || 'inherit'};
  color: ${(props) => props.color || 'inherit'};
  .journy{
    color: #ffffffb6;
  }
`;

const Title = styled.h3`
    color: ${(props) => props.color || 'inherit'};
`