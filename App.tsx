
import { registerRootComponent } from 'expo';
import React from 'react';
import { View, Text } from 'react-native';

const App = () => (
  <View>
    <Text>Hello, Expo!</Text>
  </View>
);

export default App;
registerRootComponent(App);
