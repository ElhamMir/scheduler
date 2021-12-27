//import React from "react";
import React, { useState,useEffect } from "react";
import axios from 'axios';
import { getAppointmentsForDay,getInterview } from 'helpers/selectors.js';
import Appointment from "components/Appointment"
import DayList from "components/DayList.js"
import "components/Application.scss";
//import React, { useState,axios,useEffect } from "react";
import Empty from "components/Appointment/Empty.js"
import Header from "components/Appointment/Header.js"
import Show from "components/Appointment/Show.js"
//Import components/Appointment into Application.js
// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   }
// ];


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });
  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointments = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    setState({
      ...state,
      appointments
    });
    
    
  }
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
  }
    //Add the line below:
  
//  state = { day: "Monday", days: [] };
// setState({ ...state, day: "Tuesday" });
//const setDays = day => setState({ ...state, day });
// const setDays = (days) => {
//   setState(prev => ({ ...prev, days:days }));

//   //... your code here ...
// }
//const setDay = setDays
useEffect(() => {

  Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments'),
    axios.get('/api/interviewers')
  ]).then(response => {
    setState(prev => ({
      ...prev,
      days: response[0].data,
      appointments: response[1].data,
      interviewers: response[2].data
    }));
  });
}, []);
//const = getAppointmentsForDay;
const dailyAppointments = getAppointmentsForDay(state, state.day);

//dailyAppointments.map(appointment => (

  const schedule = dailyAppointments.map(appointment => { 
    //<Header time={appointment.time}/>
    const interview = getInterview(state, appointment.interview);
    if(appointment.interview)
   return(
    <React.Fragment><Header time={appointment.time} />,<Show
    student={appointment.interview.student}
    interviewer={appointment.interview.interviewer}
    interviewerName={appointment.interview.interviewer.name}/></React.Fragment>)
    
   
  
return (
  <React.Fragment key={appointment.id}>
  <Header time={appointment.time}/>
  <Empty />
</React.Fragment>
  )
});
    

   
  
  return (
    <main className="layout">
    
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList days={state.days} day={state.day} setDay={setDay} />


</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
{/* <Appointment key={appointment.id} id={appointment.id} time={appointment.time} interview={appointment.interview} /> */}

        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      </section>
      <section className="schedule">
        {schedule}
       
      </section>
      
    </main>
    
    
  );
}