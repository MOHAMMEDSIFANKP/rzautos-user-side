import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import avaImg from "../assets/all-images/ava-1.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";

const CarListing = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  const testimonials = [
    {
      name: "John Doe",
      review: "This car exceeded my expectations! It's not only reliable for daily commutes but also surprisingly fuel-efficient. The smooth ride and advanced features make every journey a pleasure.",
      rating: 5,
      img: avaImg,
      carBought: "Sedan XL 2023"
    },
    {
      name: "Jane Smith",
      review: "I can't praise this car enough for long trips. The comfortable seats and spacious interior make family vacations a joy. The advanced safety features give me peace of mind on the road.",
      rating: 4,
      img: avaImg,
      carBought: "SUV Pro 2022"
    },
    {
      name: "Alex Johnson",
      review: "Overall, it's a solid car with great performance. The minor issue with the AC was promptly resolved by the dealership. The responsive handling and sleek design make it a joy to drive.",
      rating: 3,
      img: avaImg,
      carBought: "Hatchback Eco 2023"
    },
    {
      name: "Lisa Brown",
      review: "This car has been a game-changer for our family outings. The ample cargo space and entertainment system keep everyone happy on long drives. It's both practical and luxurious.",
      rating: 5,
      img: avaImg,
      carBought: "Minivan Deluxe 2022"
    },
    {
      name: "Michael Lee",
      review: "The sporty feel and responsive acceleration make city driving exciting. While the fuel efficiency in the city could be better, it's perfect for weekend getaways. The modern tech features are a big plus.",
      rating: 4,
      img: avaImg,
      carBought: "Coupe Sport 2023"
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
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
    <Helmet title="Cars">
      <CommonSection title="About, History, and Reviews" />

      <section className="about-section py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg="6" data-aos="fade-right">
              <div className="about-image-wrapper mb-4 mb-lg-0">
                <img 
                  src={avaImg} 
                  alt="About Our Cars" 
                  className="img-fluid rounded" 
                  style={{ 
                    width: '100%', 
                    height: '400px',
                    objectFit: 'cover'
                  }} 
                />
              </div>
            </Col>
            <Col lg="6" data-aos="fade-left">
              <div className="about-content">
                <h3 className="mb-4">About Our Cars</h3>
                <p className="lead mb-4">
                  Experience the perfect blend of style, performance, and comfort with our curated selection of vehicles. Each car in our lineup is chosen to deliver an exceptional driving experience, whether you're commuting to work or embarking on a cross-country adventure.
                </p>
                <p>
                  Our commitment to quality ensures that every vehicle meets the highest standards of reliability and safety. From eco-friendly options to luxury models, we have a car to suit every lifestyle and preference.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="history-section py-5" style={{ backgroundColor: '#000d6b', color: 'white' }}>
        <Container>
          <Row className="align-items-center">
            <Col lg="6" data-aos="fade-right">
              <div className="history-content pr-lg-5">
                <h3 className="mb-4">Our Rich History</h3>
                <p className="mb-4">
                  Since our founding in 1950, we've been at the forefront of automotive innovation. Our journey began with a simple vision: to create cars that not only transport people but inspire them.
                </p>
                <p className="mb-4">
                  Over the decades, we've pioneered breakthrough technologies, from the first electric-gasoline hybrid in the 1970s to today's cutting-edge autonomous driving systems. Our commitment to quality, safety, and environmental responsibility has earned us numerous accolades and the trust of millions of drivers worldwide.
                </p>
                <p>
                  As we look to the future, we continue to push the boundaries of what's possible in automotive design and technology, always with our customers' needs at the heart of everything we do.
                </p>
              </div>
            </Col>
            <Col lg="6" data-aos="fade-left">
              <div className="history-image-wrapper mt-4 mt-lg-0">
                <img 
                  src={avaImg} 
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
      </section>

      <section className="testimonials-section py-5 bg-light" data-aos="fade-up">
        <Container>
          <h3 className="text-center mb-5">What Our Customers Say</h3>
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
                      <div className="text-center mb-3">
                        <img 
                          src={testimonial.img} 
                          alt={`${testimonial.name}`} 
                          className="rounded-circle mb-3"
                          style={{
                            width: '80px',
                            height: '80px', 
                            objectFit: 'cover',
                            border: '3px solid #f8f9fa'
                          }} 
                        />
                        <h5 className="mb-1">{testimonial.name}</h5>
                        <p className="text-muted small">{testimonial.carBought}</p>
                      </div>
                      <p className="flex-grow-1" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>"{testimonial.review}"</p>
                      <div className="text-center mt-3">
                        <p className="text-warning mb-0">
                          {"★".repeat(testimonial.rating)}{"☆".repeat(5 - testimonial.rating)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
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

export default CarListing;