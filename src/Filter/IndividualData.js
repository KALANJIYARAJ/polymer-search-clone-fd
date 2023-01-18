import React from 'react'

export const IndividualData = ({individualExcelData}) => {
   
let value = (Object.values(individualExcelData));

    return (
        <>{value.map((val,index)=>(<td scope='col' key ={index}>{val}</td>))}
        </>
    )
}