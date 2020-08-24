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
      messages: [],
    };

    this.socket = new WebSocket('ws://192.168.0.18:8082');
    this.socket.onopen = () => {
      this.socket.send(
        JSON.stringify({
          action: 'chat-sub',
          room: this.props.room,
        }),
      );
      this.socket.onmessage = (e) => {
        this.messageHandler(e);
      };
      this.setState({
        isWs: 'Connected',
        isConnected: true,
        isRoomJoined: false,
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
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text:
            'Hello ' +
            this.props.user +
            ', you are in joined the "' +
            this.props.room +
            '" room',
          createdAt: new Date(),
          system: true,
          user: {
            _id: 2,
            name: 'Batuhan Şahan',
            avatar:
              'https://avatars3.githubusercontent.com/u/26772801?s=460&u=fbc073316315b6cd7d7d090ee9b49c1f6e1220cd&v=4',
          },
        },
      ],
    });
    this.setState({isWs: 'Connecting'});
  }

  messageHandler = (data) => {
    let message = JSON.parse(data.data);
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, message),
    }));
  };

  sendMessage = (value) => {
    const {room, user} = this.props;
    if (value) {
      this.socket.send(
        JSON.stringify({
          action: 'chat-pub',
          room: room,
          text: value[0].text,
          createdAt: new Date(),
          user: {
            _id: user,
            name: user,
            avatar: 'https://i.hizliresim.com/iIBmll.png',
          },
        }),
      );
    }
  };

  render() {
    const {room, user} = this.props;
    return (
      <GiftedChat
        renderUsernameOnMessage={true}
        messages={this.state.messages}
        onSend={(messages) => this.sendMessage(messages)}
        user={{
          _id: user,
          name: user,
          avatar: 'https://i.hizliresim.com/iIBmll.png',
        }}
      />
    );
  }
}

export default MessageContainer;
