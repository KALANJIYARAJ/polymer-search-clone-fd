import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../config";
import { UserContext } from "../UserContext";

function Modal() {
  const {user} = useContext(UserContext);
  const navigate = useNavigate();
  const userId = localStorage.getItem("user");
  const {head, setHead} = useContext(UserContext);
  const {workspace, setWorkspace} = useContext(UserContext);
  const { currentWorkSpace, setCurrentWorkSpace } = useContext(UserContext);


  let fetchData = async () => {
    try {
      const getWorkSpace = await axios.get(`${config.api}/workspace/${userId}`, {
        headers: {
          Authorization: localStorage.getItem("myreact"),
        },
      });
        let message = getWorkSpace.data.message;
        let workSpace = getWorkSpace.data.workspace
        if(workSpace.length > 0){
         setWorkspace(workSpace);
        setHead(workSpace[0].name);
        setCurrentWorkSpace(workSpace[0]);
        }
    } catch (error) {
      alert("Something went for workSpace get");
        
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
       navigate("/portal");
     } catch (error) {
      alert("Error");
      navigate("/logout");
     }
   },
 });
//  console.log(user._id);

let urls =formik.values.url ? formik.values.url : formik.values.name.toLowerCase();
  return (
    <>
      <div className="row p-3 justify-content-center">
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
                     value={formik.values.url}
                     placeholder="coustom url"
                     className="form-control form-control-lg"
                    />
                    <div className="text-primary">suggestion: {`${config.api}/${urls}/${userId}`}</div>
                    <input
                     type="hidden"
                     name="link"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.link =`${config.api}/${formik.values.url}/${userId}`}
                     placeholder="coustom url"
                     className="form-control form-control-lg"
                    />
                  </div>
                  <hr/>
                  <button type="submit" className="btn btn-secondary btn-lg me-2">
                    Create
                  </button>

                  <button onClick={() =>{
                     navigate("/portal")
                  }} 
                  className="btn btn-secondary btn-lg">
                    close
                  </button>

                </form>
              </div>
            </div>
          </div>
        <div className="col-12" style={{ height: "500px" }}>
         
        </div>
      </div>
    </>
  );
}

export default Modal;
