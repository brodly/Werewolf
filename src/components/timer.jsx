import React from 'react';

const Timer = props => {
  const { time } = props;

  return (
    <div>
      <h2>Timer</h2>
      <div>
        {time}
      </div>
    </div>
  )
}

export default Timer;
