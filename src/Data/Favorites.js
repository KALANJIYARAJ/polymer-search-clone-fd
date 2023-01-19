import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

function Favorites() {
  const { polymers } = useContext(UserContext);
  let count  = 1;

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
  if(item.type === "favorites"){
  return(
    <tr key={index}>
    <th scope="row">{count++}</th>
    <td>{item.FileName}</td>
    <td>{item.type}</td>
    <td className="">
      <Link className='btn btn-sm btn-success' to={`/ploymerview`} state={{item}}> View </Link >
      </td>
  </tr>
  )}
  }
  )}

</tbody>
</table>
)
}

export default Favorites