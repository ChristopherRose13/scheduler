import { useState } from "react"

export default function useVisualMode (initial) {

  const [history, setHistory] = useState([initial]); 

  const transition = function (newMode, replace = false) {
    if ( replace === true) {
      setHistory((prev) => [...prev.slice(0, prev.length-1), newMode])
    }
    setHistory([...history, newMode])
  }

  const back = function () {
    if (history.length > 1) {
      
      setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
      
    }
  }

  return {mode: history[history.length - 1], transition, back};
}

