import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendScan, showToast } from '../components/organisms/Result';
import NetInfo from '@react-native-community/netinfo';

const offlineKey = 'offline_scans';
export let offlineData = [];

export const updateOfflineData = () => {
  AsyncStorage.getItem(offlineKey)
    .then((data) => {
      if (data) {
        offlineData = JSON.parse(data);
        NetInfo.fetch().then(state => {
          if (state.isConnected)
            sendOfflineData();
        });
      }
    })
    .catch((error) => {
      console.error('Error retrieving offline data:', error);
    });
};

updateOfflineData();

export const storeString = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};

export const getString = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.error(e);
  }
};

export const removeValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(e);
  }
  console.log('Removed ' + key + '.');
};

export const storeOfflineData = (dataToSend) => {
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

export const sendOfflineData = (failedData = []) => {
  if (offlineData.length > 0) {
    const dataToSend = offlineData[0];
    sendScan(JSON.stringify(dataToSend))
      .then(() => {
        //
      })
      .catch((error) => {
        console.error('Error sending offline data:', error)
        if (!error.message.includes('409'))
          failedData?.push(dataToSend);
      })
      .finally(() => {
        offlineData.shift();
        AsyncStorage.setItem(offlineKey, JSON.stringify(offlineData))
          .then(() => {
            sendOfflineData(failedData);
          })
          .catch((error) => {
            console.error('Error updating offline data:', error);
          });
      })
  }
  else if (failedData?.length > 0) {
    showToast(
      'error',
      'Error!',
      'Offline scan(s) could not be sent. Try again later'
    );
    failedData.forEach((data) => {
      storeOfflineData(data);
    });
    updateOfflineData();
  }
};
