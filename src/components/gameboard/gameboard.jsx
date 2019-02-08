import React from 'react';
import io from 'socket.io-client';
import Player from './player';
import Villager from './villager';
import Seer from './seer';
import Doctor from './doctor';
import Wolf from './wolf';
import Moderator from './moderator';

export default class Gameboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: 'villager',
      selected: null,
    };

    this.socket = io();
    this.updateRole = this.updateRole.bind(this);
    this.handlePlayerSelectOnClick = this.handlePlayerSelectOnClick.bind(this);
    this.handlePlayerSelectOnSubmit = this.handlePlayerSelectOnSubmit.bind(this);
  }

  componentDidMount() {
    const { username } = this.props;

    this.socket.emit('get my role', username);
    this.socket.on('set my role', (role) => {
      if (role === null) {
        this.setState({ role: 'moderator' });
      } else {
        this.setState({ role });
      }
    });

    this.socket.on('set role', (role) => {
      console.log(role);
    });
  }

  updateRole() {
    const { role } = this.state;

    return (() => {
      switch (role) {
        case 'wolf': return (
          <Wolf
            handlePlayerSelectOnSubmit={this.handlePlayerSelectOnSubmit}
          />
        );
        case 'villager': return (
          <Villager
            handlePlayerSelectOnSubmit={this.handlePlayerSelectOnSubmit}
          />
        );
        case 'seer': return (
          <Seer
            handlePlayerSelectOnSubmit={this.handlePlayerSelectOnSubmit}
          />
        );
        case 'doctor': return (
          <Doctor
            handlePlayerSelectOnSubmit={this.handlePlayerSelectOnSubmit}
          />
        );
        case 'moderator': return (
          <Moderator
            handlePlayerSelectOnSubmit={this.handlePlayerSelectOnSubmit}
          />
        );
        default: return 'Error: No Role Defined';
      }
    })();
  }

  handlePlayerSelectOnClick(selected) {
    this.setState({ selected });
  }

  handlePlayerSelectOnSubmit() {
    const { selected } = this.state;

    this.socket.emit('get role', selected);
  }

  render() {
    const { username, players } = this.props;
    const { role, selected } = this.state;

    return (
      <div id="main-container">
        <div id="main-header">
          <h3>Gameboard</h3>
        </div>
         <div id="display-username">
          {username} is a {role}
        </div>
        <div id="player-list-container">
          <div id="player-list-header">
            Player List
          </div>
          <div id="player-list-row">
            {players.map(player => (
              <Player
                name={player}
                selected={selected}
                image="Player Image"
                handlePlayerSelectOnClick={this.handlePlayerSelectOnClick}
              />
            ))}
          </div>
        </div>
        <div id="player-role-container">
          {this.updateRole()}
        </div>
      </div>
    );
  }
}
