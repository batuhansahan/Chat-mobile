import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';

import MessageContainer from './src/App'

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <MessageContainer />
      </SafeAreaView>
    </>
  );
};

export default App;
