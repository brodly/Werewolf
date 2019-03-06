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
      player:     {
        title: '',
        role: '',
        actions: [],
      },
      rolelist:   [],
      playerlist: [],
      selected:   null,
      round:      1,
    };

    // INIT SOCKET VARIABLE
    this.socket                     = this.props.socket;

    // METHOD BINDING
    this.handlePlayerSelectOnClick  = this.handlePlayerSelectOnClick.bind(this);
    this.handlePlayerSelectOnSubmit = this.handlePlayerSelectOnSubmit.bind(this);
    this.roleAction                 = this.roleAction.bind(this);
  }

  componentDidMount() {
    const { username, role } = this.props;

    // ROLE
    this.socket.emit(`make ${role}`, username);
    this.socket.on('assigned role', (player) => {
      this.setState({ player });
      this.socket.emit('get rolelist', player.role);
    });

    // ROLELIST
    this.socket.on('set rolelist', (rolelist) => { this.setState({ rolelist }); });

    // ROUND
    this.socket.on('update round', (round) => { this.setState({ round }); });

    // PLAYERLIST
    this.socket.emit('get playerlist');
    this.socket.on('set playerlist', (playerlist) => { this.setState({ playerlist }); });
  }

  handlePlayerSelectOnClick(selected) {
    const { player }         = this.state;
    const { role, username } = player;

    this.setState({ selected });
    this.socket.emit('player selected', { role, username, selected });
  }

  handlePlayerSelectOnSubmit(action) {
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
    } = this.state;

    const { username, title } = player;

    return (
      <div id="main-container">
        <div id="main-header">
          <h3>Gameboard</h3>
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
            player={player}
            round={round}
            rolelist={rolelist}
            handlePlayerSelectOnSubmit={this.handlePlayerSelectOnSubmit}
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
