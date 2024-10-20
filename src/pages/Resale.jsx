import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import CommonSection from "../components/UI/CommonSection";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { postResaleEnquiryApi } from '../services/services';
import styled from 'styled-components';
import Swal from 'sweetalert2';

function Resale() {
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [imageNames, setImageNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      registration: '',
      transmission: '',
      make: '',
      model: '',
      fuelType: '',
      color: '',
      mileage: '',
      bodyType: '',
      name: '',
      email: '',
      phoneNumber: ''
    },
    validationSchema: Yup.object({
      registration: Yup.string().required('Registration is required'),
      transmission: Yup.string().required('Transmission is required'),
      make: Yup.string().required('make is required'),
      model: Yup.string().required('model is required'),
      fuelType: Yup.string().required('Fuel Type is required'),
      color: Yup.string().required('Color is required'),
      mileage: Yup.number().required('Mileage is required').positive().integer(),
      bodyType: Yup.string().required('Body Type is required'),
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phoneNumber: Yup.string().required('Phone Number is required')
    }),
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("number", values.phoneNumber);
        formData.append("make", values.make);
        formData.append("model", values.model);
        formData.append("registration", values.registration);
        formData.append("transmission", values.transmission);
        formData.append("fuel_type", values.fuelType);
        formData.append("color", values.color);
        formData.append("mileage", values.mileage);
        formData.append("body_type", values.bodyType);
        images.forEach((image) => {
          formData.append("images", image);
        });

        const res = await postResaleEnquiryApi(formData)
        if (res.data.StatusCode === 6001) {
          formik.resetForm();
          setImages([]);
          setPreviewImages([]);
          setImageNames([]);
          Swal.fire({
            title: "We received your ReSale Enquiry",
            text: "We will contact you soon. Thank you for your enquiry.",
            icon: "success",
            background: 'white',
            color: '#2B2B2B',
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
          background: 'white',
          color: '#2B2B2B',
          timer: 1500
        });
      } finally {
        setIsLoading(false)
      }
    }
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...images, ...files];
    const newImageNames = [...imageNames, ...files.map(file => file.name)];

    setImages(newImages);
    setPreviewImages(newImages.map((file) => URL.createObjectURL(file)));
    setImageNames(newImageNames);
  };

  const handleDeleteImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviewImages = previewImages.filter((_, i) => i !== index);

    setImages(newImages);
    setPreviewImages(newPreviewImages);
  };


  return (
    <>
      <CommonSection title="Car Resale" />

      <div className="container" style={{ paddingTop: '50px', paddingBottom: '50px' }} data-aos="fade-up">
        <h2 className="text-center mb-4" data-aos="zoom-in">Resale Form</h2>
        <form onSubmit={formik.handleSubmit} data-aos="fade-right">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label>Make <small>(Compay name)</small></label>
                <input
                  type="text"
                  className={`form-control ${formik.touched.make && formik.errors.make ? 'is-invalid' : ''}`}
                  name="make"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.make}
                />
                {formik.touched.make && formik.errors.make ? (
                  <div className="invalid-feedback">{formik.errors.make}</div>
                ) : null}
              </div>
              <div className="form-group mb-3">
                <label>Registration</label>
                <input
                  type="text"
                  className={`form-control ${formik.touched.registration && formik.errors.registration ? 'is-invalid' : ''}`}
                  name="registration"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.registration}
                />
                {formik.touched.registration && formik.errors.registration ? (
                  <div className="invalid-feedback">{formik.errors.registration}</div>
                ) : null}
              </div>
              <div className="form-group mb-3">
                <label>Transmission</label>
                <input
                  type="text"
                  className={`form-control ${formik.touched.transmission && formik.errors.transmission ? 'is-invalid' : ''}`}
                  name="transmission"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.transmission}
                />
                {formik.touched.transmission && formik.errors.transmission ? (
                  <div className="invalid-feedback">{formik.errors.transmission}</div>
                ) : null}
              </div>

              <div className="form-group mb-3">
                <label>Fuel Type</label>
                <input
                  type="text"
                  className={`form-control ${formik.touched.fuelType && formik.errors.fuelType ? 'is-invalid' : ''}`}
                  name="fuelType"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fuelType}
                />
                {formik.touched.fuelType && formik.errors.fuelType ? (
                  <div className="invalid-feedback">{formik.errors.fuelType}</div>
                ) : null}
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group mb-3">
                <label>Model</label>
                <input
                  type="text"
                  className={`form-control ${formik.touched.model && formik.errors.model ? 'is-invalid' : ''}`}
                  name="model"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.model}
                />
                {formik.touched.model && formik.errors.model ? (
                  <div className="invalid-feedback">{formik.errors.model}</div>
                ) : null}
              </div>
              <div className="form-group mb-3">
                <label>Mileage</label>
                <input
                  type="number"
                  className={`form-control ${formik.touched.mileage && formik.errors.mileage ? 'is-invalid' : ''}`}
                  name="mileage"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mileage}
                />
                {formik.touched.mileage && formik.errors.mileage ? (
                  <div className="invalid-feedback">{formik.errors.mileage}</div>
                ) : null}
              </div>

              <div className="form-group mb-3">
                <label>Body Type</label>
                <input
                  type="text"
                  className={`form-control ${formik.touched.bodyType && formik.errors.bodyType ? 'is-invalid' : ''}`}
                  name="bodyType"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.bodyType}
                />
                {formik.touched.bodyType && formik.errors.bodyType ? (
                  <div className="invalid-feedback">{formik.errors.bodyType}</div>
                ) : null}
              </div>
              <div className="form-group mb-3">
                <label>Color</label>
                <input
                  type="text"
                  className={`form-control ${formik.touched.color && formik.errors.color ? 'is-invalid' : ''}`}
                  name="color"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.color}
                />
                {formik.touched.color && formik.errors.color ? (
                  <div className="invalid-feedback">{formik.errors.color}</div>
                ) : null}
              </div>
            </div>
          </div>

          <h4 className="mt-4" data-aos="fade-left">Personal Information</h4>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label>Name</label>
                <input
                  type="text"
                  className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="invalid-feedback">{formik.errors.name}</div>
                ) : null}
              </div>

              <div className="form-group mb-3">
                <label>Phone Number</label>
                <input
                  type="number"
                  className={`form-control ${formik.touched.phoneNumber && formik.errors.phoneNumber ? 'is-invalid' : ''}`}
                  name="phoneNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phoneNumber}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <div className="invalid-feedback">{formik.errors.phoneNumber}</div>
                ) : null}
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                ) : null}
              </div>

              <div className="form-group mb-3" data-aos="fade-up">
                <label>Upload Images</label>
                <input
                  type="file"
                  className="form-control"
                  multiple
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>
            </div>
          </div>

          {previewImages.length > 0 && (
            <div className="mt-3 row">
              {previewImages.map((src, index) => (
                <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-3" data-aos="zoom-in">
                  <div className="position-relative">
                    <img
                      src={src}
                      alt={`Preview ${index}`}
                      className="img-thumbnail"
                      style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(index)}
                      className="btn btn-danger btn-sm position-absolute top-0 end-0"
                      style={{ borderRadius: '50%', padding: '0.25rem 0.5rem' }}
                    >
                      &times;
                    </button>
                    <p className="text-center mt-1">{imageNames[index]}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {isLoading ? (
            <Spinner />
          ) : (
            <button type="submit" className="btn btn-primary mt-4" data-aos="fade-up">
              Submit
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default Resale;

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