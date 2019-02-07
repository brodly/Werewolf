import React from 'react';

export default class Villager extends React.Component {
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
      <div id="villager-container">
        <h3>Villager</h3>
        <button type="button" onClick={this.onClick} value="Kill">Kill</button>
      </div>
    );
  }
}
