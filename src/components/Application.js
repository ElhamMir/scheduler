//import React from "react";
import React, { useState,useEffect } from "react";
import axios from 'axios';
import { getAppointmentsForDay,getInterview, getInterviewersForDay} from 'helpers/selectors.js';
import Appointment from "components/Appointment"
import DayList from "components/DayList.js"
import "components/Application.scss";
//import React, { useState,axios,useEffect } from "react";
import Empty from "components/Appointment/Empty.js"
import Header from "components/Appointment/Header.js"
import Show from "components/Appointment/Show.js"


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: []
  });
  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    console.log("bookInterview id and interview",{id, interview});
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
        
    console.log(appointments,"appoitments")
    setState({
      ...state,
      appointments
    });
    
  }
  
useEffect(() => {
  const daysPromise = axios.get('/api/days');
  const appointmentPromise = axios.get('/api/appointments');
  const interviewersPromise = axios.get('/api/interviewers');
  Promise.all([
    daysPromise, 
    appointmentPromise, 
    interviewersPromise])
    .then(([
      {data: days},
      {data: appointments},
      {data: interviewers}
    ]) => {
      setState(prev => ({...prev, days, appointments, interviewers}));
    });
},[]);
//const = getAppointmentsForDay;
const dailyAppointments = getAppointmentsForDay(state, state.day);

//dailyAppointments.map(appointment => (

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
          <DayList days={state.days} day={state.day} setDay={setDay}/>
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
       {console.log("testing",getAppointmentsForDay(state, state.day).map(appointment=> getInterview(state,appointment.interview)))}
        { getAppointmentsForDay(state, state.day).map(appointment => (
          <Appointment
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interview={getInterview(state, appointment.interview)}
            interviewers={getInterviewersForDay(state, state.day)}
            bookInterview = {bookInterview}
           
        />))}
        <Appointment key={"last"} time={"5pm"} />
        
      </section>
    </main>
  );
}