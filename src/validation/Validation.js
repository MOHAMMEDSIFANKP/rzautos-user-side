import * as Yup from "yup";

export const EnquiryCarsFormSchema = Yup.object({
  car: Yup.string().trim(),
  name: Yup.string().trim().required("Please enter your full name"),
  email: Yup.string().trim().email("Please enter a valid email address").required("Please enter your email address"),
  number: Yup.string()
    .trim()
    .matches(/^[0-9]+$/, "Phone number must be digits only")
    .required("Please enter your phone number"),
  message: Yup.string().trim(), 
});
