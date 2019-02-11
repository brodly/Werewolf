import React from 'react';

export default class Moderator extends React.Component {
  constructor() {
    super();
    this.state = {

    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    const { handlePlayerSelectOnSubmit } = this.props;
    handlePlayerSelectOnSubmit(e.target.value);
  }

  render() {
    return (
      <div id="moderator-container">
        <h3>Moderator</h3>
        <button type="button" onClick={this.onClick} value="start-timer">Start Timer</button>
        <button type="button" onClick={this.onClick} value="next-round">Next Round</button>
      </div>
    );
  }
}
