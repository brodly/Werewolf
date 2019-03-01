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
    const { hasSubmit }                  = this.state;

    if (hasSubmit) {
      alert('You have already submitted');
    } else {
      handlePlayerSelectOnSubmit(e.target.value);
      this.setState({ hasSubmit: true });
    }
  }

  resetSubmit() {
    this.setState({ hasSubmit: false });
  }

  render() {
    const { rolelist, player } = this.props;

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
    username: 'DefaultName',
    title: 'DefaultTitle',
    role: 'defaultrole',
    actions: [],
  },
  round: 1,
  rolelist: [],
  handlePlayerSelectOnSubmit: () => {},
};
