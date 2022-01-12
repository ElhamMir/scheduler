import React, { useState } from 'react';

import "components/Appointment/styles.scss";
import Button from 'components/Button';
import InterviewerList from "components/InterviewerList.js";
export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  console.log("interviewer",interviewer)
  const [error, setError] = useState("");

  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(student, interviewer);
  }
  
  const reset = function() {
    setStudent('');
    setInterviewer(null);
  
  };
  const cancel = function() {
    reset()
    props.onCancel();
  };
  return(
<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        //student = {props.student}
        value={student}
        onChange={event => setStudent(event.target.value)}
        data-testid="student-name-input"
        /*
          This must be a controlled component
          your code goes here
        */
      />
      
    </form>
    
    <section className="appointment__validation">{error}</section>
    <InterviewerList 
      interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
          
      //interviewer={interviewers[0]}
      /* your code goes here */
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={validate}>Save</Button>
    </section>
  </section>
</main>
)
}