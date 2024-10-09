import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import HeroSlider from "../components/UI/HeroSlider";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import FindCarForm from "../components/UI/FindCarForm";
import AboutSection from "../components/UI/AboutSection";
import ServicesList from "../components/UI/ServicesList";
import carData from "../assets/data/carData";
import CarItem from "../components/UI/CarItem";
import BecomeDriverSection from "../components/UI/BecomeDriverSection";
import Testimonial from "../components/UI/Testimonial";
import BlogList from "../components/UI/BlogList";
import Faq from "../components/UI/Faq";

const Home = () => {
  useEffect(() => {
    // Initialize AOS for scroll animations
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: "ease-in-out", // Easing function for smoothness
      once: true, // Animation happens only once
    });
  }, []);

  return (
    <Helmet title="Home">
      {/* ============= hero section =========== */}
      <section className="p-0 hero__slider-section" data-aos="fade-up">
        <HeroSlider />
      </section>

      {/* =========== about section ================ */}
      <section data-aos="fade-up">
        <AboutSection />
      </section>

      {/* ========== services section ============ */}
      <section data-aos="fade-up">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h6 className="section__subtitle">See our</h6>
              <h2 className="section__title">Popular Services</h2>
            </Col>

            <ServicesList />
          </Row>
        </Container>
      </section>

      {/* =========== car offer section ============= */}
      <section data-aos="fade-up">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h6 className="section__subtitle">Come with</h6>
              <h2 className="section__title">Hot Offers</h2>
            </Col>

            {carData.slice(0, 6).map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
      


      {/* =========== become a driver section ============ */}
      <section data-aos="fade-up">
        <BecomeDriverSection />
      </section>

      {/* =========== testimonial section =========== */}
      <section data-aos="fade-up">
        <Container>
          <Row>
            <Col lg="12" className="mb-4 text-center">
              <h6 className="section__subtitle">Our clients says</h6>
              <h2 className="section__title">Testimonials</h2>
            </Col>

            <Testimonial />
          </Row>
        </Container>
      </section>

      {/* =============== Faq section =========== */}
      {/* <section data-aos="fade-up">
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h2 className="section__title">Faq</h2>
            </Col>

            <Faq />
          </Row>
        </Container>
      </section> */}
    </Helmet>
  );
};

export default Home;
