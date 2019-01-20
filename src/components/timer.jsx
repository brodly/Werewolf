import React from 'react';

const Timer = (props) => {
  const { time } = props;

  return (
    <div id="timer-container">
      <h2>Timer</h2>
      <div id="timer-countdown">
        {time}
      </div>
    </div>
  );
};

export default Timer;
