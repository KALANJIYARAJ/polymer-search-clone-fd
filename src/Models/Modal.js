import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../config";
import { UserContext } from "../UserContext";

function Modal() {
  const {user} = useContext(UserContext);
  const [show, setShow] = useState(true);
  const userId = localStorage.getItem("user");
  const navigate = useNavigate();
  const {setWorkspace} = useContext(UserContext);
  const {setHead} = useContext(UserContext);
  const {setCurrentWorkSpace } = useContext(UserContext);

  let fetchData = async () => {
    try {
      let user_id = localStorage.getItem("user");
      const workSpace = await axios.get(`${config.api}/workspace/${user_id}`, {
        headers: {
          Authorization: localStorage.getItem("myreact"),
        },
      });
      setWorkspace(workSpace.data);
      setHead(workSpace.data[0].name);
      setCurrentWorkSpace(workSpace.data[0]);
    } catch (error) {
      alert("Error");
      navigate("/logout");
    }
  };

  const formik = useFormik({
   initialValues: {
     name: "",
     url: "",
     link:"",
     user_id:userId,
   },

   onSubmit: async (values) => {
     try {
         await axios.post(`${config.api}/workspace`, values,{
          headers: {
            Authorization: localStorage.getItem("myreact"),
          }
        });
       formik.resetForm();
       fetchData();
       setShow(false);
       navigate("/portal");
     } catch (error) {
      alert("Error");
      navigate("/logout");
     }
   },
 });
//  console.log(user._id);

let urls = formik.values.name.toLowerCase();
  return (
    <>
      <div className="row p-3 justify-content-center">
        {show ? (
          <div className="col-12 rajmodal">
            <div className="row bg-light">
              <div className="col-12 p-5">
                <h5 className="text-center">Create WorkSpace</h5>
                <hr/>
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">
                      Name
                    </label>
                    <input
                     type="text"
                     name="name"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.name}
                     placeholder="workspace name"
                     className="form-control form-control-lg"
                    />

                  </div>
                  <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">
                      URL
                    </label>
                    <input
                     type="text"
                     name="url"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.url? formik.values.url : urls}
                     placeholder="coustom url"
                     className="form-control form-control-lg"
                    />
                    <input
                     type="hidden"
                     name="link"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.link =`${config.api}/${formik.values.url}/${user._id}`}
                     placeholder="coustom url"
                     className="form-control form-control-lg"
                    />
                  </div>
                  <div>{`${config.api}/${formik.values.url}/${user._id}`}</div>
                  <hr/>
                  <button type="submit" className="btn btn-secondary btn-lg me-2">
                    Create
                  </button>

                  <button onClick={() =>{
                     setShow(false)
                     navigate("/portal")
                  }} 
                  className="btn btn-secondary btn-lg">
                    close
                  </button>

                </form>
              </div>
            </div>
          </div>
        ) : null}
        <div className="col-12" style={{ height: "500px" }}>
         
        </div>
      </div>
    </>
  );
}

export default Modal;
