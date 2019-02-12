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
      alert('Youve already submitted');
    } else {
      handlePlayerSelectOnSubmit(e.target.value);
      this.setState({ submit: true });
    }
  }

  resetSubmit() {
    this.setState({ submit: false });
  }

  render() {
    const { players, role } = this.props;

    return (
      <div id="role-container">
        <h3>{role}</h3>
        <button type="button" onClick={this.onClick} value={role}>[ROLE ACTION]</button>
        <div id="player-list-row">
          {players.map(player => (player ? (
            <Player
              role={role}
              name={player.username}
              subtitle={player.alive}
              status={player.selected}
            />
          ) : null))}
        </div>
      </div>
    );
  }
}
