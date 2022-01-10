import React from "react";
import useVisualMode from "hooks/useVisualMode";
import Confirm from "components/Appointment/Confirm";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty.js";
import Status from "components/Appointment/Status";
import Form from "components/Appointment/Form";
import Error from "components/Appointment/Error";
import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT"
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"

export default function Appointment(props) {
   console.log("props here",props)
   function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
  
    transition(SAVING);
  
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }
  
  //  const save = (student, interviewer) => {
  //    console.log("save name",student)
  //    console.log("save interviewer",interviewer)
  //    const interview = {
  //      student,
  //      interviewer
  //    };
  //    transition("SAVING");
  //    props.bookInterview(props.id, interview)
  //   transition("SHOW");
  //  };
   const cancel = () => {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY));
  }
  const destroy = () => {
    transition(DELETING, true);
    props
     .cancelInterview(props.id)
     .then(() => transition(EMPTY))
     .catch(error => transition(ERROR_DELETE, true));
   }
   
   const interview = props.interview;
   const {mode, transition, back} = useVisualMode( props.interview ? SHOW : EMPTY);
   return (
     <article className="appointment">
       <Header time={props.time} />
       {mode === EMPTY && <Empty onAdd={(event) => {console.log("here");transition(CREATE)}}/>}
       {console.log("Interview",interview)}
       {mode === SHOW && (
         <Show 
         
           student={props.interview.student}
           interviewer={props.interview.interviewer}
           onDelete={() => {transition(CONFIRM)}}
           onEdit={() => {transition(EDIT)}}
         />
       )}
       {mode === CREATE && (
         <Form
           interviewers={props.interviewers}
           onCancel={back}
           onSave={save}
         />
       )}
       {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onConfirm={() => destroy()}
          onCancel={back}
        />
      )}
      {mode === DELETING && (<Status message={"Deleting"} />)}
      {
        mode === EDIT && (
          <Form
            student={props.interview.student}
            interviewer={props.interview.interviewer.id }
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
        )}

       {mode === SAVING && (<Status message={"Saving"}/>)}

      {mode === ERROR_SAVE && (<Error message={'Could not cancel appointment'} onClose={back} />)}
      {mode === ERROR_DELETE && (<Error message={'Could not cancel appointment'} onClose={back} />)}
     </article>
   );
 }
   
    