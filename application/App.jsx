import React, {useState, useEffect} from 'react';
import {Platform, Pressable, Text, View} from 'react-native';
import Scanner from './src/components/views/QR';
import Login from './src/components/organisms/Login';
import globalStyles from './src/styles/GlobalStyles';
import {
  handleCameraPermissionAndroid,
  handleCameraPermissionIOS,
  handleLocationPermissionAndroid,
  handleLocationPermissionIOS,
} from './src/utils/checkPermissions';
import RNRestart from 'react-native-restart';
import {getString} from './src/utils/asyncStorage';

export default function App() {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);

  useEffect(() => {
    const requestPermissions = async () => {
      let permissions = [];
      if (Platform.OS === 'ios') {
        permissions = await Promise.all([
          handleCameraPermissionIOS(),
          handleLocationPermissionIOS(),
        ]);
      } else if (Platform.OS === 'android') {
        permissions = await Promise.all([
          handleCameraPermissionAndroid(),
          handleLocationPermissionAndroid(),
        ]);
      }
      setHasPermissions(permissions.every(Boolean));
    };

    const checkLogin = async () => {
      const userNumber = await getString('user_number');
      setLoginVisible(userNumber === null);
    };

    requestPermissions();
    checkLogin();
  }, []);

  if (loginVisible) {
    return <Login modalVisible={loginVisible} setModalVisible={setLoginVisible} />;
  } else if (hasPermissions) {
    return <Scanner />;
  } else {
    return (
      <View
        style={[
          globalStyles.view,
          {backgroundColor: 'whitesmoke', padding: 30},
        ]}>
        <Text style={{color: 'black', textAlign: 'center', fontSize: 20}}>
          This application needs access to the{' '}
          <Text style={{fontWeight: 'bold'}}>camera</Text> and{' '}
          <Text style={{fontWeight: 'bold'}}>location</Text> to launch. Please
          allow access to both and restart.
        </Text>
        <Pressable
          style={globalStyles.button}
          onPress={() => RNRestart.restart()}>
          <Text style={{textAlign: 'center'}}>
            I have updated the permissions, check again.
          </Text>
        </Pressable>
      </View>
    );
  }
}
