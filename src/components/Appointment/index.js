import React from "react";
import useVisualMode from "hooks/useVisualMode";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty.js";
import Status from "components/Appointment/Status";
import Form from "components/Appointment/Form";
import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {
   console.log("props here",props)
   const save = (student, interviewer) => {
     console.log("save name",student)
     console.log("save interviewer",interviewer)
     const interview = {
       student,
       interviewer
     };
     transition("SAVING");
     props.bookInterview(props.id, interview)
    transition("SHOW");
   };
   const interview = props.interview;
   const {mode, transition, back} = useVisualMode( props.interview ? SHOW : EMPTY);
   return (
     <article className="appointment">
       <Header time={props.time} />
       {mode === EMPTY && <Empty onAdd={(event) => {console.log("here");transition(CREATE)}}/>}
       {console.log("Interview",interview)}
       {mode === SHOW && (
         <Show 
         
           student={interview.student}
           interviewer={interview.interviewer}
         />
       )}
       {mode === CREATE && (
         <Form
           interviewers={props.interviewers}
           onCancel={back}
           onSave={save}
         />
       )}
       {mode === SAVING && (<Status message={"Saving"}/>)}
     </article>
   );
 }
   
    