import React from 'react';

export default class Moderator extends React.Component {
  constructor() {
    super();
    this.state = {

    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { handlePlayerSelectOnSubmit } = this.props;
    handlePlayerSelectOnSubmit();
  }

  render() {
    return (
      <div id="moderator-container">
        <h3>Moderator</h3>
        <button type="button" onClick={this.onClick} value="Start Timer">Start Timer</button>
      </div>
    );
  }
}
