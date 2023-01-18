import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { config } from '../config';
import {Data} from './Data1'

function PolymerSearch() {
  const [excelData, setExcelData] = useState(null);
  const [objectName, setObjectName] = useState(null);
  const navigate = useNavigate();
  const param = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  let fetchData = async () => {
    try {
      let user_id = localStorage.getItem("user");
      const xlxsData = await axios.get(`${config.api}/polymer/${param._id}`, {
        headers: {
          Authorization: localStorage.getItem("myreact"),
        },
      });
      console.log(xlxsData.data[0].source);
      let input = xlxsData.data[0].source;
      setExcelData(xlxsData.data[0].source);
      console.log(input[0]);
      setObjectName(Object.keys(input[0]));
    } catch (error) {
      alert("Error");
      navigate("/logout");
    }
  };

  return (
    <div>
       <h5>View Excel file</h5>
      <div className='viewer'>
        {excelData===null&&<>No file selected</>}
        {excelData!==null&&(
          <div className='table-responsive'>
            <table className='table'>
              <thead>
                <tr>
                  {objectName.map((obj,index)=>(<th scope='col' key={index}>{obj}</th>))}
                </tr>
              </thead>
              <tbody>
                <Data excelData={excelData}/>
              </tbody>
            </table>            
          </div>
        )}       
      </div>
    </div>
  )
}

export default PolymerSearch