import React from 'react';
import {useState, useEffect} from 'react';
import {Platform, Pressable, Text, View} from 'react-native';
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
import {getString} from './src/utils/asyncStorage';

export default function App() {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);

  let checker = (arr) => arr.every(Boolean);

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

    getString('user_number').then(e => {
      if (e == null) {
        setLoginVisible(true);
      }
    });
  }, []);

  if (loginVisible) {
    return (
      <View>
        <Login modalVisible={loginVisible} setModalVisible={setLoginVisible} />
      </View>
    );
  }
  if (hasPermissions) {
    return (
      <View>
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
