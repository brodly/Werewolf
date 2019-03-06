/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-multi-spaces */
/* eslint-disable key-spacing */
import React from 'react';
import PropTypes from 'prop-types';
import Player from './player';
import Role from './role';
import Timer from './timer';

export default class Gameboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {
        title:   '',
        role:    '',
        actions: [],
      },
      rolelist:   [],
      playerlist: [],
      selected:   null,
      round:      1,
      night:      false,
      info:       [],
    };

    // INIT SOCKET VARIABLE
    this.socket                     = this.props.socket;

    // METHOD BINDING
    this.handlePlayerSelectOnClick  = this.handlePlayerSelectOnClick.bind(this);
    this.handleActionOnSubmit       = this.handleActionOnSubmit.bind(this);
    this.roleAction                 = this.roleAction.bind(this);
  }

  componentDidMount() {
    const { username, role } = this.props;

    // INITIALIZE GAMEBOARD
    this.socket.emit(`make ${role}`, username);
    this.socket.emit('get playerlist');

    // ROLE
    this.socket.on('set rolelist', (rolelist) => { this.setState({ rolelist }); });
    this.socket.on('set info',         (info) => { this.setState({ info }); });
    this.socket.on('assigned role',  (player) => {
      this.setState({ player });
      this.socket.emit('get rolelist', player.role);
    });

    // ROUND
    this.socket.on('set round',    (round) => { this.setState({ round }); });
    this.socket.on('toggle night', (night) => { this.setState({ night }); });

    // PLAYERLIST
    this.socket.on('set playerlist', (playerlist) => { this.setState({ playerlist }); });
  }

  handlePlayerSelectOnClick(selected) {
    const { player }         = this.state;
    const { role, username } = player;

    this.setState({ selected });
    this.socket.emit('player selected', { role, username, selected });
  }

  handleActionOnSubmit(action) {
    const { selected } = this.state;
    this.roleAction(action, selected);
  }

  roleAction(action, target) {
    const { player }   = this.state;
    const { username } = player;

    this.socket.emit('action', { username, target, action });
  }

  render() {
    const {
      round,
      player,
      rolelist,
      playerlist,
      info,
      night,
    } = this.state;

    const { username, title } = player;

    return (
      <div id="main-container">
        <div id="main-header">
          <h3>Gameboard</h3>
        </div>
        <div id="round-info">
          {round}
          {night ? 'Night' : 'Day'}
        </div>
        <div id="timer-container">
          {<Timer
            socket={this.socket}
          />}
        </div>
        <div id="display-username">
          {username} is a {title}
        </div>
        <div id="player-list-container">
          <div id="player-list-header">
            Player List
          </div>
          <div id="player-list-row">
            {playerlist.map(p => (
              <Player
                name={p.username}
                subtitle={p.subtitle}
                status={p.status}
                handlePlayerSelectOnClick={this.handlePlayerSelectOnClick}
              />
            ))}
          </div>
        </div>
        <div id="player-role-container">
          <Role
            socket={this.socket}
            info={info}
            player={player}
            round={round}
            rolelist={rolelist}
            handleActionOnSubmit={this.handleActionOnSubmit}
          />
        </div>
      </div>
    );
  }
}

Gameboard.propTypes = {
  username: PropTypes.string,
  role:     PropTypes.string,
  socket:   PropTypes.shape,
};

Gameboard.defaultProps = {
  username: 'DefaultPlayer',
  role:     'DefaultRole',
  socket:   {},
};
