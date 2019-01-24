import React from 'react';
import io from 'socket.io-client';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      messages: [
        {
          id: 0,
          username: 'testname',
          message: 'testmessage',
        },
      ],
    };

    this.handleUpdateMessage = this.handleUpdateMessage.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentDidMount() {
    const { messages } = this.state;
    const socket = io();

    socket.on('chat message', (data) => {
      const updatedMessages = messages;
      updatedMessages.push(data);
      this.setState({ messages: updatedMessages });
    });
  }

  handleOnSubmit(e) {
    const { message } = this.state;
    const { username } = this.props;
    const socket = io();

    e.preventDefault();
    socket.emit('chat message', { username, message });
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
          {messages.map(m => <div key={m.id}>{m.username}:{m.message}</div>)}
        </ul>
        <form onSubmit={this.handleOnSubmit}>
          <input id="m" autoComplete="off" value={message} onChange={this.handleUpdateMessage} />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}
