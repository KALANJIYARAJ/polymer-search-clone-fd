import React from 'react'
import { IndividualData } from './IndividualData'


export const Data1 = ({data}) => {
    return data.map((individualExcelData,index)=>(
        <tr key={index}>
            <IndividualData individualExcelData={individualExcelData}/>
        </tr>        
    ))
}