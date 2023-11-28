import {Platform, PermissionsAndroid} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';

export const requestCameraPermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera permission required',
          message: 'We need to access your camera for scanning QR Codes',
          buttonNeutral: undefined,
          buttonNegative: undefined,
          buttonPositive: 'OK',
        },
      );
      return result === 'granted';
    } else if (Platform.OS === 'ios') {
      const result = await request(PERMISSIONS.IOS.CAMERA);
      return result === 'granted';
    }
    return false;
  } catch (error) {
    console.error('Error while requesting camera permission:', error);
    return false;
  }
};

export const requestLocationPermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location permission required',
          message: 'We need to access your location for scanning QR Codes',
          buttonNeutral: undefined,
          buttonNegative: undefined,
          buttonPositive: 'OK',
        },
      );
      return result === 'granted';
    } else if (Platform.OS === 'ios') {
      const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      return result === 'granted';
    }
    return false;
  } catch (error) {
    console.error('Error while requesting location permission:', error);
    return false;
  }
};

export const requestAllPermissions = async (): Promise<{location: boolean, camera: boolean}> => {
  try {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
      return ({
        location: result['android.permission.ACCESS_FINE_LOCATION'] === 'granted',
        camera: result['android.permission.CAMERA'] === 'granted'
    });
    } else if (Platform.OS === 'ios') {
      const locationResult = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      const cameraResult = await request(PERMISSIONS.IOS.CAMERA);
      return ({
        location: locationResult === 'granted',
        camera: cameraResult === 'granted'
      });
    }
    return ({
      location: false,
      camera: false
    });
  } catch (error) {
    console.error('Error while requesting location permission:', error);
    return ({
        location: false,
        camera: false
      });
  }
}
