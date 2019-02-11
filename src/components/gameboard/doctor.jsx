import React from 'react';
import Player from './player';

export default class Doctor extends React.Component {
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
    const { players } = this.props;

    return (
      <div id="doctor-container">
        <h3>Doctor</h3>
        <button type="button" onClick={this.onClick} value="save">Save</button>
        <div id="player-list-row">
          {players.map(doctor => (doctor ? (
            <Player
              name={doctor.username}
              subtitle={doctor.alive}
              status={doctor.selected}
            />
          ) : null))}
        </div>
      </div>
    );
  }
}
