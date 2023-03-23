import React, {useState, useEffect, useLayoutEffect} from 'react';
import {Platform, Pressable, SafeAreaView, Text, View} from 'react-native';
import ScanScreen from './src/components/views/QR';
import globalStyles from './src/styles/GlobalStyles';
import {
  handleCameraPermissionAndroid,
  handleCameraPermissionIOS,
  handleLocationPermissionAndroid,
  handleLocationPermissionIOS,
} from './src/utils/checkPermissions';
import RNRestart from 'react-native-restart';

function App(): JSX.Element {
  const [hasPermissions, setHasPermissions] = useState(false);
  let checker = (arr: Boolean[]) => arr.every(Boolean);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      Promise.all([
        handleCameraPermissionIOS(),
        handleLocationPermissionIOS(),
      ]).then(permissions => {
        setHasPermissions(checker(permissions));
      });
    } else if (Platform.OS === 'android') {
      Promise.all([
        handleCameraPermissionAndroid(),
        handleLocationPermissionAndroid(),
      ]).then(permissions => {
        setHasPermissions(checker(permissions));
      });
    }
  }, []);

  if (hasPermissions) {
    return (
      <SafeAreaView>
        <ScanScreen />
      </SafeAreaView>
    );
  } else {
    return (
      <View style={{backgroundColor: 'red'}}>
        <Text style={[globalStyles.title, {color: 'red'}]}>
          The application does not have all the permissions necessary to launch.
        </Text>
        <Pressable
          style={globalStyles.button}
          onPress={() => {
            RNRestart.restart();
          }}>
          <Text>I have updated the permissions, check again.</Text>
        </Pressable>
      </View>
    );
  }
}

export default App;
