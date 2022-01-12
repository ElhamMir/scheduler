import React, { useEffect, useState } from "react";
export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
  
    const [history, setHistory] = useState([initial]);
  const transition = (transitMode, replace = false) => {
    if(!replace) {
      setMode(transitMode);
      setHistory(history => [...history, transitMode]);
    } else {
      setMode(transitMode);
      setHistory(history => {
        history.pop();
        return [...history, transitMode];
      });
    }
  };
  const back = () => {
    if (history.length > 1) {
      setHistory(history => {
        const prevHistory = [...history].slice(0, history.length-1);
        setMode(prevHistory[prevHistory.length-1]);
        return prevHistory
      });
    }
  };
  return { mode, transition, back };
}
