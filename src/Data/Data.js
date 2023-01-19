import React from 'react'
import * as Icon from "react-bootstrap-icons";

function Data({fName}) {
  return (
    <>
    <div
      className="btn btn-outline-dark px-3 mt-2 text-start buttonwidth"
      onClick={() => fName("All Apps","all-apps")}
    >
      <Icon.Radioactive /> All Apps
    </div>
    <div
      className="btn btn-outline-dark px-3 mt-2 text-start buttonwidth"
      onClick={() => fName("Favorites","favorites")}
    >
      <Icon.Heart /> Favorites
    </div>
    {/* <div
      className="btn btn-outline-dark px-3 mt-2 text-start buttonwidth"
      onClick={() => fName("Shared","shared")}
    >
      <Icon.Globe /> Shared
    </div> */}
    <div
      className="btn btn-outline-dark px-3 mt-2 text-start buttonwidth"
      onClick={() => fName("Trash","trash")}
    >
      <Icon.Trash /> Trash
    </div></>
  )
}

export default Data