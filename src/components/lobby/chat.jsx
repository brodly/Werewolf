import React from 'react';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      messages: [],
    };

    this.socket = this.props.socket;
    this.handleUpdateMessage = this.handleUpdateMessage.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentDidMount() {
    const { messages } = this.state;

    this.socket.on('chat message', (data) => {
      const updatedMessages = messages;
      updatedMessages.push(data);
      if (updatedMessages.length === 12) {
        updatedMessages.shift();
      }
      this.setState({ messages: updatedMessages });
    });
  }

  handleOnSubmit(e) {
    const { message } = this.state;
    const { username } = this.props;

    e.preventDefault();
    this.socket.emit('chat message', { username, message });
    this.setState({ message: '' });
  }

  handleUpdateMessage(e) {
    this.setState({ message: e.target.value });
  }

  render() {
    const { message, messages } = this.state;

    return (
      <div id="chat-container">
        <ul id="messages">
          {messages.map((m) => {
            if (m.username === null) {
              return (
                <li>
                  <div key={m.id}>
                    {m.message}
                  </div>
                </li>
              );
            }
            return (
              <li>
                <div key={m.id}>
                  {m.username}
                  :
                  {'\u00A0'}
                  {m.message}
                </div>
              </li>
            );
          })}
        </ul>
        <form onSubmit={this.handleOnSubmit}>
          <input id="m" autoComplete="off" value={message} onChange={this.handleUpdateMessage} />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}
