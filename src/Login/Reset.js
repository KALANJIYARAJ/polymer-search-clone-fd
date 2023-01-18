import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { config } from '../config';

export default function Reset() {
    const param = useParams();
    const navigate = useNavigate();
        const formik = useFormik({
      initialValues: {
        password: "",
        password1:""
      },
  
      validate: (values) => {
        let error = {};
       
      if (!values.password) {
        error.password = "Please Enter Password";
      }

      if (values.password && values.password.length < 8) {
        error.password = "Your password must be above 8 characters";
      }

      if (!values.password1) {
        error.password1 = "Please Enter Password";
      }

      if (values.password1 && values.password1.length < 8) {    
        error.password1 = "Your password must be above 8 characters";
      }
        return error;
      },
  
      onSubmit: async (values) => {
        try {
            if(formik.values.password === formik.values.password1){
            await axios.post(
              `${config.api}/reset/${param.userId}`,
              values
              );
              alert("Success");
              formik.resetForm();
              navigate("/");
            }else{
                alert("password doesn't same");}
        } catch (error) {
          alert("incorrect username");
        }
      },
    });
  
    return (
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-light text-black"
                >
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4">
                    <h2 className="fw-bold mb-2">Insert your new password</h2>
                    <form onSubmit={formik.handleSubmit}>
                      <div className="form-outline form-white mb-4 text-start fw-bold text-black-50">
                      <label className="text-start">New Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  values={formik.values.password}
                  placeholder="Password"
                  className={`form-control form-control-lg ${
                    formik.touched.password && formik.errors.password
                      ? "error-box"
                      : ""
                  }
          ${
            formik.touched.password && !formik.errors.password
              ? "succes-box"
              : ""
          }`}
                />
                {formik.touched.password && formik.errors.password ? (
                  <span style={{ color: "red" }}>{formik.errors.password}</span>
                ) : null}
                      </div>
                      <div className="form-outline form-white mb-4 text-start fw-bold text-black-50">
                      <label className="text-start">Confirm Password</label>
                <input
                  type="password"
                  name="password1"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  values={formik.values.password1}
                  placeholder="Password"
                  className={`form-control form-control-lg ${
                    formik.touched.password1 && formik.errors.password1
                      ? "error-box"
                      : ""
                  }
          ${
            formik.touched.password1 && !formik.errors.password1
              ? "succes-box"
              : ""
          }`}
                />
                {formik.touched.password1 && formik.errors.password1 ? (
                  <span style={{ color: "red" }}>{formik.errors.password1}</span>
                ) : null}
                      </div>
                      <div className="bg-dark ">
                      <button
                        className="btn btn-lg text-white btn-outline-dark"
                        type="submit"
                      >
                       Submit
                      </button></div>
                    </form>
                    <p className="mt-3"><Link className="fw-bold text-black-50" to={"/"}>Go back to login</Link></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}
