import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendScan } from './api';
import { offlineKey } from '../constants';

/**
 * Stores a string in AsyncStorage
 * @param key   The key to store the value under
 * @param value The value to store
 */
export const storeString = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};

/**
 * Retrieves a string from AsyncStorage
 * @param key The key to retrieve the value from
 * @returns   The value stored under the given key
 */
export const getString = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.error(e);
  }
};

/**
 * Removes a string from AsyncStorage
 * @param key The key to remove the value from
 */
export const removeValue = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(e);
  }
  console.log('Removed ' + key + '.');
};

/**
 * Stores a scan object in the offline storage
 * @param dataToSend The data to store offline, as a scan object
 */
export const storeOfflineData = (dataToSend: {}) => {
  AsyncStorage.getItem(offlineKey)
    .then((data) => {
      let existingData = data ? JSON.parse(data) : [];
      existingData.push(dataToSend);

      AsyncStorage.setItem(offlineKey, JSON.stringify(existingData))
        .catch((error) => {
          console.error('Error storing offline data:', error);
        });
    })
    .catch((error) => {
      console.error('Error retrieving offline data:', error);
    });
};

/**
 * Sends the provided offline data to the server, and stores any failed data
 * back in the offline storage.
 * @param offlineData The offline data to send, as an array of scan objects
 * @param failedData  Leave this blank, used for recursion
 */
export const sendOfflineData = (offlineData: object[], failedData: object[] = []) => {
  if (offlineData.length > 0) {
    const dataToSend = offlineData[0];
    sendScan(JSON.stringify(dataToSend))
      .catch((error: Error) => {
        console.error('Error sending offline data:', error)
        if (!error.message.includes('409'))
          failedData?.push(dataToSend);
      })
      .finally(() => {
        offlineData.shift();
        AsyncStorage.setItem(offlineKey, JSON.stringify(offlineData))
          .then(() => {
            sendOfflineData(offlineData, failedData);
          })
          .catch((error) => {
            console.error('Error updating offline data:', error);
          });
      })
  }
  else if (failedData?.length > 0) {
    failedData.forEach((data) => {
      storeOfflineData(data);
    });
  }
};
