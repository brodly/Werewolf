import React from 'react';

export default class PlayerId extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false,
      style: { backgroundColor: 'white' },
    };

    this.onClick = this.onClick.bind(this);
    this.toggleColor = this.toggleColor.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    const { handlePlayerSelectOnClick, name } = this.props;
    handlePlayerSelectOnClick(name);
    this.toggleColor();
  }

  toggleColor() {
    const { selected } = this.state;

    if (selected) {
      this.setState({
        selected: false,
        style: { backgroundColor: 'white' },
      });
    } else {
      this.setState({
        selected: true,
        style: { backgroundColor: 'lightgrey' },
      });
    }
  }

  render() {
    const { style } = this.state;
    const { name, image, ready } = this.props;

    return (
      <div id="player-id-container" onClick={this.onClick} style={style}>
        <div id="player-id-name">
          {name}
          <p />
        </div>
        <div id="player-id-image">
          {image}
        </div>
        <div id="player-ready-status">
          {ready}
        </div>
      </div>
    );
  }
}
