import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MessageContainer from './src/App';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      room: '',
      isConnected: false,
    };
  }

  handleNavigate = (user, room) => {
    if (user && room) {
      this.setState({isConnected: true});
    } else {
      Alert.alert('Error', 'Please type name and room name' + user);
    }
  };

  onUserChanged(text) {
    this.setState({user:text});
  }

  onRoomChanged(text) {
    this.setState({room:text});
  }

  PreLogin = () => {
    return (
      <View>
        <TextInput
          type="text"
          value={this.state.user}
          placeholder="Your Name"
          onChangeText={this.onUserChanged.bind(this)}
        />
        <TextInput
          type="text"
          value={this.state.room}
          placeholder="Room Name"
          onChangeText={this.onRoomChanged.bind(this)}
        />
        <TouchableOpacity
          onPress={() => {
            this.handleNavigate(this.state.user, this.state.room);
          }}>
          <Text>Join</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.isConnected ? (
          <MessageContainer user={this.state.user} room={this.state.room} />
        ) : (
          this.PreLogin()
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default App;
