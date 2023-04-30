import {
  check,
  Permission,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';

/**
Checks the access to the given permission on the given platform.
Immediately returns true if so.
Otherwise requests the permission, then checks again.
@param permission The permission to check (e.g., PERMISSIONS.IOS.CAMERA or PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION).
@returns true if the app has access to the permission, false otherwise.
*/
export const handlePermission = async (permission) => {
  const res = await check(permission);
  if (res === RESULTS.GRANTED) {
    return true;
  } else if (res === RESULTS.DENIED) {
    const res_retry = await request(permission);
    return res_retry === RESULTS.GRANTED;
  } else {
    return false;
  }
};

export const handleCameraPermissionIOS = async () => {
  return await handlePermission(PERMISSIONS.IOS.CAMERA);
};

export const handleLocationPermissionIOS = async () => {
  return await handlePermission(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
};

export const handleCameraPermissionAndroid = async () => {
  return await handlePermission(PERMISSIONS.ANDROID.CAMERA);
};

export const handleLocationPermissionAndroid = async () => {
  return await handlePermission(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
};
