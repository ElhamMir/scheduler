/* returns an array containing all the appointments for the given day, it returns an empty array if it can't find the day*/
export function getAppointmentsForDay(state, day) {
 
  let results = [];
  let flag = false;
  for(let i = 0; i<state.days.length; i++){  
    //if the day of the week is found sets the flag to true  
    if(state.days[i]["name"] === day){
      flag = true;
      results = [];
      for(let j of state.days[i].appointments){
      results.push(state.appointments[j]);
      }
            
    }
  }
  //the day is not found so it returns an empty string
  if(flag === false) {
    return []
  }
  return results;

}

/* returns an array containing all the interviews for the given day, returns an empty array if the day is not in the state*/
export function getInterviewersForDay(state, day) {
  
  let results = []
  let flag = false 
  for(let i = 0; i<state.days.length; i++){
        
    console.log(state.days[i])
    if(state.days[i]["name"] === day){
      flag = true;
      results = [];
        for(let j of state.days[i].interviewers){
          results.push(state.interviewers[j]);
        }
                   
    }
  }
  if(flag === false) {
    return [];
  }
  return results;

}

export function  getInterview(state, interview) {
  if (!interview) return null;

  const result = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  }
  return result;
    
}
  
