import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

/**
 * Checks the access to the camera.
 * Immediately returns true if so.
 * Otherwise requests the permission, then checks again.
 * @returns true if the app has access to the camera, false otherwise.
 */
export const handleCameraPermissionIOS = async () => {
  const resCam = await check(PERMISSIONS.IOS.CAMERA);
  if (resCam === RESULTS.GRANTED) {
    return true;
  } else if (resCam === RESULTS.DENIED) {
    const resCam2 = await request(PERMISSIONS.IOS.CAMERA);
    return resCam2 === RESULTS.GRANTED;
  } else {
    return false;
  }
};
/**
 * Checks the access to the location.
 * Immediately returns true if so.
 * Otherwise requests the permission, then checks again.
 * @returns true if the app has access to the location, false otherwise.
 */
export const handleLocationPermissionIOS = async () => {
  const resLoc = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  if (resLoc === RESULTS.GRANTED) {
    return true;
  } else if (resLoc === RESULTS.DENIED) {
    const resLoc2 = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    return resLoc2 === RESULTS.GRANTED;
  } else {
    return false;
  }
};
/**
 * Checks the access to the camera.
 * Immediately returns true if so.
 * Otherwise requests the permission, then checks again.
 * @returns true if the app has access to the camera, false otherwise.
 */
export const handleCameraPermissionAndroid = async () => {
  const resCam = await check(PERMISSIONS.ANDROID.CAMERA);
  if (resCam === RESULTS.GRANTED) {
    return true;
  } else if (resCam === RESULTS.DENIED) {
    const resCam2 = await request(PERMISSIONS.ANDROID.CAMERA);
    return resCam2 === RESULTS.GRANTED;
  } else {
    return false;
  }
};
/**
 * Checks the access to the location.
 * Immediately returns true if so.
 * Otherwise requests the permission, then checks again.
 * @returns true if the app has access to the location, false otherwise.
 */
export const handleLocationPermissionAndroid = async () => {
  const resLoc = await check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
  if (resLoc === RESULTS.GRANTED) {
    return true;
  } else if (resLoc === RESULTS.DENIED) {
    const resLoc2 = await request(
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    );
    return resLoc2 === RESULTS.GRANTED;
  } else {
    return false;
  }
};
