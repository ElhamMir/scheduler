export function getAppointmentsForDay(state, day) {
    console.log("getAppointmentsForDay state",state)
    console.log("getAppointmentsForDay day",day)
    console.log("kkk",state.days.map(day => day.name))
    let results=[]
 
    let flag = false
    for(let i = 0; i<state.days.length; i++){
        
        console.log(state.days[i])
        if(state.days[i]["name"] === day){
            flag = true
            results=[]
            //console.log('state.days[i]["appointment"]',state.days[i].appointments)
            for(let j of state.days[i].appointments){
                results.push(state.appointments[j])
            }
            
        }
    }
    if(flag === false) {
        return []
    }
    return results

  }
  export function getInterviewersForDay(state, day) {
      console.log("getInterviewersForDay state",state)
      console.log("getInterviewersForDay day",day)
    console.log("kkk",state.days.map(day => day.name))
    let results=[]
 
    let flag = false
    let f
    for(let i = 0; i<state.days.length; i++){
        
        console.log(state.days[i])
        if(state.days[i]["name"] === day){
            flag = true
            results=[]
            //console.log('state.days[i]["appointment"]',state.days[i].appointments)
            for(let j of state.days[i].interviewers){
                console.log("j",j)
                results.push(state.interviewers[j])
                //console.log("f",f)
               // if(f.interviewers){
                  //  results.push(...f.interviewers)
               // }
                //const interviewerId = f.interview.interviewer
                
                
            }
            
          
        }
    }
    if(flag === false) {
        return []
    }
    return results

  }
// getInterviewersForDay
  export function  getInterview(state, interview) {
      console.log("state getInterview",state)
      console.log("interview getInterview", interview)
    if (!interview) {
        return null}
    
    else {
        return {
           student: interview.student,
           interviewer: state.interviewers[interview.interviewer]
        }
    }
  }
  
