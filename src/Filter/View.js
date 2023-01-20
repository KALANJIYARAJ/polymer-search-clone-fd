import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Data1 } from "./Data1";
import NumericFilter from "./NumericFilter";
import { utils, writeFile } from 'xlsx';

function View() {
  const location = useLocation();
  const { model, setModel } = useContext(UserContext);
  const [indexval, setIndexVal] = useState(null);
  const FileName = location.state.item.FileName;
  const Users = location.state.item.data;
  const [Users1, setUsers1] = useState([]);
  const objectName = Object.keys(Users[0]);
  const valueName = Object.values(Users[0]);
  const navigate = useNavigate();




  useEffect(() => {
    setUsers1(Users);
  }, []);

  const numericFilter = (value1,value2) => {
    var key = objectName[indexval];
    var data = Users;
    let manualFilter =data.filter((item) => item[key] >= value1 && item[key] <= value2 )
    setUsers1(manualFilter);
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

  const handleExport = () => {
    const headings = [objectName];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, Users1, { origin: 'A2', skipHeader: true });
    utils.book_append_sheet(wb, ws, FileName);
    writeFile(wb, `Polymer ${FileName}`);
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-between">
        <div className="col-lg-2 mt-2 p-3">
          <button onClick={()=>navigate("/portal/all-apps")} className="btn btn-danger me-2"> Back</button>
          <button onClick={()=>handleExport()} className="btn btn-success"> Exprot</button>
          <br/><br/>
          
          <h4>Categories:</h4>
          
          <br/>Numerical
    {valueName.map((val, index) => { if(typeof(val) == "number") {return(<button onClick={()=>{
    setModel(true)
    setIndexVal(index)}
    } className="btn btn-outline-dark px-3 mt-2 text-center buttonwidth">{objectName[index]}</button>)}}
  )}
        </div>
        <div className="col-lg-10">
          <div className="container-fluid" style={{ height: "90%" }}>
           {model ? <NumericFilter values = { numericFilter }/> :<div>
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
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default View;
