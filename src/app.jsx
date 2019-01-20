import React from 'react';
import Timer from './components/timer';
import Admin from './components/admin';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      timer: 5,
      nightTime: false,

    };
  }

  render() {
    const { timer, nightTime } = this.state;

    return (
      <div>
        <h3>Werewolf App</h3>
        <Timer timer={timer} />
        <Admin />
      </div>
    );
  }
}
