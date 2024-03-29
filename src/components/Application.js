import React from "react";
import useApplicationData from "hooks/useApplicationData";
import { getAppointmentsForDay,getInterview, getInterviewersForDay} from 'helpers/selectors.js';
import Appointment from "components/Appointment"
import DayList from "components/DayList.js"
import "components/Application.scss";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,cancelInterview
  } = useApplicationData();

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
      
       {console.log("state.day",state)}
        { getAppointmentsForDay(state, state.day).map(appointment => (
          <Appointment
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interview={getInterview(state, appointment.interview)}
            interviewers={getInterviewersForDay(state, state.day)}
            bookInterview = {bookInterview}
            cancelInterview={cancelInterview}
           
          />))}
        <Appointment key={"last"} time={"5pm"} />
        
      </section>
    </main>
  );
}