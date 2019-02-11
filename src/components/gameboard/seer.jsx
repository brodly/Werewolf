import React from 'react';
import Player from './player';

export default class Seer extends React.Component {
  constructor() {
    super();
    this.state = {
      submit: false,
      round: 1,
    };


    this.onClick = this.onClick.bind(this);
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
    const { players } = this.props;

    return (
      <div id="seer-container">
        <h3>Seer</h3>
        <button type="button" onClick={this.onClick} value="reveal">Reveal</button>
        <div id="player-list-row">
          {players.map(seer => (seer ? (
            <Player
              name={seer.username}
              subtitle={seer.alive}
              status={seer.selected}
            />
          ) : null))}
        </div>
      </div>
    );
  }
}
