import React from 'react';
import {useState, useEffect} from 'react';
import {Platform, Pressable, SafeAreaView, Text, View} from 'react-native';
import Scanner from './src/components/views/QR';
import globalStyles from './src/styles/GlobalStyles';
import {
  handleCameraPermissionAndroid,
  handleCameraPermissionIOS,
  handleLocationPermissionAndroid,
  handleLocationPermissionIOS,
} from './src/utils/checkPermissions';
import RNRestart from 'react-native-restart';
import Login from './src/components/organisms/Login';

/**
 * Entry point of the app.
 * First checks the permissions, and adapts the render depending on them.
 * @returns the appropriate view: if all permissions are good, the scanner, if not, the warning message.
 */
function App(): JSX.Element {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [loginVisible, setLoginVisible] = useState(true);
  /**
   *
   * @param arr an array of booleans to check.
   * @returns   true if all the values are true, false otherwise.
   */
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

  /**
   * Renders a different view depending on the state of the permissions.
   */
  if (hasPermissions) {
    return (
      <View>
        <Login modalVisible={loginVisible} setModalVisible={setLoginVisible} />
        <Scanner />
      </View>
    );
  } else {
    return (
      <View
        style={[
          globalStyles.view,
          {backgroundColor: 'whitesmoke', padding: 30},
        ]}>
        <Text style={{color: 'black', textAlign: 'center', fontSize: 20}}>
          <Text>This application needs access to the </Text>
          <Text style={{fontWeight: 'bold'}}>camera</Text>
          <Text> and </Text>
          <Text style={{fontWeight: 'bold'}}>location</Text>
          <Text> to launch. Please allow access to both and restart.</Text>
        </Text>
        <Pressable
          style={globalStyles.button}
          onPress={() => {
            RNRestart.restart();
          }}>
          <Text style={{textAlign: 'center'}}>
            I have updated the permissions, check again.
          </Text>
        </Pressable>
      </View>
    );
  }
}

export default App;
