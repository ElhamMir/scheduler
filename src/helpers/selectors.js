export function getAppointmentsForDay(state, day) {
    //... returns an array of appointments for that day
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
            console.log(results,"restuszrgzsrhbf")
          
        }
    }
    if(flag === false) {
        return []
    }
    return results

  }
  export function getInterviewersForDay(state, day) {
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
            for(let j of state.days[i].appointments){
                f = state.appointments[j]
                console.log("f",f)
                if(f.interview !=null){results.push(f.interview.interviewer)}
                
            }
            console.log(results,"restuszrgzsrhbf")
          
        }
    }
    if(flag === false) {
        return []
    }
    return results

  }
// getInterviewersForDay
  export function  getInterview(state, interview) {
    if (!interview) {
        return null}
    
        else {
            return {
              student: interview.student,
              interviewer: state.interviewers[interview.interviewer]
            }
          }
  }
  