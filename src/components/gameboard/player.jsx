import React from 'react';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      style: { backgroundColor: 'white' },
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { handlePlayerSelectOnClick, name } = this.props;
    this.toggleColor();
    handlePlayerSelectOnClick(name);
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
    const { name, image } = this.props;

    return (
      <div id="player-id-container" onClick={this.onClick} style={style}>
        <div id="player-name">
          {name}
          <p />
        </div>
        <div id="player-image">
          {image}
        </div>
      </div>
    );
  }
}
