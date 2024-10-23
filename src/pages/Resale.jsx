import React, { useEffect, useState, useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import CommonSection from "../components/UI/CommonSection";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { postResaleEnquiryApi } from '../services/services';
import Swal from 'sweetalert2';

function Resale() {
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      make: Yup.string().required('Make is required'),
      model: Yup.string().required('Model is required'),
      fuelType: Yup.string().required('Fuel Type is required'),
      color: Yup.string().required('Color is required'),
      mileage: Yup.number().required('Mileage is required').positive().integer(),
      bodyType: Yup.string().required('Body Type is required'),
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phoneNumber: Yup.string().required('Phone Number is required')
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const formData = new FormData();
        Object.keys(values).forEach(key => formData.append(key, values[key]));
        images.forEach(image => formData.append("images", image));

        const res = await postResaleEnquiryApi(formData);
        if (res.data.StatusCode === 6001) {
          formik.resetForm();
          setImages([]);
          setPreviewImages([]);
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
          throw new Error("Submission error");
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          showConfirmButton: false,
          background: 'white',
          color: '#2B2B2B',
          timer: 1500
        });
      } finally {
        setIsLoading(false);
      }
    }
  });

  const handleImageChange = useCallback((e) => {
    const files = Array.from(e.target.files);
    setImages(prevImages => [...prevImages, ...files]);
    setPreviewImages(prevImages => [
      ...prevImages,
      ...files.map(file => URL.createObjectURL(file))
    ]);
  }, []);

  const handleDeleteImage = useCallback((index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
    setPreviewImages(prevImages => prevImages.filter((_, i) => i !== index));
  }, []);

  return (
    <>
      <CommonSection title="Part Of Exchange" />
      <div className="container py-5" data-aos="fade-up">
        <h2 className="text-center mb-4" data-aos="zoom-in">Resale Form</h2>
        <form onSubmit={formik.handleSubmit} data-aos="fade-right">
          <div className="row">
            {['make', 'registration', 'transmission', 'fuelType', 'model', 'mileage', 'bodyType', 'color'].map((field, index) => (
              <div className="col-md-6" key={index}>
                <div className="form-group mb-3">
                  <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type={field === 'mileage' ? 'number' : 'text'}
                    className={`form-control ${formik.touched[field] && formik.errors[field] ? 'is-invalid' : ''}`}
                    name={field}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[field]}
                  />
                  {formik.touched[field] && formik.errors[field] && (
                    <div className="invalid-feedback">{formik.errors[field]}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <h4 className="mt-4" data-aos="fade-left">Personal Information</h4>
          <div className="row">
            {['name', 'phoneNumber', 'email'].map((field, index) => (
              <div className="col-md-6" key={index}>
                <div className="form-group mb-3">
                  <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    className={`form-control ${formik.touched[field] && formik.errors[field] ? 'is-invalid' : ''}`}
                    name={field}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[field]}
                  />
                  {formik.touched[field] && formik.errors[field] && (
                    <div className="invalid-feedback">{formik.errors[field]}</div>
                  )}
                </div>
              </div>
            ))}
            <div className="col-md-6">
              <div className="form-group mb-3">
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
                    <img src={src} alt={`Preview ${index}`} className="img-thumbnail" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(index)}
                      className="btn btn-danger btn-sm position-absolute top-0 end-0"
                      style={{ borderRadius: '50%', padding: '0.25rem 0.5rem' }}
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className=" mt-4">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Resale;
