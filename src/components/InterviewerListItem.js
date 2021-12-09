
import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";
export default function InterviewerListItem(props) {
    const interviewer = classNames('interviewers__item','id', 'name', 'avatar',
    
    {
        'interviewers__item--selected' : props.selected
        // id: 1,
        // name: "Sylvia Palmer",
        // avatar: "https://i.imgur.com/LpaY82x.png"
      });
      
    return (
<li className={interviewer} onClick={() => props.setInterviewer(props.id)}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name ? props.name: ''}
  />
  Sylvia Palmer
</li>
);
}