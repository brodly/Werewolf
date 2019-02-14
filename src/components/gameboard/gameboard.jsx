/* eslint-disable no-multi-spaces */
/* eslint-disable key-spacing */
import React from 'react';
import io from 'socket.io-client';
import Player from './player';
import Villager from './villager';
import Seer from './seer';
import Doctor from './doctor';
import Wolf from './wolf';
import Moderator from './moderator';

import Role from './role';

export default class Gameboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {
        role:       '',
        title:      '',
        actions:    [],
      },
      selected:     '',
      players:      [],
      round:        1,
    };

    // INIT SOCKET VARIABLE
    this.socket = io();

    // METHOD BINDING
    this.handlePlayerSelectOnClick     = this.handlePlayerSelectOnClick.bind(this);
    this.handlePlayerSelectOnSubmit    = this.handlePlayerSelectOnSubmit.bind(this);
    this.roleAction                    = this.roleAction.bind(this);
  }

  componentDidMount() {
    const { username, role } = this.props;

    // On mount client asks for their role and then assigns
    // itself a role based on the 'assigned role' data
    if (role !== 'moderator') this.socket.emit('assign player', username);
    else this.socket.emit('assign moderator', username);

    this.socket.on('assigned role', (player) => {
      this.setState({ player });
    });

    // Manages the client selecting a player in the player list
    // after game has started. Parses the updated player object
    // for the changed state and updates its local state to reflect
    // the changes
    this.socket.on('update selected', (data) => {
      const { players } = this.props;
      const newPlayers  = players;


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

  // updateRole() {
  //   const { role, players, round } = this.state;

  //   return (() => {
  //     switch (role) {
  //       case 'wolf': return (
  //         <Wolf
  //           round={round}
  //           players={players}
  //           handlePlayerSelectOnSubmit={this.handlePlayerSelectOnSubmit}
  //         />
  //       );
  //       case 'villager': return (
  //         <Villager
  //           round={round}
  //           players={players}
  //           handlePlayerSelectOnSubmit={this.handlePlayerSelectOnSubmit}
  //         />
  //       );
  //       case 'seer': return (
  //         <Seer
  //           round={round}
  //           players={players}
  //           handlePlayerSelectOnSubmit={this.handlePlayerSelectOnSubmit}
  //         />
  //       );
  //       case 'doctor': return (
  //         <Doctor
  //           round={round}
  //           players={players}
  //           handlePlayerSelectOnSubmit={this.handlePlayerSelectOnSubmit}
  //         />
  //       );
  //       case 'moderator': return (
  //         <Moderator
  //           handlePlayerSelectOnSubmit={this.handlePlayerSelectOnSubmit}
  //         />
  //       );
  //       default: return 'Error: No Role Defined';
  //     }
  //   })();
  // }

  handlePlayerSelectOnClick(selected) {
    const { username } = this.props;
    const { role }     = this.state.player;

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
    const { username, players }            = this.props;
    const { selected, round, player }      = this.state;

    return (
      <div id="main-container">
        <div id="main-header">
          <h3>Gameboard</h3>
        </div>
        <div id="display-username">
          {username} is a {player.role}
        </div>
        <div id="player-list-container">
          <div id="player-list-header">
            Player List
          </div>
          <div id="player-list-row">
            {players.map(name => (
              <Player
                name={name}
                subtitle="Player Image"
                // status={null}
                handlePlayerSelectOnClick={this.handlePlayerSelectOnClick}
              />
            ))}
          </div>
        </div>
        <div id="player-role-container">
          <Role
            player={player}
            round={round}
            players={players}
            handlePlayerSelectOnSubmit={this.handlePlayerSelectOnSubmit}
          />
        </div>
      </div>
    );
  }
}
