/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

export default class PlayerID extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      selected: '',
    };

    this.onClick = this.onClick.bind(this);
    this.highlightSelected = this.highlightSelected.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { selected } = this.props;

    if (prevProps.selected !== selected) {
      this.setState({ selected });
      this.highlightSelected();
    }
  }

  onClick() {
    const { handlePlayerSelectOnClick, name } = this.props;
    handlePlayerSelectOnClick(name);
  }

  highlightSelected() {
    const { selected, name } = this.props;

    if (selected === name) this.setState({ isSelected: true });
    else this.setState({ isSelected: false });
  }

  render() {
    const { isSelected } = this.state;
    const { name, image, ready } = this.props;

    return (
      <div id="player-container" onClick={this.onClick} data-selected={isSelected}>
        <div id="player-name">
          {name}
          <p />
        </div>
        <div id="player-image">
          {image}
        </div>
        <div id="player-ready-status">
          {ready}
        </div>
      </div>
    );
  }
}
