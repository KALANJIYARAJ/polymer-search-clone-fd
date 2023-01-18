import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Data1 } from "./Data1";

function View() {
  const location = useLocation();
  const FileName = location.state.item.FileName;
  const Users = location.state.item.data;
  const [Users1, setUsers1] = useState([]);
  const objectName = Object.keys(Users[0]);
  const valueName = Object.values(Users[0]);
  const navigate = useNavigate();


  // setUsers1(Users);
  useEffect(() => {
    setUsers1(Users);
  }, []);

  const group = () => {
    valueName.map((val, index) => {
      if(typeof(val) == "number"){
       console.log("Number:"+ 1);
      }else if (typeof(val) == "string") {
        console.log("String:"+ 1);
      } else {
        console.log("others:"+ 1);
      }
    }
    )
  };

  const globalFilter = (data, value) => {
    setUsers1(
      data.filter((item) =>
        objectName.some((key) =>
          item[key].toString().toLowerCase().includes(value)
        )
      )
    );
  };

  const columnFilter = (key, data, value) => {
    setUsers1(
      data.filter((item) => item[key].toString().toLowerCase().includes(value))
    );
  };

  return (
    <div className="container-fluid bg-light">
      <div className="row justify-content-between">
        <div className="col-lg-2 mt-2 p-3">
          <button onClick={()=>group()} className="btn btn-danger"> group</button><br/><br/><br/>


        {valueName.map((val, index) => (<button className="btn btn-outline-dark px-3 mt-2 text-center buttonwidth">{typeof(val)}</button>))}
        </div>
        <div className="vl col-lg-10">
          <div className="container-fluid" style={{ height: "90%" }}>
            <div>
              <br />
              <br />
              <h3 className="text-center">{FileName}</h3>
              <br />
              <input
                type="text"
                placeholder="search..."
                className="rounded-pill border border-.5 p-3"
                style={{ width: "30rem" }}
                onChange={(e) =>
                  globalFilter(Users, e.target.value.toLowerCase())
                }
              />
              <i class="fas fa-search"></i>
              <br />
              <br />
              <div className="viewer">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        {objectName.map((obj, index) => (
                          <th scope="col" key={index}>
                            {obj}<br/>
                            <input
                              type="text"
                              placeholder="search..."
                              className="rounded border border-.5 p-1"
                              style={{ width: "5rem" }}
                              onChange={(e) => {
                                columnFilter(
                                  obj,
                                  Users,
                                  e.target.value.toLowerCase()
                                );
                              }}
                            />
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <Data1 data={Users1} />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default View;
