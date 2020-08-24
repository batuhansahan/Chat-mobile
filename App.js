import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import MessageContainer from './src/App';
const {width, height} = Dimensions.get('screen');
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
    this.setState({user: text});
  }

  onRoomChanged(text) {
    this.setState({room: text});
  }

  PreLogin = () => {
    return (
      <View style={styles.loginContainer}>
        <TextInput
          type="text"
          style={styles.input}
          value={this.state.user}
          placeholder="Your Name"
          onChangeText={this.onUserChanged.bind(this)}
        />
        <TextInput
          type="text"
          style={styles.input}
          value={this.state.room}
          placeholder="Room Name"
          onChangeText={this.onRoomChanged.bind(this)}
        />
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={() => {
            this.handleNavigate(this.state.user, this.state.room);
          }}>
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 16}}>
            Join Chat
          </Text>
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

const styles = StyleSheet.create({
  loginContainer: {
    marginTop: height / 2 - 200,
  },
  input: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    borderRadius: 6,
    backgroundColor: '#fff',
    color: '#424242',
    marginBottom: 20,
    marginLeft: width / 6,
    marginRight: width / 6,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    borderRadius: 6,
    backgroundColor: '#0366d6',
    marginBottom: 20,
    marginLeft: width / 6,
    marginRight: width / 6,
  },
});

export default App;
