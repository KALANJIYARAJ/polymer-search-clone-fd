import React from 'react'
import { FcDataSheet } from "react-icons/fc";
import { FaGoogleDrive } from "react-icons/fa";
import * as Icon from "react-bootstrap-icons";

function Sources({fName}) {
  return (
    <>
    <div
      className="btn btn-outline-dark text-start buttonwidth px-3 mt-2 "
      onClick={() => fName("This function is temporery disaple by admin. we will update soon","/portal")}
    >
      <Icon.FileEarmarkPlus /> Uploaded Data
    </div>
    <div
      className="btn btn-outline-dark px-3 mt-2 text-start buttonwidth"
      onClick={() => {fName("This function is temporery disaple by admin. we will update soon","/portal")}}
    >
      <FcDataSheet /> Example Datasets
    </div>
    <div
      className="btn btn-outline-dark px-3 mt-2 text-start buttonwidth"
      onClick={() => {fName("This function is temporery disaple by admin. we will update soon","/portal")}}
    >
      <FaGoogleDrive /> Raj Epic5
    </div></>
  )
}

export default Sources