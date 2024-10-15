import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/hero-slider.css";

import sliderImage from '../../assets/all-images/slider-img/slider-1.jpg'
import styled from "styled-components";
import { getHomePageCarouselApi } from "../../services/services";

const HeroSlider = () => {
  const [carouselData, setCarouselData] = useState([])

  const fetData = async () => {
    try {
      const res = await getHomePageCarouselApi()
      const { data, StatusCode } = res.data
      if (StatusCode === 6000) {
        setCarouselData(data)
      }
      else {
        setCarouselData([])
      }
    } catch (error) {
      setCarouselData([])
    }
  }

  useEffect(() => {
    fetData()
  }, [])

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
      {carouselData.map((item, index) => (
        <Carousel key={index} className="slider__item  mt0" bg={item?.image}>
          <Container>
            <div className="slider__content ">
              <h4 className="text-light mb-3">{item?.title_1}</h4>
              <h1 className="text-light mb-4">
                {item?.title_2}
              </h1>
              <button className="btn reserve__btn mt-4">
                <Link to="/cars">Explore Now</Link>
              </button>
            </div>
          </Container>
        </Carousel>
      ))}
    </Slider>
  );
};

export default HeroSlider;

const Carousel = styled.div`
  background-image: url(${props => props.bg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background: linear-gradient(rgb(0, 13, 107, 0.5), rgb(0, 13, 107, 0.5)),

`