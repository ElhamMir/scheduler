import React from "react";
import "components/Appointment/styles.scss";


export default function InterviewerList(props) {
   const t = props.time
   //const isLoggedIn = props.isLoggedIn;
   if (t) {    return <article className="appointment">Appointment at {props.time}</article> ;  }  
   return <article className="appointment">No appointments</article> }
   
        // return (
        //     {props.time ? <article className="appointment">{props.time}</article> : (
        //         <article className="appointment">No Appointments</article>
        //       )}
           // <article className="appointment">{props.time}</article> );
