import styles from "./styles.module.scss";
import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import ShippingInput from "@/components/inputs/shippingInput";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { countries } from "@/data/countries";

const initialValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  state: "",
  city: "",
  zipCode: "",
  address1: "",
  address2: "",
  country: "",
};
//
export default function Shipping({
  selectedAddress,
  setSelectedAddress,
  user,
}) {
  const [addresses, setAddresses] = useState(user?.address || []);
  const [shipping, setShipping] = useState(initialValues);
  const {
    firstName,
    lastName,
    phoneNumber,
    state,
    city,
    zipCode,
    address1,
    address2,
    country,
  } = shipping;

  // Validation schema ----------------------
  const validate = Yup.object({
    firstName: Yup.string()
      .required("First name is required.")
      .min(3, "First name must be atleast 3 characters long.")
      .max(20, "First name must be less than 20 characters long."),
    lastName: Yup.string()
      .required("Last name is required.")
      .min(3, "Last name must be atleast 3 characters long.")
      .max(20, "Last name must be less than 20 characters long."),
    // phoneNumber: Yup.string()
    //   .required("Phone number is required.")
    //   .phone()
    //   .min(3, "Phone number must be atleast 3 characters long.")
    //   .max(30, "Phone number must be less than 20 characters long."),
    phoneNumber: Yup.string()
      .required("Phone number is required.")
      .matches(
        /^\d{10}$/,
        "Invalid phone number. Please enter a 10-digit number."
      ),
    state: Yup.string()
      .required("State name is required.")
      .min(2, "State name should contain 2-60 characters..")
      .max(60, "State name should contain 2-60 characters."),
    city: Yup.string()
      .required("City name is required.")
      .min(2, "City name should contain 2-60 characters.")
      .max(60, "City name should contain 2-60 characters."),
    zipCode: Yup.string()
      .required("ZipCode/Postal is required.")
      .min(2, "ZipCode/Postal should contain 2-30 characters..")
      .max(30, "ZipCode/Postal should contain 2-30 characters."),
    address1: Yup.string()
      .required("Address Line 1 is required.")
      .min(5, "Address Line 1 should contain 5-100 characters.")
      .max(100, "Address Line 1 should contain 5-100 characters."),
    address2: Yup.string()
      .min(5, "Address Line 2 should contain 5-100 characters.")
      .max(100, "Address Line 2 should contain 5-100 characters."),
    country: Yup.string().required("Country name is required."),
  });
  // ----------------------------------------
  // --- Handle change -----------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
  };
  // ----------------------------------------
  return (
    <div className={styles.shipping}>
      <Formik
        enableReinitialize
        initialValues={{
          firstName,
          lastName,
          phoneNumber,
          state,
          city,
          zipCode,
          address1,
          address2,
        }}
        validationSchema={validate}
        onSubmit={() => {
          saveShippingHandler();
        }}
      >
        {(formik) => (
          <Form>
            <FormControl className={styles.select}>
              <InputLabel id="demo-simple-select-helper-label">
                Country
              </InputLabel>
              <Select
                LabelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={country}
                name="country"
                onChange={handleChange}
              >
                {countries.map((country) => (
                  <MenuItem value={country.name} key={country.name}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className={styles.col}>
              <ShippingInput
                name="firstName"
                placeholder="*First Name"
                onChange={handleChange}
              />
              <ShippingInput
                name="lastName"
                placeholder="*Last Name"
                onChange={handleChange}
              />
            </div>
            <div className={styles.col}>
              <ShippingInput
                name="state"
                placeholder="*State/Province"
                onChange={handleChange}
              />
              <ShippingInput
                name="city"
                placeholder="*City"
                onChange={handleChange}
              />
            </div>
            <ShippingInput
              name="phoneNumber"
              placeholder="*Phone number"
              onChange={handleChange}
            />
            <ShippingInput
              name="zipCode"
              placeholder="*Post/Zip code"
              onChange={handleChange}
            />
            <ShippingInput
              name="address1"
              placeholder="Address 1"
              onChange={handleChange}
            />
            <ShippingInput
              name="address2"
              placeholder="Address 2"
              onChange={handleChange}
            />
            <button type="submit">Save Address</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
