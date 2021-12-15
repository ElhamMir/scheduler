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
  