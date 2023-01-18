import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../config";

function Forgot() {
  const [show, setShow] = useState(true);
  const [mail, setMail] = useState({ email: "nill" });
  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validate: (values) => {
      let error = {};
      if (!values.email) {
        error.email = "Please Enter a email";
      }

      if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        error.email = "Please enter a valid email";
      }
      return error;
    },

    onSubmit: async (values) => {
      try {
        await axios.post(`${config.api}/forgot`, values);
        alert("Check your email");
        formik.resetForm();
        setMail(values);
        setShow(false);
      } catch (error) {
        alert("incorrect username");
      }
    },
  });

  return (
    <>
      {show ? (
        <section className="vh-100">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card bg-light text-black">
                  <div className="card-body p-5 text-center">
                    <div className="mb-md-5 mt-md-4">
                      <h2 className="fw-bold mb-2">Let's get you back in!</h2>
                      <p className="text-black-50 mb-3 fw-bold">
                        We will send you a password reset link to an email
                        associated with your Polymer account.
                      </p>
                      <hr />

                      <form onSubmit={formik.handleSubmit}>
                        <div className="form-outline form-white mb-4 text-start fw-bold text-black-50">
                          <label className="">Your Email</label>
                          <input
                            type="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            placeholder="Enter Email"
                            className={`form-control form-control-lg ${
                              formik.touched.email && formik.errors.email
                                ? "error-box"
                                : ""
                            }
                      ${
                        formik.touched.email && !formik.errors.email
                          ? "succes-box"
                          : ""
                      }`}
                          />
                          {formik.touched.email && formik.errors.email ? (
                            <span style={{ color: "red" }}>
                              {formik.errors.email}
                            </span>
                          ) : null}
                        </div>
                        <div className="bg-dark ">
                          <button
                            className="btn btn-lg text-white btn-outline-dark"
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                      <p className="mt-3">
                        <Link className="fw-bold text-black-50" to={"/"}>
                          Go back to login
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="vh-100">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card bg-light text-black">
                  <div className="card-body p-5 text-center">
                    <div className="mb-md-5 mt-md-4">
                      <h2 className="fw-bold mb-2">Check your Email</h2>
                      <p className="text-black mb-3 fw-bold text-start">
                        Please go to your email account {mail.email} and click
                        the password reset button in the email we've sent for
                        your Polymer account.
                      </p>
                      <p className="text-black mb-3 fw-bold text-start">
                        It could take a few minutes for the email to appear.
                        Please be sure to check spam folder if you can't find
                        the email we sent.
                      </p>
                      <div className="mt-4 bg-dark border rounded">
                        <Link
                          className="fw-bold text-white btn btn-lg btn-outline-dark"
                          to={"/"}
                        >
                          Go back to login
                        </Link>
                      </div>
                      <form onSubmit={formik.handleSubmit}>
                      <div className="mt-4 bg-white border rounded">
                          <button className="btn btn-lg" type="submit">
                            Resent Email
                          </button>
                      </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Forgot;
