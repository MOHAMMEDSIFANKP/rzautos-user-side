import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroSlider from "../components/UI/HeroSlider";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import AboutSection from "../components/UI/AboutSection";
import ServicesList from "../components/UI/ServicesList";
import CarItem from "../components/UI/CarItem";
import BecomeDriverSection from "../components/UI/BecomeDriverSection";
import Testimonial from "../components/UI/Testimonial";
import Faq from "../components/UI/Faq";
import { getCarsApi, getPopularSerivceApi, getSeoApi } from "../services/services";

const Home = () => {
  const [carData, setCarData] = useState([]);
  const [popularService, setPopularService] = useState([]);
  const [seoData, setSeoData] = useState({});

  const fetchData = async () => {
    try {
      const [carsRes, servicesRes, seoRes] = await Promise.all([
        getCarsApi(),
        getPopularSerivceApi(),
        getSeoApi('/')
      ]);

      const [{ data: carData, StatusCode: carStatusCode }, { data: serviceData, StatusCode: serviceStatusCode }, { data: seoData, StatusCode: seoStatusCode }] = [carsRes.data, servicesRes.data, seoRes.data];

      if (carStatusCode === 6000) setCarData(carData);
      if (serviceStatusCode === 6000) setPopularService(serviceData);
      if (seoStatusCode === 6000) setSeoData(seoData[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Optionally set error states or fallback values
      setCarData([]);
      setPopularService([]);
      setSeoData({});
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
    fetchData();
  }, []);

  return (
    <Helmet title={seoData.meta_title || "RZAUTOS | Home"}>
      <section className="p-0 hero__slider-section" data-aos="fade-up">
        <HeroSlider />
      </section>

      <section data-aos="fade-up">
        <AboutSection />
      </section>

      <section data-aos="fade-up">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h6 className="section__subtitle">See our</h6>
              <h2 className="section__title">Popular Services</h2>
            </Col>
            {popularService.length > 0 ? (
              <ServicesList data={popularService} />
            ) : (
              <p>No popular services found.</p> 
            )}
          </Row>
        </Container>
      </section>

      <section data-aos="fade-up">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h6 className="section__subtitle">Come with</h6>
              <h2 className="section__title">Hot Offers</h2>
            </Col>
            {carData.length > 0 ? (
              carData.map((item) => <CarItem item={item} key={item.id} />)
            ) : (
              <p>No cars available at the moment.</p> 
            )}
          </Row>
        </Container>
      </section>

      <section data-aos="fade-up">
        <BecomeDriverSection />
      </section>

      <section data-aos="fade-up">
        <Container>
          <Row>
            <Col lg="12" className="mb-4 text-center">
              <h6 className="section__subtitle">Our clients say</h6>
              <h2 className="section__title">Testimonials</h2>
            </Col>
            <Testimonial />
          </Row>
        </Container>
      </section>

      <section data-aos="fade-up">
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h2 className="section__title">FAQ</h2>
            </Col>
            <Faq />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
