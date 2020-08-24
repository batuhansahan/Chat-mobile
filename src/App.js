import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {View, Alert, Text} from 'react-native';

class MessageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isWs: 'Connecting',
      isConnected: false,
      isRoomJoined: false,
      room: '',
      username: '',
      messages: [],
    };

    this.socket = new WebSocket('ws://192.168.0.18:8082');
    this.socket.onopen = () => {
      this.socket.send(
        JSON.stringify({
          action: 'chat-sub',
          room: 'test',
        }),
      );
      this.socket.onmessage = (e) => {
        this.messageHandler(e);
      };
      this.setState({
        isWs: 'Connected',
        isConnected: true,
        isRoomJoined: false,
        room: '',
      });
    };
    this.socket.onclose = (e) => {
      // console.log('Reconnecting: ', e.message);
      setTimeout(() => {
        this.socket = new WebSocket('ws://192.168.0.18:8082');
      }, 1000);
      // socket.emit('onlineusers');
    };

    this.messageHandler = this.messageHandler.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
  }

  componentDidMount() {
    this.setState({isWs: 'Connecting'});
  }

  messageHandler = (data) => {
    let message = JSON.parse(data.data);
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, message),
    }));
  };

  joinRoom(room = 'Public', username = 'User') {
    this.setState({isRoomJoined: true, room, username});
    this.ws.send(
      JSON.stringify({
        action: 'chat-sub',
        room: room,
      }),
    );
  }

  sendMessage = (value) => {
    const {room, username} = this.state;
    if (value) {
      this.socket.send(
        JSON.stringify({
          action: 'chat-pub',
          room: 'test',
          text: value[0].text,
          createdAt: new Date(),
          user: {
            _id: 'test',
            name: 'test',
            avatar: 'https://i.hizliresim.com/iIBmll.png',
          },
        }),
      );
    }
  };

  render() {
    return (
      <GiftedChat
        renderUsernameOnMessage={true}
        messages={this.state.messages}
        onSend={(messages) => this.sendMessage(messages)}
        user={{
          _id: 'test',
          name: 'test',
          avatar: 'https://i.hizliresim.com/iIBmll.png',
        }}
      />
    );
  }
}

export default MessageContainer;
