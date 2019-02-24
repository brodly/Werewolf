/* eslint-disable no-multi-spaces */
/* eslint-disable key-spacing */
import React from 'react';
import PropTypes from 'prop-types';
import Player from './player';

export default class Role extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      round: 1,
    };

    // METHOD BINDING
    this.onClick     = this.onClick.bind(this);
    this.resetSubmit = this.resetSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { round } = this.props;

    if (prevProps.round !== round) {
      this.setState({ round });
      this.resetSubmit();
    }
  }

  onClick(e) {
    const { handlePlayerSelectOnSubmit } = this.props;
    const { submit }                     = this.state;

    if (submit) {
      alert('You have already submitted');
    } else {
      handlePlayerSelectOnSubmit(e.target.value);
      this.setState({ submit: true });
    }
  }

  resetSubmit() {
    this.setState({ submit: false });
  }

  render() {
    const { rolelist, player } = this.props;

    return (
      <div id="role-container">
        <h3>{player.title}</h3>
        {player.actions.map(action => (
          <button type="button" onClick={this.onClick} value={`${player.role}-${action}`}>
            {action}
          </button>
        ))}
        <div id="player-list-row">
          {rolelist.map(p => (
            <Player
              name={p.username}
              subtitle={p.alive}
              status={p.selected}
              handlePlayerSelectOnClick={() => { }}
            />
          ))}
        </div>
      </div>
    );
  }
}

Role.propTypes = {
  player: PropTypes.shape,
  round: PropTypes.number,
  rolelist: PropTypes.arrayOf,
  handlePlayerSelectOnSubmit: PropTypes.func,
};

Role.defaultProps = {
  player: {
    title: 'DefaultTitle',
    role: 'defaultrole',
    actions: [],
  },
  round: 1,
  rolelist: [],
  handlePlayerSelectOnSubmit: () => {},
};
