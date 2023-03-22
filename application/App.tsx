import React, {useState, useEffect} from 'react';
import {
  Alert,
  Appearance,
  Linking,
  Platform,
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
// import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

function App(): JSX.Element {
  // if (Platform.OS === 'android') {
  //   check(PERMISSIONS.ANDROID.CAMERA).then(result => {
  //     switch (result) {
  //       case RESULTS.UNAVAILABLE:
  //         Alert.alert(
  //           'Camera not available',
  //           "Your device's camera is unavailable.",
  //           [{text: 'OK', style: 'default'}],
  //         );
  //         break;
  //       case RESULTS.DENIED:
  //         Alert.alert(
  //           'Camera not enabled',
  //           'Please allow access to the camera.',
  //           [
  //             {text: 'Cancel', style: 'cancel'},
  //             {text: 'OK', style: 'default'},
  //           ],
  //         );
  //         request(PERMISSIONS.ANDROID.CAMERA);
  //         break;
  //     }
  //   });
  // } else if (Platform.OS === 'ios') {
  //   check(PERMISSIONS.IOS.CAMERA).then(result => {
  //     switch (result) {
  //       case RESULTS.UNAVAILABLE:
  //         Alert.alert(
  //           'Camera not available',
  //           "Your device's camera is unavailable.",
  //           [{text: 'OK', style: 'default'}],
  //         );
  //         break;
  //       case RESULTS.DENIED:
  //         Alert.alert(
  //           'Camera not enabled',
  //           'Please allow access to the camera.',
  //           [
  //             {text: 'Cancel', style: 'cancel'},
  //             {text: 'OK', style: 'default'},
  //           ],
  //         );
  //         request(PERMISSIONS.IOS.CAMERA);
  //         break;
  //       case RESULTS.BLOCKED:
  //         Alert.alert(
  //           'Camera not enabled',
  //           'Please allow access to the camera.',
  //           [
  //             {text: 'Cancel', style: 'cancel'},
  //             {
  //               text: 'Go to Settings',
  //               style: 'default',
  //               onPress: () => Linking.openSettings(),
  //             },
  //           ],
  //         );
  //         break;
  //     }
  //   });
  // }
  return (
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
