import React from 'react'
import  './image/desktop.png';

export const Responsive = () => {
  return (
    <div className="container-fluid  vh100">

    <div className="container forcenter text-center fontfamily ">
      <div
        className="row justify-content-center g-4 p-2 "
        style={{ width: "35rem" }}>
            <div className='col-12'>
                <img className='img-fluid' src= "https://png.pngtree.com/png-vector/20190724/ourlarge/pngtree-laptop-and-monitor-pc-png-image_1584306.jpg" alt='Switch to desktop' />
            <h1>Your screen is too small</h1>
        <p>Switch to desktop to able to use polymer search</p>
            </div>

      </div>
    </div>
  </div>
 
        
   
  )
}
