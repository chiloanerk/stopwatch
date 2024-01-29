import { useEffect, useState } from "react";

function Stopwatch() {
  // State variables for managing watch states
  const [currentState, setCurrentState] = useState(false);
  const [currentInterval, setCurrentInterval] = useState(0);
  const [pausedTime, setPausedTime] = useState(0);

  useEffect(() => {
    let intervalId;
    // If currentState true then  start stopwatch
    if (currentState) {
      const startTime = new Date().getTime() - pausedTime;

      // Setup interval to update currentInterval every 10 milliseconds
      intervalId = setInterval(() => {
        const currentTime = new Date().getTime();
        setCurrentInterval(currentTime - startTime);
      }, 10);
    } else {
      // If currentState is false then stop
      clearInterval(intervalId);

      // Store the time when stopwatch was paused
      setPausedTime(currentInterval);
    }
    // Cleanup function
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [currentState, pausedTime]); // useEffect requires this dependency inside an array

  // Function to run the clock
  function start() {
    setCurrentState(true);
  }

  // Function to stop the clock
  function stop() {
    setCurrentState(false);
  }

  function reset() {
    // When running, clicking reset will reset the counter to zero while continuing running
    if (currentState) {
      stop(); // Run the stop function
      setCurrentInterval(0); // Reset values
      setPausedTime(0);
      setTimeout(() => {start()}, 100)  // This is the only way i could get it to work, by delay
      // When stop button is clicked, reset counter values and do nothing
    } else {
      setCurrentInterval(0);
      setPausedTime(0);
    }
  }

  function formattedTime(currentInterval) {
    const totalSeconds = Math.floor(currentInterval / 1000);
    const milliseconds = Math.floor(currentInterval % 1000);
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor((totalSeconds / 60) % 60);
    const hours = Math.floor(totalSeconds / 3600);

    const formattedMilliseconds = String(milliseconds)
      .slice(0, 2)
      .padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedHours = String(hours).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  }

  return (
    <div className="container">
      <p className="title">STOPWATCH</p>
      <div className="watch-face">
        <p>{formattedTime(currentInterval)}</p>
      </div>
      <div className="buttons">
        <button className="btn-start" onClick={start}>
          Start
        </button>
        <button className="btn-stop" onClick={stop}>
          Stop
        </button>
        <button className="btn-reset" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;
