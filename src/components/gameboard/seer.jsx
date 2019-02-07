import React from 'react';

export default class Seer extends React.Component {
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
      <div id="seer-container">
        <h3>Seer</h3>
        <button type="button" onClick={this.onClick} value="Reveal">Reveal</button>
      </div>
    );
  }
}
