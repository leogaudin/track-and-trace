import React, { createContext, useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { getString } from '../utils/asyncStorage';
import { requestCameraPermission, requestLocationPermission } from '../utils/permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppContextValue {
  login: string;
  setLogin: (loggedIn: string) => void;
  hasInternetConnection: boolean;
  setInternetConnection: (hasConnection: boolean) => void;
  hasCameraPermissions: boolean;
  setCameraPermissions: (hasCameraPermissions: boolean) => void;
  hasLocationPermissions: boolean;
  setLocationPermissions: (hasLocationPermissions: boolean) => void;
  offlineData: any[];
  setOfflineData: (offlineData: any[]) => void;
}

const AppContext = createContext<AppContextValue>({
  login: '',
  setLogin: () => { },
  hasInternetConnection: false,
  setInternetConnection: () => { },
  hasCameraPermissions: false,
  setCameraPermissions: () => { },
  hasLocationPermissions: false,
  setLocationPermissions: () => { },
  offlineData: [],
  setOfflineData: () => { },
});

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [login, setLogin] = useState('');
  const [hasInternetConnection, setInternetConnection] = useState(false);
  const [hasCameraPermissions, setCameraPermissions] = useState(false);
  const [hasLocationPermissions, setLocationPermissions] = useState(false);
  const [offlineData, setOfflineData] = useState<any[]>([]);

  // Monitor the offlineData state and store it in AsyncStorage
  useEffect(() => {
    const storeOfflineData = async () => {
      try {
        await AsyncStorage.setItem('offlineData', JSON.stringify(offlineData));
      } catch (error) {
        console.error('Error storing offline data:', error);
      }
    };

    storeOfflineData();
  }, [offlineData]);

  useEffect(() => {
    const hasConnection = NetInfo.addEventListener((state) => {
      setInternetConnection(state.isConnected!);
    });
    const checkLogin = async () => {
      const userNumber = await getString('user_number');
      setLogin(userNumber!);
    };
    const checkCameraPermission = async () => {
      const cameraPermission = await requestCameraPermission();
      setCameraPermissions(cameraPermission);
    };
    const checkLocationPermission = async () => {
      const locationPermission = await requestLocationPermission();
      setLocationPermissions(locationPermission);
    };
    const retrieveOfflineData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('offlineData');
        if (storedData && JSON.stringify(offlineData) !== storedData) {
          setOfflineData(JSON.parse(storedData));
        }
      } catch (error) {
        console.log('Error retrieving offline data:', error);
      }
    };

    retrieveOfflineData();

    return () => {
      hasConnection();
      checkLogin();
      checkCameraPermission();
      checkLocationPermission();
    };
  }), [];

  return (
    <AppContext.Provider
      value={{
        login,
        hasInternetConnection,
        setLogin,
        setInternetConnection,
        hasCameraPermissions,
        setCameraPermissions,
        hasLocationPermissions,
        setLocationPermissions,
        offlineData,
        setOfflineData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;