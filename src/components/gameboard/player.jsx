/* eslint-disable no-multi-spaces */
import React from 'react';
import PropTypes from 'prop-types';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      style: { backgroundColor: 'white' },
    };

    // METHOD BINDING
    this.onClick           = this.onClick.bind(this);
    this.highlightSelected = this.highlightSelected.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props;

    if (prevProps.status !== status) {
      this.setState({ status });
      this.highlightSelected();
    }
  }

  onClick() {
    const { handlePlayerSelectOnClick, name } = this.props;

    handlePlayerSelectOnClick(name);
  }

  highlightSelected() {
    const { status, name } = this.props;

    if (status === name) {
      this.setState({
        style: { backgroundColor: 'lightgrey' },
      });
    } else {
      this.setState({
        style: { backgroundColor: 'white' },
      });
    }
  }

  render() {
    const { name, subtitle } = this.props;
    const { style, status }  = this.state;

    return (
      <div id="player-id-container" onClick={this.onClick} style={style}>
        <div id="player-name">
          {name}
          <p />
        </div>
        <div id="player-subtitle">
          {subtitle}
        </div>
        <div id="player-status">
          Status:
          {status}
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  name: PropTypes.string,
  subtitle: PropTypes.bool,
  status: PropTypes.string,
  handlePlayerSelectOnClick: PropTypes.func,
};

Player.defaultProps = {
  name: 'DefaultName',
  subtitle: true,
  status: null,
  handlePlayerSelectOnClick: () => { },
};
