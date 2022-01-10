/* 

    The state object will maintain the same structure.
    The setDay action can be used to set the current day.
    The bookInterview action makes an HTTP request and updates the local state.
    The cancelInterview action makes an HTTP request and updates the local state.

*/
import React, { useState,useEffect } from "react";
import axios from "axios";
import DayListItem from "components/DayListItem";

export default function useApplicationData () {
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
        console.log("daylistitem is here", DayListItem)
        return axios.put(`/api/appointments/${id}`, appointment)
        .then(response => {
          if (response.status === 204) setState({...state, appointments});
        //   DayListItem.spots +=1
        })
        
      }
      
      function cancelInterview(id) {
        const appointment = {
          ...state.appointments[id],
          interview: null
        }
        const appointments = {
          ...state.appointments,
          [id]: appointment
        }
        setState({ ...state, appointments })
        return axios.delete(`/api/appointments/${id}`, appointment)
          .then(response => setState({ ...state, appointments }))
    
      };
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

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}; 