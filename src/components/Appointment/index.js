import React from "react";
import Header from "components/Appointment/Header";
import "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode"
import Show from 'components/Appointment/Show';
import Form from 'components/Appointment/Form';
//Import the Header, Show and Empty components into Appointment/index.js.
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = 'CREATE';
export default function InterviewerList(props) {
   const t = props.time
  
   const { mode, transition, back } = useVisualMode(
      props.interview ? SHOW : EMPTY
    );
    props.interview.interviewer = []
    function onAdd() {
      transition(CREATE)
    }
    function onCancel() {
      back()
    }
    function onComplete() {
      transition(EMPTY)
    }
    
    return (
      <article data-testid="appointment" className="appointment">
        <Header time={props.time} />
        {mode === EMPTY && (
          <Empty
            onAdd={() => {
              return transition(CREATE);
            }}
          />
        )}
    
        {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => console.log("")}
          onEdit={() => {
            console.log("");
          }}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onSave={console.log("")} onCancel={back} />
      )}
       
       
        
      </article>
    );
  

  
   //  {mode === EMPTY && <Empty onAdd={() => console.log("Clicked onAdd")} />}
   //  {mode === SHOW && (
   //    <Show
   //      student={props.interview.student}
   //      interviewer={props.interview.interviewer}
   //    />
   //  )}
   }
   //const isLoggedIn = props.isLoggedIn;
   // if (t) {    return <article className="appointment">Appointment at {props.time}</article> ;  }  
   // return <article className="appointment">No appointments</article> }
   
        // return (
        //     {props.time ? <article className="appointment">{props.time}</article> : (
        //         <article className="appointment">No Appointments</article>
        //       )}
           // <article className="appointment">{props.time}</article> );
