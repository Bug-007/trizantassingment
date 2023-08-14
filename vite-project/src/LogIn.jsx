import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import "./App.css";

const LogIn = () => {
  const [error, setError] = useState("");

  return (
    <div className="center-container">
      <div className="form-container">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            try {
              const res = await axios.post("http://localhost:3000/authenticate", values);
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

export default LogIn;
