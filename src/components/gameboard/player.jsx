/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-multi-spaces */
import React from 'react';
import PropTypes from 'prop-types';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      status: null,
    };

    // METHOD BINDING
    this.resetComponent    = this.resetComponent.bind(this);
    this.onClick           = this.onClick.bind(this);
    this.highlightSelected = this.highlightSelected.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { status, round } = this.props;

    if (prevProps.round !== round) {
      this.resetComponent();
    }

    if (prevProps.status !== status) {
      this.setState({ status });
      this.highlightSelected();
    }
  }

  onClick() {
    const { handlePlayerSelectOnClick, name } = this.props;
    handlePlayerSelectOnClick(name);
  }

  resetComponent() {
    this.setState({ isSelected: false });
  }

  highlightSelected() {
    const { status, name } = this.props;

    if (status === name) this.setState({ isSelected: true });
    else this.setState({ isSelected: false });
  }

  render() {
    const { name, subtitle } = this.props;
    const { status, isSelected }  = this.state;

    return (
      <div id="player-container" onClick={this.onClick} data-selected={isSelected}>
        <div id="player-name">
          {name}
          <p />
        </div>
        <div id="player-subtitle">
          {subtitle}
        </div>
        <div id="player-status">
          Status:
          {status ? this.state.status : this.props.status}
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  round: PropTypes.number,
  name: PropTypes.string,
  subtitle: PropTypes.bool,
  status: PropTypes.string,
  handlePlayerSelectOnClick: PropTypes.func,
};

Player.defaultProps = {
  round: 1,
  name: 'DefaultName',
  subtitle: true,
  status: null,
  handlePlayerSelectOnClick: () => { },
};
