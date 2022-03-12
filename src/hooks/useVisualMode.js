import { useState } from "react"

export default function useVisualMode(initial) {

  const [history, setHistory] = useState([initial]);
  const [mode, setMode] = useState(initial);

  const transition = function (newMode, replace = false) {
    setMode(newMode);
    if (replace === true) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), newMode])
    }
    setHistory([...history, newMode])
  }

  const back = function () {
    if (history.length > 1) {

      setHistory((prev) => [...prev.slice(0, prev.length - 1)]);

    }
    setMode(history[history.length - 1])
  }

  return { mode, transition, back };
}

