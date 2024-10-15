import React, { useEffect, useState } from "react";
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
import { getCarsApi, getSeoApi } from "../services/services";

const Home = () => {
  const [getCarData, setCarData] = useState([])
  const [seoData,setSeoData] = useState({})

  const fetchData = async () => {
    try {
      const res = await getCarsApi()
      const { data, StatusCode } = res.data
      if (StatusCode === 6000) {
        setCarData(data)
      }
      else {
        setCarData([])
      }
    } catch (error) {
      console.log(error);
      setCarData([])
    }
  }
   // Seo Data
   const fetchSeoData = async () => {
    try {
      const res = await getSeoApi('/')
      const { data, StatusCode } = res.data
      if (StatusCode === 6000) {
        setSeoData(data[0])
      }
      else {
        setSeoData({})
      }
    } catch (error) {
      console.log(error);
      setSeoData({})
    }
  }

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
    fetchData()
    fetchSeoData()
  }, []);

  return (
    <Helmet title={seoData?.meta_title || "RZAUTOS | Home"}>
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
            {getCarData.map((item) => (
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
      <section data-aos="fade-up">
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h2 className="section__title">Faq</h2>
            </Col>
            <Faq />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
