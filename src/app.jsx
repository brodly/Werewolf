import React from 'react';
import Timer from './components/timer';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      time: 5,
    };
  }

  render() {
    const { time } = this.state;

    return (
      <div>
        <h3>Werewolf App</h3>
        <Timer time={time} />
      </div>
    );
  }
}
