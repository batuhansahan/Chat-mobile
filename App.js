import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Button,
  StatusBar,
} from 'react-native';
import MessageContainer from './src/App';

const App = () => {
  const [user, setUser] = React.useState('Batuhan');
  const [room, setRoom] = React.useState('Public');
  const [isConnected, setIsConnected] = React.useState(false);
  return (
    <View style={{flex: 1}}>
      {isConnected ? <MessageContainer /> : <PreLogin />}
    </View>
  );
};

export const PreLogin = () => {
  return (
    <View>
      <Text>hi</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default App;
