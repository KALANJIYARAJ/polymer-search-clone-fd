import { Link, Outlet, useNavigate } from "react-router-dom";
import { BiRefresh } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import * as Icon from "react-bootstrap-icons";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { config } from "../config";
import SourceModal from "../Models/SourceModal";
import Data from "../Data/Data";

function PortalLayout() {
  const {head, setHead} = useContext(UserContext);
  const {workspace, setWorkspace} = useContext(UserContext);
  const { model, setModel } = useContext(UserContext);
  const { user, setUser } = useContext(UserContext);
  const { currentWorkSpace, setCurrentWorkSpace } = useContext(UserContext);
  const {polymers, setPolymers} = useContext(UserContext);
  const navigate = useNavigate();
  const { setFilterPolymer } = useContext(UserContext);

  useEffect(() => {
    fetchData();
    fetchUser();
  }, []);

  let fetchUser = async () => {
    try {
      let user_id = localStorage.getItem("user");
      const getUser = await axios.get(`${config.api}/user/${user_id}`, {
        headers: {
          Authorization: localStorage.getItem("myreact"),
        },
      });
      setUser(getUser.data[0]);
    } catch (error) {
      alert("Error");
      navigate("/logout");
    }
  };
  
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

  let fetchFile = async (item) => {
    setCurrentWorkSpace(item);
    setHead(item.name);
    try {
      const xlxsData = await axios.get(`${config.api}/upload/${item._id}`, {
        headers: {
          Authorization: localStorage.getItem("myreact"),
        },
      });
      setPolymers(xlxsData.data);
    } catch (error) {
      alert("Error");
      navigate("/logout");
    }
  };

  let getPolymers = (name, link) => {
    setHead(name);
    navigate(`${link}`);
  };

const globalFilter = (data, value) => {
     
    const objectName = Object.keys(data[0]);

    setFilterPolymer(data.filter((item) =>
    objectName.some((key) =>
      item[key].toString().toLowerCase().includes(value)
    ))
    );
  };

  return (
    <div className="container-fluid bg-light">
      <div className="row justify-content-between">
        <div className="col-lg-2 mt-2 p-3">
          <span className="fw-bold">
            <div className="dropdown">
              <a
                className="btn btn-light dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://app.polymersearch.com/v2/logo-sm.svg"
                  className=""
                  style={{ width: "20px", height: "20px" }}
                />
                {currentWorkSpace.name}
              </a>

              <ul
                className="dropdown-menu text-center"
                style={{ width: "300px" }}
              >
                {workspace.map((item, index) => {
                  return (
                    <li>
                      <button
                        onClick={() => {
                          fetchFile(item)
                        }}
                        className="dropdown-item p-2 bg-light text-black mt-1"
                        key={index}
                      >
                        {item.name}
                      </button>
                    </li>
                  );
                })}
                <hr />
                <li>
                  <Link
                    className="dropdown-item border rounded m-4 p-2 btn-outline-dark"
                    to={"modal"}
                    style={{ width: "250px" }}
                  >
                    + New Workspace
                  </Link>
                </li>
              </ul>
              <br />
              <br />
              <button
                className="btn btn-outline-dark buttonwidth"
                onClick={() => {
                  setModel(true);
                }}
              >
                <Icon.PlusCircle /> Add Source
              </button>
              <br />
            </div>
          </span>
          <br /> <br />
          <p>
            Data
            <br />
            <Data fName={getPolymers} />
          </p>
          {/* <p>
            Sources ( Temporery Disaple )
            <br />
           <Sources fName = { getPolymers } />
          </p> */}
          <div className="row" style={{ height: "65%" }}>
            <div className="col-12 align-self-end">
              <Link className="btn btn-outline-dark px-3 mt-2 text-start buttonwidth" to={"setting"} state={workspace}>
                <Icon.Gear /> Workspace Settings
              </Link>
              {/* <div className="btn btn-outline-dark px-3 mt-2 text-start buttonwidth">
                <Icon.PersonPlus /> Add Collaborator
              </div> */}
            </div>
          </div>
        </div>
        <div className="vl col-lg-10">
          <div className="row justify-content-between m-3 gx-5">
            <div className="col-6">
              <div className="mt-2">{head}</div>
            </div>
            <div className="col-4">
              <div className="d-flex">
                 <input
                type="text"
                placeholder="search..."
                className="form-control me-3"
                style={{ width: "30rem" }}
                onChange={(e) =>
                  globalFilter(polymers, e.target.value.toLowerCase()) 
                }
              />

                <button
                  onClick={() => {
                    setModel(true);
                  }}
                  className="btn btn-dark"
                >
                  +import
                </button>

                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-outline-light rounded"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img src="https://app.polymersearch.com/v2/icons/kebab-menu.svg"></img>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        className="dropdown-item text-center"
                        to={"/portal"}
                      >
                        <BiRefresh /> Refresh List
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-danger rounded"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Rk
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <div
                        className="dropdown-item border m-1 bg-dark text-white"
                        style={{ width: "15rem" }}
                      >
                        {user.email}
                      </div>
                    </li>
                    <li>
                      <Link className="dropdown-item" to={"setting"} state={workspace}>
                        <Icon.Gear />
                        &nbsp; &nbsp;Account Settings
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to={"/logout"}>
                        <FiLogOut />
                        &nbsp; &nbsp;Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="container-fluid" style={{ height: "90%" }}>
            {model ? <SourceModal /> : <Outlet />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortalLayout;
