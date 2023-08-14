import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import "./App.css";
import { Navigate } from "react-router-dom";

const SignUp = () => {
  const [error, setError] = useState("");

  return (
    <div className="center-container">
      <div className="form-container">
        <Formik
          initialValues={{ email: "", pno: 0, password: "" }}
          onSubmit={async (values) => {
            try {
              const res = await axios.post("http://localhost:3000/add", values);
              setError(res?.data?.message);
            } catch (err) {
              setError(err.response?.data?.message || "An error occurred");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="formik-form">
              <div className="form-group">
                <label>Email</label>
                <Field type="email" name="email" className="input-field" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label>Phone No.</label>
                <Field type="text" name="pno" className="input-field" />
                <ErrorMessage
                  name="pno"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <Field
                  type="password"
                  name="password"
                  className="input-field"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                Submit
              </button>
              <h4 className="error-message">{error}</h4>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
