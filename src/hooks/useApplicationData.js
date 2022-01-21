import React, { useState,useEffect } from "react";
import axios from "axios";

export default function useApplicationData () {
  const [state, setState] = useState({
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: []
  });
  const setDay = day => setState({ ...state, day });
   
  function bookInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
        
    setState({
      ...state,
      appointments
    });
    
    
    const days = [...state.days]
    let exists
    //IF the appointment already exists, sets the exists to  true, else sets it to false
    if (state.appointments[id]) {
      exists = state.appointments[id].interview
    } else {
      exists = false;
    }
    //if the appointment doesn't exist, after adding the appointment, subtracts 1 from available spots for the day
   
   
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(response => {
      if (response.status === 204) 
      if (!exists) {
        for (const day of days) {
          for (const appointment of day.appointments) {
            if (id === appointment) {
              day.spots = day.spots - 1;
            }
          }
        }
      }
      
      setState({...state, appointments,days});
  
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
    
    const currentDay = state.days.filter(day => day.appointments.includes(id))[0]['id'] - 1
    const days = [...state.days]
      days[currentDay] = {
        ...state.days[currentDay], 
        spots: state.days[currentDay].spots + 1 } //After cancelling the appointment, the spots increase by 1
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