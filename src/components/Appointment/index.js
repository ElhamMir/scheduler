import React from "react";
import "components/Appointment/Header";
import "components/Appointment/Show";
import "components/Appointment/Empty";
import "components/Appointment/styles.scss";
import "hooks/useVisualMode"
//Import the Header, Show and Empty components into Appointment/index.js.

export default function InterviewerList(props) {
   const t = props.time
   const EMPTY = "EMPTY";
   const SHOW = "SHOW";
   
   
   //const isLoggedIn = props.isLoggedIn;
   if (t) {    return <article className="appointment">Appointment at {props.time}</article> ;  }  
   return <article className="appointment">No appointments</article> }
   
        // return (
        //     {props.time ? <article className="appointment">{props.time}</article> : (
        //         <article className="appointment">No Appointments</article>
        //       )}
           // <article className="appointment">{props.time}</article> );
