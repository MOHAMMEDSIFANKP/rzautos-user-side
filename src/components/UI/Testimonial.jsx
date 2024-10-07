import React from "react";
import Slider from "react-slick";

import "../../styles/testimonial.css";

import ava01 from "../../assets/all-images/ava-1.jpg";
import ava02 from "../../assets/all-images/ava-2.jpg";
import ava03 from "../../assets/all-images/ava-3.jpg";
import ava04 from "../../assets/all-images/ava-4.jpg";

const Testimonial = () => {
  const testimonials = [
    {
      name: "John Doe",
      review: "This car exceeded my expectations! It's not only reliable for daily commutes but also surprisingly fuel-efficient. The smooth ride and advanced features make every journey a pleasure.",
      rating: 5,
      img: ava01,
      carBought: "Sedan XL 2023"
    },
    {
      name: "Jane Smith",
      review: "I can't praise this car enough for long trips. The comfortable seats and spacious interior make family vacations a joy. The advanced safety features give me peace of mind on the road.",
      rating: 4,
      img: ava02,
      carBought: "SUV Pro 2022"
    },
    {
      name: "Alex Johnson",
      review: "Overall, it's a solid car with great performance. The minor issue with the AC was promptly resolved by the dealership. The responsive handling and sleek design make it a joy to drive.",
      rating: 3,
      img: ava03,
      carBought: "Hatchback Eco 2023"
    },
    {
      name: "Lisa Brown",
      review: "This car has been a game-changer for our family outings. The ample cargo space and entertainment system keep everyone happy on long drives. It's both practical and luxurious.",
      rating: 5,
      img: ava04,
      carBought: "Minivan Deluxe 2022"
    },
    {
      name: "Michael Lee",
      review: "The sporty feel and responsive acceleration make city driving exciting. While the fuel efficiency in the city could be better, it's perfect for weekend getaways. The modern tech features are a big plus.",
      rating: 4,
      img: ava01,
      carBought: "Coupe Sport 2023"
    },
  ];
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
              {item?.review}
            </p>

            <div className="mt-3 d-flex align-items-center gap-4">
              <img src={item?.img} alt="" className="w-25 h-25 rounded-2" />

              <div>
                <h6 className="mb-0 mt-3">{item?.name}</h6>
                <p className="section__description">{item?.carBought}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Testimonial;
