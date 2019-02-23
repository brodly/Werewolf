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
    this.socket                        = this.props.socket;

    // METHOD BINDING
    this.handlePlayerSelectOnClick     = this.handlePlayerSelectOnClick.bind(this);
    this.handlePlayerSelectOnSubmit    = this.handlePlayerSelectOnSubmit.bind(this);
    this.roleAction                    = this.roleAction.bind(this);
    // this.getRolePlayerList             = this.getRolePlayerList.bind(this);
  }

  componentDidMount() {
    const { username, role } = this.props;

    // On mount client asks for their role and then assigns
    // itself a role based on the 'assigned role' data
    //
    // NOTE: Client recognizes if its a player or a moderator not the server
    if (role === 'player') {
      this.socket.emit('make player', username);
    } else {
      this.socket.emit('make moderator', username);
    }

    // Updates role list when it receives list from server
    this.socket.on('rolelist', (rolelist) => {
      this.setState({ rolelist });
    });

    // Sets player role when it receieves role from server
    // Works for moderator and player
    // NOTE: Rolelist is only requested by players
    this.socket.on('assigned role', (player) => {
      this.setState({ player }, () => {
        if (player.role !== 'moderator') {
          this.socket.emit('get rolelist', player.role);
        }
      });
    });

    // Next Round Listen Event
    this.socket.on('update round', (round) => {
      this.setState({ round });
    });

    // // Seer On Listener Event
    // this.socket.on('player role', (role) => {
    //   console.log(role);
    // });
  }

  // getRolePlayerList(role) {
  //   this.socket.emit('get rolelist', role);
  //   this.socket.on('rolelist', (rolelist) => {
  //     this.setState({ rolelist });
  //   });
  // }

  handlePlayerSelectOnClick(selected) {
    const { username }  = this.props;
    const { role }      = this.state.player;

    this.setState({ selected });
    this.socket.emit('player selected', { role, username, selected });
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
    const { round, player, rolelist }     = this.state;
    const { username, role, players }     = this.props;

    return (
      <div id="main-container">
        <div id="main-header">
          <h3>Gameboard</h3>
        </div>
        <div id="display-username">
          {username} is a {role === 'moderator' ? role : player.role}
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
  role: PropTypes.string,
  players: PropTypes.arrayOf,
  socket: PropTypes.shape,
};

Gameboard.defaultProps = {
  username: 'DefaultPlayer',
  role: 'DefaultRole',
  players: [],
  socket: {},
};
