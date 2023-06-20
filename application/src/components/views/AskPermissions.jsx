import React from 'react';
import {Text, View, Pressable} from 'react-native';
import globalStyles from '../../styles/GlobalStyles';
import RNRestart from 'react-native-restart';

export default function AskPermissions() {
  return (
    <View
      style={[
        globalStyles.view,
        {
          backgroundColor: 'whitesmoke',
          padding: 30,
        },
      ]}>
      <Text
        style={{
          color: 'black',
          textAlign: 'center',
          fontSize: 20,
        }}>
        This application needs access to the{' '}
        <Text
          style={{
            fontWeight: 'bold',
          }}>
          camera
        </Text>{' '}
        and{' '}
        <Text
          style={{
            fontWeight: 'bold',
          }}>
          location
        </Text>{' '}
        to launch. Please allow access to both and restart.
      </Text>
      <Pressable
        style={globalStyles.button}
        onPress={() => RNRestart.restart()}>
        <Text
          style={{
            textAlign: 'center',
          }}>
          I have updated the permissions, check again.
        </Text>
      </Pressable>
    </View>
  );
}
