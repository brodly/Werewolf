/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-multi-spaces */
/* eslint-disable key-spacing */
import React from 'react';
import PropTypes from 'prop-types';
import Player from './player';
import Role from './role';

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
      selected:   '',
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

    // On mount client asks for their role
    this.socket.emit(`make ${role}`, username);

    // Assigns role when player object is receieved from server
    // NOTE: Rolelist is only requested by players not moderators
    this.socket.on('assigned role', (player) => {
      this.setState({ player }, () => {
        if (player.role !== 'moderator') {
          this.socket.emit('get rolelist', player.role);
        }
      });
    });

    // Updates role list in state when it
    // receives a new list from server
    this.socket.on('rolelist', (rolelist) => {
      this.setState({ rolelist });
    });

    // Next Round Listen Event
    this.socket.on('update round', (round) => {
      this.setState({ round });
    });

    // TODO: Action Event Handling
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

    switch (action) {
      case 'next-round':  this.socket.emit('next round'); break;
      case 'start-timer': this.socket.emit('start timer'); break;
      case 'save':        this.socket.emit('save player', { target, username }); break;
      case 'kill':        this.socket.emit('kill player', { target, username }); break;
      case 'reveal':      this.socket.emit('reveal player', { target, username }); break;
      default: null;
    }
  }

  render() {
    const { round, player, rolelist } = this.state;
    const { username, title }         = player;
    const { players }                 = this.props;

    return (
      <div id="main-container">
        <div id="main-header">
          <h3>Gameboard</h3>
        </div>
        <div id="display-username">
          {username} is a {title}
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
                status="Status"
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
  players:  PropTypes.arrayOf,
  socket:   PropTypes.shape,
};

Gameboard.defaultProps = {
  username: 'DefaultPlayer',
  role:     'DefaultRole',
  players:  [],
  socket:   {},
};
