
import React from 'react';
import DayListItem from 'components/DayListItem';

export default function DayList(props) {
  const days = props.days.map(day => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === day.value}
        setDay={props.setDay}
      />
    );
  });

  return <ul>{days}</ul>;
}
// import React from "react";
// import DayListItem from "components/DayListItem.js"

// export default function DayList(props) {
//     const availableDays = props.days.map(day => {
//       return (
//         <DayListItem
//       key={day.id} 
//       name={day.name} 
//       spots={day.spots} 
//       selected={day.name === day.value}
//       setDay={() => props.onChange(day)}
//     />


//       );
//     });
  

// return <ul>{availableDays}</ul>
// }