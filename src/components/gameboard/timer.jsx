/* eslint-disable no-multi-spaces */
import React from 'react';
import PropTypes from 'prop-types';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: null,
      timer: null,
    };

    // INIT SOCKET
    this.socket     = this.props.socket;

    // METHOD BINDING
    this.startTimer     = this.startTimer.bind(this);
    this.stopTimer      = this.stopTimer.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
  }

  componentDidMount() {
    this.socket.emit('get time');
    this.socket.on('set time', (time) => { this.setState({ time }); });
    this.socket.on('start timer',  () => { this.startTimer(); });
    this.socket.on('stop timer',   () => { this.stopTimer(); });
    this.socket.on('reset timer',  () => { this.socket.emit('get time'); });
  }

  startTimer() {
    const timer = setInterval(this.decrementTimer, 1000);
    this.setState({ timer });
  }

  stopTimer() {
    let { timer } = this.state;
    clearInterval(timer);
    timer = null;
    this.setState({ timer });
  }

  decrementTimer() {
    let { time } = this.state;

    // Decrement Time and update state
    time -= 1;
    this.setState({ time });

    // If time reaches 0 stop timer;
    if (time <= 0) {
      this.stopTimer();
      time = 0;
      this.setState({ time });
    }

    // KEEP CLIENT TIME IN-SYNC WITH SERVER TIME
    // EVERY 10 SECONDS
    if (time % 10 === 0) {
      this.socket.emit('get time');
    }
  }

  render() {
    const { time } = this.state;

    return (
      <div>
        <div id="timer-header">
          Timer
        </div>
        <div id="timer-countdown">
          {time}
        </div>
      </div>
    );
  }
}

Timer.propTypes = {
  socket: PropTypes.shape,
};

Timer.defaultProps = {
  socket: {},
};
