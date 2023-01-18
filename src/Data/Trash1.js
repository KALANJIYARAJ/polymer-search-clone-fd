import axios from 'axios';
import React, { useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { config } from '../config';
import { UserContext } from '../UserContext';

function Trash1() {
  const {polymers, setPolymers} = useContext(UserContext);
  const navigate = useNavigate();
  let count = 1;

  let fetchData = async () => {
    try {
      let user_id = localStorage.getItem("user");
      const xlxsData = await axios.get(`${config.api}/upload/${user_id}`, {
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

  let typeChange = async (id,type) => {
    try {
      let values ={type}
      const typeChange = await axios.post(`${config.api}/type/${id}`, values, {
        headers: {
          Authorization: localStorage.getItem("myreact"),
        },
      });
      alert(typeChange.data.message);
      fetchData();
    } catch (error) {
      alert("Error");
      // navigate("/logout");
    }
  }

  let deleteItem = async (id) => {
    try {
      const typeChange = await axios.delete(`${config.api}/deletefile/${id}`, {
        headers: {
          Authorization: localStorage.getItem("myreact"),
        },
      });
      alert(typeChange.data.message);
      fetchData();
    } catch (error) {
      alert("Error");
      // navigate("/logout");
    }
  }

  return (
    <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">No</th>
        <th scope="col">File Name</th>
        <th scope="col">Type</th>
        <th scope="col">Action Type</th>
      </tr>
    </thead>
    <tbody>
    {polymers.map((item, index) => {
      if(item.type === "trash"){
      return(
        <tr key={index}>
        <th scope="row">{count++}</th>
        <td>{item.FileName}</td>
        <td>{item.type}</td>
        <td className="">
          <Link className='btn btn-sm btn-success' to={`/ploymerview`} state={{item}}> View </Link >
          <Link onClick={()=>{typeChange(item._id,"normal")}}  className='btn btn-sm btn-warning m-1'> Resotore </Link >
          <Link onClick={()=>{deleteItem(item._id)}}   className='btn btn-sm btn-danger'> Delete </Link >
          </td>
      </tr>
      )}
      }
      )}
  
    </tbody>
  </table>
  )
}

export default Trash1