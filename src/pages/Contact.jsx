import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/contact.css";
import { EnquiryCarsFormSchema } from "../validation/Validation";
import { getSeoApi, postEnquiryApi } from "../services/services";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import styled from "styled-components";

const socialLinks = [
  {
    url: "#",
    icon: "ri-facebook-line",
  },
  {
    url: "#",
    icon: "ri-instagram-line",
  },
  {
    url: "#",
    icon: "ri-linkedin-line",
  },
  {
    url: "#",
    icon: "ri-twitter-line",
  },
];

const Contact = () => {
  const [seoData, setSeoData] = useState({});

  const fetchSeoData = async () => {
    try {
      const res = await getSeoApi('/contact');
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
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
    });
    fetchSeoData()
  }, []);

  const [isLoad, setLoad] = useState(false)
  const initialValues = {
    car: "",
    name: "",
    email: "",
    number: "",
    message: "",
  }
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: EnquiryCarsFormSchema,
    onSubmit: (values, { setSubmitting }) => {
      handleSubmitForm(values, setSubmitting);
    },
  });
  const handleSubmitForm = async (values, setSubmitting) => {
    try {
      setLoad(true)
      const res = await postEnquiryApi(values)
      const { StatusCode, data } = res.data
      if (StatusCode === 6001) {
        resetForm()
        Swal.fire({
          title: "We received your enquiry",
          text: "We will contact you soon. Thank you for your enquiry.",
          icon: "success",
          background: 'white',
          color: '#2B2B2B',
          confirmButtonColor: '#3085d6',
          customClass: {
            // popup: 'custom-swal-popup'
          },
          showConfirmButton: false,
          timer: 3000
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!.",
          showConfirmButton: false,
          background: 'white',
          color: '#2B2B2B',
          timer: 1500
        });
      }

    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!.",
        showConfirmButton: false,
        background: '#2B2B2B',
        color: 'white',
        timer: 1500
      });
    } finally {
      setLoad(false)
    }
  };

  return (
    <Helmet title={seoData?.meta_title || "Contact"}>
      <CommonSection title="Contact" />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7" data-aos="fade-right">
              <h6 className="fw-bold mb-4">Get In Touch</h6>

              <Form onSubmit={handleSubmit}>
                <FormGroup className="contact__form">
                  <Input placeholder="Your Name" type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name} />
                  {touched.name && errors.name && (
                    <Error>{errors.name}</Error>
                  )}
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input placeholder="Phone Number" type="number"
                    name="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.number} />
                  {touched.number && errors.number && (
                    <Error>{errors.number}</Error>
                  )}
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input placeholder="Email" type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email} />
                  {touched.email && errors.email && (
                    <Error>{errors.email}</Error>
                  )}
                </FormGroup>
                <FormGroup className="contact__form">
                  <textarea
                    name="message"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                    rows="5"
                    placeholder="Message"
                    className="textarea"
                  ></textarea>
                </FormGroup>
                {isLoad ? (<Spinner class="spinner" />) : (
                  <button className="contact__btn" type="submit">
                    Send Message
                  </button>
                )}
              </Form>
            </Col>

            <Col lg="5" md="5" data-aos="fade-left">
              <div className="contact__info">
                <h6 className="fw-bold">Contact Information</h6>
                <p className="section__description mb-0">
                  123 ZindaBazar, Sylhet, Bangladesh
                </p>
                <div className="d-flex align-items-center gap-2">
                  <h6 className="fs-6 mb-0">Phone:</h6>
                  <p className="section__description mb-0">+88683896366</p>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <h6 className="mb-0 fs-6">Email:</h6>
                  <p className="section__description mb-0">example@gmail.com</p>
                </div>

                <h6 className="fw-bold mt-4">Follow Us</h6>

                <div className="d-flex align-items-center gap-4 mt-3">
                  {socialLinks.map((item, index) => (
                    <Link
                      to={item.url}
                      key={index}
                      className="social__link-icon"
                    >
                      <i className={item.icon}></i>
                    </Link>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Contact;

const Error = styled.p`
  color: red;
  font-size: small;
`

const Spinner = styled.div`
   width: 30px;
   height: 30px;
   border-radius: 50%;
   background: radial-gradient(farthest-side,var(--primary-cl) 94%,#0000) top/9px 9px no-repeat,
          conic-gradient(#0000 30%,var(--primary-cl));
   -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 9px),#000 0);
   animation: spinner-c7wet2 1s infinite linear;

@keyframes spinner-c7wet2 {
   100% {
      transform: rotate(1turn);
   }
}
`