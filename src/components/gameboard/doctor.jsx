import React from 'react';
import Player from './player';

export default class Doctor extends React.Component {
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
    const { players } = this.props;

    return (
      <div id="doctor-container">
        <h3>Doctor</h3>
        <button type="button" onClick={this.onClick} value="Save">Save</button>
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
