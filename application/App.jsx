import React, {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import Scanner from './src/components/views/Scanner';
import Login from './src/components/views/Login';
import {
  handleCameraPermissionAndroid,
  handleCameraPermissionIOS,
  handleLocationPermissionAndroid,
  handleLocationPermissionIOS,
} from './src/utils/checkPermissions';
import {getString} from './src/utils/asyncStorage';
import AskPermissions from './src/components/views/AskPermissions';



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
      setLoginVisible(!userNumber);
    };

    requestPermissions();
    checkLogin();
  }, []);

  if (loginVisible)
    return <Login modalVisible={loginVisible} setModalVisible={setLoginVisible} />;
  else if (hasPermissions)
    return <Scanner />;
  else
    return <AskPermissions />;
}
