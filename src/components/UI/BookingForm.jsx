import React, { useEffect, useState } from "react";
import "../../styles/booking-form.css";
import { Form, FormGroup } from "reactstrap";
import styled from "styled-components";
import { EnquiryCarsFormSchema } from "../../validation/Validation";
import { useFormik } from "formik";
import Swal from 'sweetalert2';
import { postEnquiryApi } from "../../services/services";
import AOS from 'aos';
import 'aos/dist/aos.css';

const BookingForm = ({ car_id }) => {
  const [isLoad, setLoad] = useState(false);

  const initialValues = {
    car: car_id || "",
    name: "",
    email: "",
    number: "",
    message: "",
  };

  const handleSubmitForm = async (values, setSubmitting) => {
    try {
      if (!values.car) {
        values.car = car_id;
      }
      setLoad(true);
      const res = await postEnquiryApi(values);
      const { StatusCode } = res.data;
      if (StatusCode === 6001) {
        resetForm();
        Swal.fire({
          title: "We received your enquiry",
          text: "We will contact you soon. Thank you for your enquiry.",
          icon: "success",
          background: 'white',
          color: '#2B2B2B',
          confirmButtonColor: '#3085d6',
          showConfirmButton: false,
          timer: 3000,
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
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!.",
        showConfirmButton: false,
        background: '#2B2B2B',
        color: 'white',
        timer: 1500,
      });
    } finally {
      setLoad(false);
      setSubmitting(false); // Ensure to reset submitting state
    }
  };

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

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <Form onSubmit={handleSubmit} data-aos="fade-right">
      <FormGroup className="booking__form d-inline-block me-4 ">
        <div className="form-group ">
          <label>Name</label>
          <input
            type="text"
            className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          {touched.name && errors.name &&
            <div className="invalid-feedback">{errors.name}</div>}
        </div>
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 ">
        <div className="form-group ">
          <label>Email</label>
          <input
            type="text"
            className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {touched.email && errors.email &&
            <div className="invalid-feedback">{errors.email}</div>}
        </div>
      </FormGroup>

      <FormGroup className="booking__form  d-inline-block ms-1 ">
        <div className="form-group ">
          <label>Number</label>
          <input
            type="text"
            className={`form-control ${touched.number && errors.number ? 'is-invalid' : ''}`}
            name="number"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.number}
          />
          {touched.number && errors.number &&
            <div className="invalid-feedback">{errors.number}</div>}
        </div>
      </FormGroup>

      <FormGroup>
        <div className="form-group ">
          <label>Message</label>
          <textarea
            name="message"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.message}
            rows={5}
            type="textarea"
            className={`form-control ${touched.message && errors.message ? 'is-invalid' : ''}`}
            placeholder="Write"
          />
          {touched.message && errors.message &&
            <div className="invalid-feedback">{errors.message}</div>}
        </div>
      </FormGroup>

      <ButtonContainer>
          <Button type="submit" disabled={isLoad}>
            {isLoad ? "Submiting..." : "Submit"}
          </Button>
      </ButtonContainer>
    </Form>
  );
};

export default BookingForm;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

const Button = styled.button`
  padding: 5px 12px;
  border-radius: 6px;
  color: white;
  background-color: var(--primary-cl);
`;
