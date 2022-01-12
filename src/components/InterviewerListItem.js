import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";
export default function InterviewerListItem(props) {

  const interviewer = classNames('interviewers__item',
    'id', 
    'name', 
    'avatar',
    {'interviewers__item--selected' : props.selected}
  );
      
  
return (
  <li className={interviewer} onClick={props.setInterviewer}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {props.selected && props.name}
  </li>
);
}