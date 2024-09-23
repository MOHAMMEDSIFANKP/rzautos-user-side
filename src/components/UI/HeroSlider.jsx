import React from "react";
import Slider from "react-slick";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/hero-slider.css";

const HeroSlider = () => {
  const settings = {
    fade: true,
    speed: 2000,
    autoplaySpeed: 3000,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };

  return (
    <Slider {...settings} className="hero__slider">
      {/* Slide 1 - Find Your Perfect Car */}
      <div className="slider__item slider__item-01 mt0">
        <Container>
          <div className="slider__content ">
            <h4 className="text-light mb-3">Find Your Perfect Car Today!</h4>
            <h1 className="text-light mb-4">
              Discover unbeatable deals on new and used cars. Fast, easy, and reliable.
            </h1>
            <button className="btn reserve__btn mt-4">
              <Link to="/cars">Shop Now</Link>
            </button>
          </div>
        </Container>
      </div>

      {/* Slide 2 - Exclusive Deals */}
      <div className="slider__item slider__item-02 mt0">
        <Container>
          <div className="slider__content ">
            <h4 className="text-light mb-3">Exclusive Discounts on New Arrivals</h4>
            <h1 className="text-light mb-4">Shop Our Latest Models and Save Big!</h1>
            <button className="btn reserve__btn mt-4">
              <Link to="/cars">Explore Now</Link>
            </button>
          </div>
        </Container>
      </div>

      {/* Slide 3 - Certified Pre-Owned */}
      <div className="slider__item slider__item-03 mt0">
        <Container>
          <div className="slider__content ">
            <h4 className="text-light mb-3">Certified Pre-Owned Cars Available</h4>
            <h1 className="text-light mb-4">High-Quality, Inspected, and Affordable Pre-Owned Vehicles</h1>
            <button className="btn reserve__btn mt-4">
              <Link to="/cars">Browse Certified Cars</Link>
            </button>
          </div>
        </Container>
      </div>
    </Slider>
  );
};

export default HeroSlider;
