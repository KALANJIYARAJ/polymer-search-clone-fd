import { Link, Outlet, useNavigate } from "react-router-dom";
import { BiRefresh } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import * as Icon from "react-bootstrap-icons";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { config } from "../config";
import SourceModal from "../AddSource/SourceModal";
import Sources from "../Sources/Sources";
import Data from "../Data/Data";

function PortalLayout() {
  const [head, setHead] = useState("Raj workSpace");
  const [workspace, setWorkspace] = useState([]);
  const { model, setModel } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  let fetchData = async () => {
    try {
      const workSpace = await axios.get(`${config.api}/workspace/${user._id}`, {
        headers: {
          Authorization: localStorage.getItem("myreact"),
        },
      });
      setWorkspace(workSpace.data);
    } catch (error) {
      alert("Error");
      navigate("/logout");
    }
  };

  let getPolymers = (name, link) =>{
    setHead(name);
    navigate(`${link}`);
  }

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
                />{" "}
                Raj's Workspace
              </a>

              <ul
                className="dropdown-menu text-center"
                style={{ width: "300px" }}
              >
                {workspace.map((item, index) => {
                  return (
                    <li>
                      <button className="dropdown-item p-2 bg-light text-black mt-1">
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
                onClick={()=>{setModel(true)}}
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
           <Data fName = { getPolymers } />
          </p>
          <p>
            Sources ( Temporery Disaple )
            <br />
           <Sources fName = { getPolymers } />
          </p>
          <div className="row" style={{ height: "45%" }}>
            <div className="col-12 align-self-end">
              <div className="btn btn-outline-dark px-3 mt-2 text-start buttonwidth">
                <Icon.Gear /> Workspace Settings
              </div>
              <div className="btn btn-outline-dark px-3 mt-2 text-start buttonwidth">
                <Icon.PersonPlus /> Add Collaborator
              </div>
            </div>
          </div>
        </div>
        <div className="vl col-lg-10">
          <div className="row justify-content-between m-3 gx-5">
            <div className="col-6">
              <div className="mt-2">{head}</div>
            </div>
            <div className="col-4">
              <form className="d-flex" role="search">
                <input
                  className="form-control me-3"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />

                <button className="btn btn-dark">+import</button>

                {/* <span className="bg-danger p-2 rounded">Rk</span> */}
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
                      <Link className="dropdown-item text-center" to={"/portal"}>
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
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to={"/logout"}
                      >
                        <FiLogOut />
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </form>
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
