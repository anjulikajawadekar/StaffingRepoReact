import React, {useState} from 'react'
import {Datepicker, START_DATE} from '@datepicker-react/styled'

function CalenderApp() {
  const [state, setState] = useState({
    startDate: null,
    endDate: null,
    focusedInput: START_DATE,
  })

  const [start, setStart]=useState();
  const[end, setEnd]=useState();

  function handleDatesChange(data) {
    if (!data.focusedInput) {
      setState({...data, focusedInput: START_DATE})

      console.log("Start Date: "+ state.startDate);
      console.log("End Date: "+ state.endDate);
      console.log("FocusedInput : "+state.focusedInput);
    } else {
      setState(data)
    }
  }

  return (
    <Datepicker
    
      onDateChange={handleDatesChange}
      startDate={state.startDate} // Date or null
      endDate={state.endDate} // Date or null
      focusedInput={state.focusedInput} // START_DATE, END_DATE or null
    />

  )
}

export default CalenderApp;

// import { useState } from 'react';
// import Calendar from 'react-calendar';
// import './App.css';

// function CalenderApp() {
//     const [date, setDate] = useState(new Date())

//     return (
//         <div className="app">
//             <h1 className="header">React Calendar</h1>
//             <div className="calendar-container">
//                 <Calendar onChange={setDate} value={date} />
//             </div>
//             <div className="text-center">
//                 Selected date: {date.toDateString()}
//             </div>
//         </div>
//     )

// }

// export default CalenderApp;