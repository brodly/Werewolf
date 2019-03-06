/* eslint-disable no-multi-spaces */
import React from 'react';
import PropTypes from 'prop-types';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: null,
    };

    // INIT SOCKET
    this.socket     = this.props.socket;

    // METHOD BINDING
    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount() {
    this.socket.emit('get time');
    this.socket.on('set time', (time) => { this.setState({ time }); });
    this.socket.on('start timer', () => { this.startTimer(); });
  }

  startTimer() {
    // eslint-disable-next-line no-use-before-define
    const timer = setInterval(decrementTimer.bind(this), 1000);

    function decrementTimer() {
      let { time } = this.state;
      time -= 1;
      this.setState({ time });

      if (time === 0) {
        clearInterval(timer);
      }

      if (time % 10 === 0) {
        this.socket.emit('get time');
      }
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
