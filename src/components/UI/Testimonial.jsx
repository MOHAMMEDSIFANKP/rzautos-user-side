import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import "../../styles/testimonial.css";

import { getTestimonialsApi } from "../../services/services";

const Testimonial = () => {
  const [testimonials,setTestimonials] = useState([])

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
  
  useEffect(()=>{
    fetchData()
  },[])
 
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        {testimonials.map((item, index) => (
          <div className="testimonial testimonial-card py-4 px-3"
          >
            <p className="section__description">
              {item?.review_text}
            </p>

            <div className="mt-3 d-flex align-items-center gap-4">
              <img src={item?.profile_picture} alt="" className="w-25 h-25 rounded-2" />

              <div>
                <h6 className="mb-0 mt-3">{item?.name}</h6>
                <p className="section__description">{item?.location}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Testimonial;
