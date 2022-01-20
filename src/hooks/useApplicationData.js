/* 

    The state object will maintain the same structure.
    The setDay action can be used to set the current day.
    The bookInterview action makes an HTTP request and updates the local state.
    The cancelInterview action makes an HTTP request and updates the local state.

*/
import React, { useState,useEffect } from "react";
import axios from "axios";
import DayListItem from "components/DayListItem";

const DAYe_COUNT = "DAY_COUNT"
export default function useApplicationData () {
    const [state, setState] = useState({
        day: "Monday",
        days: [],
        // you may put the line below, but will have to remove/comment hardcoded appointments variable
        appointments: {},
        interviewers: []
      });
      console.log("state is",state)
      const setDay = day => setState({ ...state, day });
    function updateSpots(state,appointments){
      //return new days array with the updated spot for that day
      
    }
      ///////////////
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
       
        const currentDay = state.days.filter(day => day.appointments.includes(id))[0]['id'] - 1
        const days = [...state.days]
        let exists

        if (state.appointments[id]) {
          exists = state.appointments[id].interview
        } else {
          exists = false;
        }
    
        if (!exists) {
          for (const day of days) {
            for (const appointment of day.appointments) {
              if (id === appointment) {
                day.spots = day.spots - 1;
              }
            }
          }
        }
        // days[currentDay] = {
        //   ...state.days[currentDay], 
        //   spots: state.days[currentDay].spots - 1 } // const days = updatespots
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