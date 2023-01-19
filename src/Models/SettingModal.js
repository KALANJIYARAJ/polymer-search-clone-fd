import axios from 'axios';
import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { config } from '../config';
import { UserContext } from '../UserContext';

export const SettingModal = () => {

  const navigate = useNavigate();
  const {workspace, setWorkspace} = useContext(UserContext);
  const {setHead} = useContext(UserContext);
  const { setCurrentWorkSpace } = useContext(UserContext);

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

  //delete workSpace:-
  let deleteWorkSpace = async (id) => {
    try {
      await axios.delete(`${config.api}/deleteworkspace/${id}`,{
       headers: {
         Authorization: localStorage.getItem("myreact"),
       }
     });
    alert("Work Space delete successfully");
    fetchData();
    navigate("/portal");
  } catch (error) {
   alert("Internal Server Error");
   navigate("/logout");
  }
  }

  return (
    <div className="row p-3 justify-content-center">
          <div className="col-12 rajmodal">
            <div className="row bg-light">
              <div className="col-12 p-5">
                <h5 className="text-center">Delete Workspace</h5>
                <hr/>

              {workspace.map((wpItem)=><><button onClick={()=>deleteWorkSpace(wpItem._id)} className='btn btn-outline-dark px-3 m-2  text-center buttonwidth-1 '>{wpItem.name}</button></> )}
             
              <hr/>
              <Link className='btn btn-dark' to = {"/portal"}>close</Link>
              </div>
            </div>
          </div>
        <div className="col-12" style={{ height: "500px" }}>
         
        </div>
      </div>
  )
}
