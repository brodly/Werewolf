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
      round: 1,
    };

    this.socket = io();

    this.updateRole = this.updateRole.bind(this);
    this.handlePlayerSelectOnClick = this.handlePlayerSelectOnClick.bind(this);
    this.handlePlayerSelectOnSubmit = this.handlePlayerSelectOnSubmit.bind(this);
    this.roleAction = this.roleAction.bind(this);
  }

  componentDidMount() {
    const { username } = this.props;

    // On mount client asks for their role and then assigns
    // itself a role based on the 'assigned role' data
    this.socket.emit('assign role', username);
    this.socket.on('assigned role', ({ role, players }) => {
      if (role === undefined) {
        this.setState({ role: 'moderator', players });
      } else {
        this.setState({ role, players });
      }
    });

    // Manages the client selecting a player in the player list
    // after game has started. Parses the updated player object
    // for the changed state and updates its local state to reflect
    // the changes
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

    // Next Round Listen Event
    this.socket.on('update round', (round) => {
      this.setState({ round });
    });

    // Seer On Listener Event
    this.socket.on('player role', (role) => {
      console.log(role);
    });
  }

  updateRole() {
    const { role, players, round } = this.state;

    return (() => {
      switch (role) {
        case 'wolf': return (
          <Wolf
            round={round}
            players={players}
            handlePlayerSelectOnSubmit={this.handlePlayerSelectOnSubmit}
          />
        );
        case 'villager': return (
          <Villager
            round={round}
            players={players}
            handlePlayerSelectOnSubmit={this.handlePlayerSelectOnSubmit}
          />
        );
        case 'seer': return (
          <Seer
            round={round}
            players={players}
            handlePlayerSelectOnSubmit={this.handlePlayerSelectOnSubmit}
          />
        );
        case 'doctor': return (
          <Doctor
            round={round}
            players={players}
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

  handlePlayerSelectOnSubmit(action) {
    const { selected } = this.state;

    this.roleAction(action, selected);
  }

  roleAction(action, player) {
    const { username } = this.props;

    switch (action) {
      case 'next-round': this.socket.emit('next round'); break;
      case 'start-timer': this.socket.emit('start timer'); break;
      case 'reveal': this.socket.emit('reveal player', { player, username }); break;
      case 'save': this.socket.emit('save player', { player, username }); break;
      case 'kill': this.socket.emit('kill player', { player, username }); break;
      default: null;
    }
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
          {username}
          is a
          {role}
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
