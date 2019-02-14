import React from 'react';
import Player from './player';

export default class Role extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      round: 1,
    };

    this.onClick = this.onClick.bind(this);
    this.resetSubmit = this.resetSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { round } = this.props;

    if (prevProps.round !== round) {
      this.setState({ round });
      this.resetSubmit();
    }
  }

  onClick(e) {
    const { handlePlayerSelectOnSubmit } = this.props;
    const { submit } = this.state;

    if (submit) {
      alert('You have already submitted');
    } else {
      handlePlayerSelectOnSubmit(e.target.value);
      this.setState({ submit: true });
    }
  }

  resetSubmit() {
    this.setState({ submit: false });
  }

  render() {
    const { players, player } = this.props;

    return (
      <div id="role-container">
        <h3>{player.title}</h3>
        {player.actions.map(action => (
          <button type="button" onClick={this.onClick} value={`${player.role}-${action}`}>
            {action}
          </button>
        ))}
        <div id="player-list-row">
          {players.map(p => (
            <Player
              name={p}
              subtitle={player.alive}
              status={player.selected}
              handlePlayerSelectOnClick={() => { }}
            />
          ))}
        </div>
      </div>
    );
  }
}
