import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { config } from "../config";

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
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

      if (!values.password) {
        error.password = "Please Enter Password";
      }

      if (values.password && values.password.length < 8) {
        error.password = "Your password must be above 8 characters";
      }

      return error;
    },

    onSubmit: async (values) => {
      try {
        const user1 = await axios.post(`${config.api}/login`, values);
        if (user1.data.message == 'login successfully') {
          localStorage.setItem("myreact",user1.data.token);
          localStorage.setItem("user",user1.data.user._id);
          navigate("/portal");
        }else {
          alert("incorrect username/password");
        }
      } catch (error) {
        alert("incorrect username/password");
      }
    },
  });

  return (
    <div className="container-fluid">
      <span className="fw-bold">
        <img
          src="https://app.polymersearch.com/v2/icons/logo.svg"
          className="icon ms-2"
        />
        <sub>clone</sub>
      </span>
      <div className="container forcenter text-center fontfamily">
        <div
          className="row justify-content-center g-4 p-2"
          style={{ width: "35rem" }}
        >
          {" "}
          <form onSubmit={formik.handleSubmit}>
            <div className="col-lg-12 mb-4">
              <h3>Login</h3>
            </div>
            {/* <div className="col-lg-12 border rounded mb-4">
              <img
                src="https://app.polymersearch.com/icons/google-account.svg"
                className="icon1"
              ></img>
              <a className="btn btn-lg" href={"https://www.google.com/"}>
                <span>Sign in with Google </span>
              </a>
            </div>
            <div className="col-lg-12 bg-primary rounded mb-4">
              <img
                src="https://app.polymersearch.com/icons/f_logo_RGB-White_100.png"
                className="icon1"
              ></img>
              <a className="btn btn-lg" href={"https://www.google.com/"}>
                <span>Sign in with Google</span>
              </a>
            </div>
            <p className="divider text-black-50">or</p> */}

            <div className="col-lg-12">
              <div className="form-outline form-white mb-4 text-start">
                <label className="">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  placeholder="Email"
                  className={`form-control form-control-lg ${
                    formik.touched.email && formik.errors.email
                      ? "error-box"
                      : ""
                  }
        ${formik.touched.email && !formik.errors.email ? "succes-box" : ""}`}
                />
                {formik.touched.email && formik.errors.email ? (
                  <span style={{ color: "red" }}>{formik.errors.email}</span>
                ) : null}
              </div>

              <div className="form-outline form-white text-start mb-2">
                <label className="text-start">Password</label>
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
                ></input>
                {formik.touched.password && formik.errors.password ? (
                  <span style={{ color: "red" }}>{formik.errors.password}</span>
                ) : null}
              </div>

              <p className="text-black-50 fw-bold text-start mb-4">
                Forgot password?
                <Link className="text-black fw-bold" to={"/forgot"}>Reset it</Link>
              </p>
            </div>
            <div className="col-lg-12 bg-dark rounded mb-2">
              <button className="btn text-white btn-lg btn-outline-dark" type="submit">
                Login
              </button>
            </div>
            <div className="col-lg-12">
              <p className=" text-black-50 fw-bold">
                Don't have an account?{" "}
                <Link to={"/signup"} className="text-black fw-bold">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
