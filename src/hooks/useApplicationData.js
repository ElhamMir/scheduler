/* 

    The state object will maintain the same structure.
    The setDay action can be used to set the current day.
    The bookInterview action makes an HTTP request and updates the local state.
    The cancelInterview action makes an HTTP request and updates the local state.

*/
import React, { useState,useEffect } from "react";
import axios from "axios";
import DayListItem from "components/DayListItem";

const DAY_COUNT = "DAY_COUNT"
export default function useApplicationData () {
    const [state, setState] = useState({
        day: "Monday",
        days: [],
        // you may put the line below, but will have to remove/comment hardcoded appointments variable
        appointments: {},
        interviewers: []
      });
      const setDay = day => setState({ ...state, day });
    
      ///////////////
      function bookInterview(id, interview) {
        console.log("Props,spots here???", state)
        console.log("days[day].spots",state.days[state.day])
        console.log("bookInterview id and interview",{id, interview});
        console.log("state.appointments[id]",state.appointments[id])
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
        const currentDay = state.days.filter(day => day.appointments.includes(id))[0]['id'] - 1
        const days = [...state.days]
        days[currentDay] = {
          ...state.days[currentDay], 
          spots: state.days[currentDay].spots - 1 }
        return axios.put(`/api/appointments/${id}`, appointment)
        .then(response => {
          if (response.status === 204) setState({...state, appointments,days});
        //   DayListItem.spots +=1
        })
        
      }
      ///////////////////
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
        const currentDay = state.days.filter(day => day.appointments.includes(id))[0]['id'] - 1
        const days = [...state.days]
         days[currentDay] = {
           ...state.days[currentDay], 
           spots: state.days[currentDay].spots + 1 }
        return axios.delete(`/api/appointments/${id}`, appointment)
          .then(response => setState({ ...state, appointments,days }))
    
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