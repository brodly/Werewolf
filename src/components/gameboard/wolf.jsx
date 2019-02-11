import React from 'react';
import Player from './player';

export default class Wolf extends React.Component {
  constructor(props) {
    super(props);
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
      <div id="wolf-container">
        <h3>Wolf</h3>
        <button type="button" onClick={this.onClick} value="kill">Kill</button>
        <div id="player-list-row">
          {players.map(wolf => (wolf ? (
            <Player
              name={wolf.username}
              subtitle={wolf.alive}
              status={wolf.selected}
            />
          ) : null))}
        </div>
      </div>
    );
  }
}
