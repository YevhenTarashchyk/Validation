import React from "react";
import "./App.css";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import Error from "./Error";
import Autosuggest from "react-autosuggest";
import axios from "axios";

const App = ({ values, errors, touched, isSubmitting }) => {
  const [country, setCountry] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Create Account</h1>
        <Form>
          <div className="firstName">
            <label>First Name</label>
            <Field
              type="text"
              noValidate
              placeholder="First Name"
              name="firstName"
              autoComplete="off"
              className={
                touched.firstName && errors.firstName ? "has-error" : null
              }
            />
            <Error clicked={touched.firstName} message={errors.firstName} />
          </div>
          <div className="lastName">
            <label>Last Name</label>
            <Field
              type="text"
              placeholder="Last Name"
              name="lastName"
              autoComplete="off"
              className={
                touched.lastName && errors.lastName ? "has-error" : null
              }
            />
            <Error clicked={touched.lastName} message={errors.lastName} />
          </div>
          <div style={{ width: "40%" }}>
            <div style={{ marginBottom: "15px" }}>
              <div className="gender">
                <label>
                  <Field
                    id="Male"
                    name="gender"
                    component="input"
                    type="radio"
                    value="male"
                    checked={values.gender === "male"}
                  />
                  Male
                </label>
                <label>
                  <Field
                    id="Female"
                    name="gender"
                    component="input"
                    type="radio"
                    value="female"
                    checked={values.gender === "female"}
                  />
                  Female
                </label>
              </div>
              <Error clicked={touched.gender} message={errors.gender} />
            </div>
          </div>
          <div className="age">
            <label>Your Age</label>
            <Field
              type="text"
              autoComplete="off"
              placeholder="Age"
              name="age"
              className={touched.age && errors.age ? "has-error" : null}
            />
            <Error clicked={touched.age} message={errors.age} />
          </div>

          <div className="countrySelect">
            <label htmlFor="country">Country</label>
            <Autosuggest
              inputProps={{
                id: "country",
                autoComplete: "off",
                placeholder: "Country",
                name: "country",
                value: country,
                onChange: (_event, { newValue }) => {
                  setCountry(newValue);
                }
              }}
              suggestions={suggestions}
              onSuggestionsFetchRequested={async ({ value }) => {
                if (!value) {
                  setSuggestions([]);
                  return;
                }
              }}
              onSuggestionsClearRequested={() => {
                setSuggestions([]);
              }}
              getSuggestionValue={suggestion => suggestion.name}
              renderSuggestion={suggestion => <div>{suggestion.name}</div>}
            />
            {/* <Field
              type="text"
              autoComplete="off"
              placeholder="Age"
              name="age"
              className={touched.age && errors.age ? "has-error" : null}
            />
            <Error clicked={touched.age} message={errors.age} /> */}
          </div>

          <div className="email">
            <label>Email</label>
            <Field
              autoComplete="off"
              type="email"
              placeholder="Email"
              name="email"
              className={touched.email && errors.email ? "has-error" : null}
            />
            <Error clicked={touched.email} message={errors.email} />
          </div>
          <div className="password">
            <label>Password</label>
            <Field
              autoComplete="off"
              type="password"
              placeholder="Password"
              name="password"
              className={
                touched.password && errors.password ? "has-error" : null
              }
            />
            <Error clicked={touched.password} message={errors.password} />
          </div>
          <div className="subcribtionType">
            <Field component="select" name="plan">
              <option value="free">Free</option>
              <option value="premium">Premium</option>
            </Field>
          </div>
          <div className="newsletter">
            <label>
              <Field
                type="checkbox"
                name="newsletter"
                checked={values.newsletter}
              />
              Subcribe for letters
            </label>
          </div>

          <div className="createAccount">
            <button disabled={isSubmitting} type="submit">
              Create Account
            </button>
            <small>Already have an account?</small>
          </div>
        </Form>
      </div>
    </div>
  );
};

const FormikApp = withFormik({
  mapPropsToValues({
    email,
    password,
    newsletter,
    gender,
    plan,
    firstName,
    lastName,
    age
  }) {
    return {
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      password: password || "",
      newsletter: newsletter || false,
      gender: gender || "",
      plan: plan || "free",
      age: age || ""
    };
  },
  validationSchema: Yup.object().shape({
    firstName: Yup.string()
      .min(2, "C'mon, your name is longer than that")
      .required("Name is required.")
      .matches(/^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/, "English letters only"),
    lastName: Yup.string()
      .min(2, "Such lastname ever exicted?")
      .required("Last name is required.")
      .matches(/^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/, "English letters only"),
    email: Yup.string()
      .email("Not valid")
      .required("Required"),
    password: Yup.string()
      .min(9, "Password is too short - should be 9 chars minimum")
      .required("No password provided")
      .matches(/(?=.*[0-9])/, "Password must contain a number."),
    age: Yup.number()
      .required("Required")
      .max(99, "You might be too old for this")
      .positive("i am not sure if u are from this planet")
      .integer("current age (17.5 not equals 18)")
      .min(18, "Must be at least 18"),

    gender: Yup.string().required("Choose your sex")
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    setSubmitting(true);
    setTimeout(() => {
      if (values.email === "noyal70@yandex.ru") {
        setErrors({ email: "That email has been already registered" });
      } else {
        console.log(values);
        resetForm();
        setSubmitting(false);
      }
    }, 3000);
  }
})(App);

export default FormikApp;
