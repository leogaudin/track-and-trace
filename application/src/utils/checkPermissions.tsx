import React from 'react';
import {Alert, Linking} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

export function checkAndroidPermissions(): boolean {
  check(PERMISSIONS.ANDROID.CAMERA).then(result => {
    switch (result) {
      case RESULTS.UNAVAILABLE:
        Alert.alert(
          'Camera not available',
          "Your device's camera is unavailable.",
          [{text: 'OK', style: 'default'}],
        );
        return false;
      case RESULTS.DENIED:
        Alert.alert(
          'Camera not enabled',
          'Please allow access to the camera.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'OK', style: 'default'},
          ],
        );
        request(PERMISSIONS.ANDROID.CAMERA);
        checkAndroidPermissions();
        break;
    }
  });
  check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION).then(result => {
    switch (result) {
      case RESULTS.UNAVAILABLE:
        Alert.alert(
          'Location not available',
          'Your device cannot give its location.',
          [{text: 'OK', style: 'default'}],
        );
        return false;
      case RESULTS.DENIED:
        Alert.alert(
          'Location not enabled',
          'Please allow access to the location.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'OK', style: 'default'},
          ],
        );
        request(PERMISSIONS.ANDROID.CAMERA);
        checkAndroidPermissions();
        break;
    }
  });
  return true;
}

export function checkIOSPermissions() {
  check(PERMISSIONS.IOS.CAMERA).then(result => {
    switch (result) {
      case RESULTS.UNAVAILABLE:
        Alert.alert(
          'Camera not available',
          "Your device's camera is unavailable.",
          [{text: 'OK', style: 'default'}],
        );
        return false;
      case RESULTS.DENIED:
        Alert.alert(
          'Camera not enabled',
          'Please allow access to the camera.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'OK', style: 'default'},
          ],
        );
        request(PERMISSIONS.IOS.CAMERA);
        checkIOSPermissions();
        break;
      case RESULTS.BLOCKED:
        Alert.alert(
          'Camera not enabled',
          'Please allow access to the camera.',
          [
            {text: 'Cancel', style: 'cancel'},
            {
              text: 'Go to Settings',
              style: 'default',
              onPress: () => Linking.openSettings(),
            },
          ],
        );
        checkIOSPermissions();
        break;
    }
  });
  check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
    switch (result) {
      case RESULTS.UNAVAILABLE:
        Alert.alert(
          'Location not available',
          "Your device's camera is unavailable.",
          [{text: 'OK', style: 'default'}],
        );
        return false;
      case RESULTS.DENIED:
        Alert.alert(
          'Location not enabled',
          'Please allow access to the location.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'OK', style: 'default'},
          ],
        );
        request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
		checkIOSPermissions();
        break;
      case RESULTS.BLOCKED:
        Alert.alert(
          'Location blocked',
          'Please allow access to the location in your settings.',
          [
            {text: 'Cancel', style: 'cancel'},
            {
              text: 'Go to Settings',
              style: 'default',
              onPress: () => Linking.openSettings(),
            },
          ],
        );
        checkIOSPermissions();
        break;
    }
  });
  return true;
}
