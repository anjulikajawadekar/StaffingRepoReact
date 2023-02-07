// import { Datepicker } from "@datepicker-react/styled";
import React from "react"
import ReactDatePicker from 'react-datepicker';
import 'bootstrap/dist/css/bootstrap.min.css';

function CalenderApp2() {
    const startDate=0;
    const handleDateChange=(e)=>{
        const a1 = e;
        console.log("startDate= "+a1);
    }  

    return (
        <div>
        <ReactDatePicker dateFormat="yyyy/MM/dd" selected={startDate} onChange={handleDateChange}/>
        <ReactDatePicker dateFormat="yyyy/MM/dd" onChange={handleDateChange}/>        
        </div>
    );
}

export default CalenderApp2;

