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
      selected: '',
      players: [],
    };

    this.socket = io();
    this.updateRole = this.updateRole.bind(this);
    this.handlePlayerSelectOnClick = this.handlePlayerSelectOnClick.bind(this);
    this.handlePlayerSelectOnSubmit = this.handlePlayerSelectOnSubmit.bind(this);
  }

  componentDidMount() {
    const { username } = this.props;

    this.socket.emit('assign role', username);
    this.socket.on('assigned role', ({ role, players }) => {
      if (role === undefined) {
        this.setState({ role: 'moderator', players });
      } else {
        this.setState({ role, players });
      }
    });

    this.socket.on('set role', (role) => {
      console.log(role);
    });

    this.socket.on('update selected', (data) => {
      const { players } = this.state;
      const newPlayers = players;

      players.forEach((player, i) => {
        if (player.username === data.username) {
          newPlayers[i].selected = data.selected;
        }
      });

      this.setState({ players: newPlayers });
    });
  }

  updateRole() {
    const { role, players } = this.state;

    return (() => {
      switch (role) {
        case 'wolf': return (
          <Wolf
            players={players}
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
    const { username } = this.props;
    const { role } = this.state;

    this.setState({ selected });
    this.socket.emit('emit selected', { role, username, selected });
  }

  handlePlayerSelectOnSubmit() {
    const { selected, role } = this.state;
    const { username } = this.props;

    this.socket.emit('get role', selected);
    this.socket.emit('set selected', { role, username, selected });
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
                subtitle="Player Image"
                // status={ready}
                selected={selected}
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
