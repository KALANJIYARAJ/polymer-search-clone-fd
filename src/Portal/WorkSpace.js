import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import * as Icon from "react-bootstrap-icons";
import axios from "axios";
import { config } from "../config";

export const WorkSpace = () => {
  const { head, setHead } = useContext(UserContext);
  const { workspace, setWorkspace } = useContext(UserContext);
  const { currentWorkSpace, setCurrentWorkSpace } = useContext(UserContext);
  const { model, setModel } = useContext(UserContext);
  const user_id = localStorage.getItem("user");

  useEffect(() => {
    fetchData();
  }, []);

  let fetchData = async () => {
    try {
      const getWorkSpace = await axios.get(
        `${config.api}/workspace/${user_id}`,
        {
          headers: {
            Authorization: localStorage.getItem("myreact"),
          },
        }
      );
      let message = getWorkSpace.data.message;
      let workSpace = getWorkSpace.data.workspace;
      if (workSpace.length > 0) {
        setWorkspace(workSpace);
        setHead(workSpace[0].name);
        setCurrentWorkSpace(workSpace[0]);
      }
    } catch (error) {
      alert("Something went for workSpace get");
    }
  };

  return (
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

        <ul className="dropdown-menu text-center" style={{ width: "300px" }}>
          {workspace.map((item, index) => {
            return (
              <li>
                <button
                  onClick={() => {
                    setCurrentWorkSpace(item);
                    setHead(item.name);
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
  );
};
