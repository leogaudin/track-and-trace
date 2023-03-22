import React, {useState} from 'react';
import {
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import ScanScreen from './src/components/views/QR';
import globalStyles from './src/styles/GlobalStyles';
import {
  checkAndroidPermissions,
  checkIOSPermissions,
} from './src/utils/checkPermissions';

function App(): JSX.Element {
  const [hasPermissions, setHasPermissions] = useState(false);

  if (Platform.OS === 'android') {
    setHasPermissions(checkAndroidPermissions());
  } else if (Platform.OS === 'ios') {
    setHasPermissions(checkIOSPermissions());
  }
  return (
    <SafeAreaView style={globalStyles.view}>
      {hasPermissions ? (
        <ScanScreen />
      ) : (
        <View style={{height: '100%'}}>
          <Text style={[globalStyles.title, {color: 'red'}]}>
            The application does not have all the permissions necessary to
            launch.
          </Text>
          <Pressable
            style={globalStyles.button}
            onPress={() => {
              if (Platform.OS === 'android') {
                setHasPermissions(checkAndroidPermissions());
              } else if (Platform.OS === 'ios') {
                setHasPermissions(checkIOSPermissions());
              }
            }}>
            <Text>I have updated the permissions, check again.</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

export default App;
