

import { useState } from 'react';export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]); // This line is new!
    function transition(mode, replace = false) { 
        setMode(mode)
        if(replace === false){
            setHistory([...history,mode])
        }
        /* ... */ }
    function back() { 
        let a
        if (history.length === 1) {
        setMode(initial);
      } else {
        a = history.length - 2
        setMode(history[a]);
        setHistory(history.slice(0, -1));
      } }
  
    return { mode, transition, back };
  };
  