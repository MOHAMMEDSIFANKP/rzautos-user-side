import React, { useState } from "react";
import "../../styles/booking-form.css";
import { Form, FormGroup } from "reactstrap";
import styled from "styled-components";
import { EnquiryCarsFormSchema } from "../../validation/Validation";
import { useFormik } from "formik";
import Swal from 'sweetalert2';
import { postEnquiryApi } from "../../services/services";

const BookingForm = ({ car_id }) => {
  const [isLoad, setLoad] = useState(false)
  const initialValues = {
    car: car_id || "",
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
        if (!values.car) {
          values.car = car_id
        }
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
    <Form onSubmit={handleSubmit}>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="text" placeholder="Full Name"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name} />
        {touched.name && errors.name && (
          <Error>{errors.name}</Error>
        )}
      </FormGroup>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="email" placeholder="Email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email} />
        {touched.email && errors.email && (
          <Error>{errors.email}</Error>
        )}
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="number" placeholder="Phone Number"
          name="number"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.number} />
        {touched.number && errors.number && (
          <Error>{errors.number}</Error>
        )}
      </FormGroup>
      <FormGroup>
        <textarea
          name="message"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.message}
          rows={5}
          type="textarea"
          className="textarea"
          placeholder="Write"
        ></textarea>
      </FormGroup>
      <ButtonContainer>

        {isLoad ? (<Spinner class="spinner" />) : (
          <Button type="submit">
            Submit
          </Button>
        )}
      </ButtonContainer>
    </Form>
  );
};

export default BookingForm;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`

const Button = styled.button`
  padding: 5px 12px;
  border-radius: 6px;
  color: white;
  background-color: var(--primary-cl);
`
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