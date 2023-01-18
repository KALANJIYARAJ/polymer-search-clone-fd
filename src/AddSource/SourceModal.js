import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { SiGooglesheets } from "react-icons/si";
import { ImGoogleDrive } from "react-icons/im";
import { CgSoftwareUpload } from "react-icons/cg";
import { config } from "../config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";

function SourceModal() {
  const { model, setModel } = useContext(UserContext);
  const inputRef = React.useRef(null);
  // const [file, setFile] = useState();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = () => {
    // 👇️ open file input box on click of other element
    inputRef.current.click();
  };

  const [excelData, setExcelData] = useState(null);

  function handleFile(e) {
    let selectedFile = e.target.files[0];
    let FileName = selectedFile.name;
    if (selectedFile) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = (e) => {
        let value = e.target.result;
        // setExcelFile(value);
        handleUpload(e, value, FileName);
      };
    } else {
      console.log("plz select your file");
    }
  }

  function handleUpload(e, value, FileName) {
    e.preventDefault();
    if (value) {
      const workbook = XLSX.read(value, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
      // setObjectName(Object.keys(data[0]));
      uploadFile(data, FileName);
    } else {
      setExcelData(null);
      return;
    }
  }

  //upload csv/xlsx of json to mongodb
  let uploadFile = async (data, FileName) => {
    let user_id = localStorage.getItem("user");
    let type = "normal"
    let values = { data, FileName, user_id, type };
    try {
      const upload = await axios.post(`${config.api}/upload`, values, {
        headers: {
          Authorization: localStorage.getItem("myreact"),
        },
      });
      console.log(upload);
    } catch (error) {
      alert("Internal Server Error",error);
      navigate("/logout");
    }
  };

  return (
    <>
      <div className="row p-3 justify-content-center">
        {model ? (
          <div className="col-12 rajmodal bg-white  p-3">
            <h5 className="">Connect your data source</h5>
            <hr />
            <div className="row g-3">
              <div className="col-lg-3">
                <input
                  style={{ display: "none" }}
                  ref={inputRef}
                  type="file"
                  onChange={handleFile}
                />
                <button
                  onClick={() => {
                    handleClick();
                  }}
                  className="bg-light p-2 btn"
                >
                  <CgSoftwareUpload /> XLS or CSV
                </button>
              </div>
              <div className="col-lg-3">
                <input
                  style={{ display: "none" }}
                  ref={inputRef}
                  type="file"
                  onChange={handleFile}
                />
                <button
                  onClick={() => {
                    alert(
                      "Sorry!! This Option not enable now, we will update our feature"
                    );
                  }}
                  className="bg-light p-2 btn"
                >
                  <ImGoogleDrive /> Google Drive
                </button>
              </div>
              <div className="col-lg-3">
                <input
                  style={{ display: "none" }}
                  ref={inputRef}
                  type="file"
                  onChange={handleFile}
                />
                <button
                  onClick={() => {
                    alert(
                      "Sorry!! This Option not enable now, we will update our feature"
                    );
                  }}
                  className="bg-light p-2 btn"
                >
                  <SiGooglesheets /> Google Sheet
                </button>
              </div>
            </div>
            <br />
            <button onClick={() => setModel(false)} className="btn btn-dark">
              Close
            </button>
          </div>
        ) : null}
        <div className="col-12" style={{ height: "500px" }}></div>
      </div>
    </>
  );
}

export default SourceModal;
