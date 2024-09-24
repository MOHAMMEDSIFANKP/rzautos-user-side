import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import aboutImg from "../../assets/all-images/cars-img/bmw-offer.png";

const AboutSection = ({ aboutClass }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS
  }, []);

  const styles = {
    aboutSectionItems: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem'
    },
    aboutSectionItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    icon: {
      color: '#f9a826',
      fontSize: '1.2rem'
    },
    text: {
      margin: 0
    }
  };

  return (
    <section className={`about__section ${aboutClass}`} data-aos="fade-up">
      <Container>
        <Row>
          <Col lg="6" md="6" data-aos="fade-right">
            <div className="about__section-content">
              <h4 className="section__subtitle">About Us</h4>
              <h2 className="section__title">Your Trusted Car Dealership</h2>
              <p className="section__description">
                We offer a wide selection of quality vehicles at competitive prices, 
                ranging from economical commuters to luxury models. Our experienced 
                team is dedicated to helping you find the perfect car that fits your 
                needs and budget. With our extensive inventory and personalized service, 
                we ensure a smooth and satisfying car-buying experience from start to finish.
              </p>

              <div style={styles.aboutSectionItems}>
                <div style={styles.aboutSectionItem} data-aos="fade-up">
                  <i className="ri-checkbox-circle-line" style={styles.icon}></i>
                  <p style={styles.text}>New and used cars</p>
                </div>

                <div style={styles.aboutSectionItem} data-aos="fade-up">
                  <i className="ri-checkbox-circle-line" style={styles.icon}></i>
                  <p style={styles.text}>Competitive pricing</p>
                </div>

                <div style={styles.aboutSectionItem} data-aos="fade-up">
                  <i className="ri-checkbox-circle-line" style={styles.icon}></i>
                  <p style={styles.text}>Expert sales team</p>
                </div>

                <div style={styles.aboutSectionItem} data-aos="fade-up">
                  <i className="ri-checkbox-circle-line" style={styles.icon}></i>
                  <p style={styles.text}>After-sales support</p>
                </div>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6" data-aos="fade-left">
            <div className="about__img">
              <img src={aboutImg} alt="Car showroom" className="w-100" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
