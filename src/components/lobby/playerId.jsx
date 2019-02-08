import React from 'react';

export default class PlayerID extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      style: { backgroundColor: 'white' },
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

    if (selected === name) {
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
