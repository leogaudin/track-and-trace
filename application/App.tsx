import React, {useState, useEffect} from 'react';
import {
  Appearance,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScanScreen from './src/components/views/QR';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
        // <Stack.Screen name="Scanner" component={ScanScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <SafeAreaView>
      <ScanScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    color: 'black',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default App;
