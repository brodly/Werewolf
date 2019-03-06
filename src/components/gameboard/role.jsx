/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-multi-spaces */
/* eslint-disable key-spacing */
import React from 'react';
import PropTypes from 'prop-types';
import Player from './player';

export default class Role extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasSubmit: false,
    };

    // INIT SOCKET
    this.socket      = this.props.socket;

    // METHOD BINDING
    this.onClick     = this.onClick.bind(this);
    this.resetSubmit = this.resetSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { round } = this.props;

    if (prevProps.round !== round) {
      this.resetSubmit();
    }
  }

  onClick(e) {
    const { handleActionOnSubmit, player } = this.props;
    const { hasSubmit }                    = this.state;

    if (hasSubmit) {
      alert('You have already submitted');
    } else {
      handleActionOnSubmit(e.target.value);
      if (player.role !== 'moderator') {
        this.setState({ hasSubmit: true });
      }
    }
  }

  resetSubmit() {
    this.setState({ hasSubmit: false });
  }

  render() {
    const {
      rolelist,
      player,
      info,
      round,
    } = this.props;

    return (
      <div id="role-container">
        <h3>{player.title}</h3>
        {player.actions.map(action => (
          <button type="button" onClick={this.onClick} value={action.toLowerCase()}>
            {action}
          </button>
        ))}
        <div id="player-list-row">
          {rolelist.map(p => (
            <Player
              round={round}
              name={p.username}
              subtitle={p.alive}
              status={p.selected}
              handlePlayerSelectOnClick={() => { }}
            />
          ))}
        </div>
        <div id="role-info">
          {player.title} Info
          {info.map(({ action, target }) => (
            <div>
              {action}: {target}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Role.propTypes = {
  socket: PropTypes.shape,
  player: PropTypes.shape,
  info: PropTypes.shape,
  round: PropTypes.number,
  rolelist: PropTypes.arrayOf,
  handleActionOnSubmit: PropTypes.func,
};

Role.defaultProps = {
  socket: {},
  player: {
    username: 'DefaultName',
    title: 'DefaultTitle',
    role: 'defaultrole',
    actions: [],
  },
  info: {},
  round: 1,
  rolelist: [],
  handleActionOnSubmit: () => {},
};
