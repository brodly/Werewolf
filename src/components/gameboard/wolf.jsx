import React from 'react';
import Player from './player';

export default class Wolf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { handlePlayerSelectOnSubmit } = this.props;
    handlePlayerSelectOnSubmit();
  }

  render() {
    const { players } = this.props;

    console.log(players);

    return (
      <div id="wolf-container">
        <h3>Wolf</h3>
        <button type="button" onClick={this.onClick} value="Kill">Kill</button>
        <div id="wolf-players-list">
          {players.map(wolf => (
            <Player
              name={wolf}
            />
          ))}
        </div>
      </div>
    );
  }
}
