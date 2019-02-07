import React from 'react';

export default class Doctor extends React.Component {
  constructor() {
    super();
    this.state = {

    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { handlePlayerSelectOnSubmit } = this.props;
    handlePlayerSelectOnSubmit();
  }

  render() {
    return (
      <div id="doctor-container">
        <h3>Doctor</h3>
        <button type="button" onClick={this.onClick} value="Save">Save</button>
      </div>
    );
  }
}
