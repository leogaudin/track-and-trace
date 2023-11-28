import React, { createContext, useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { getString } from '../utils/asyncStorage';
import { requestAllPermissions, requestCameraPermission, requestLocationPermission } from '../utils/permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginKey, offlineKey } from '../constants';

interface AppContextValue {
  login: string | undefined | null;
  setLogin: (loggedIn: string) => void;
  hasInternetConnection: boolean;
  setInternetConnection: (hasConnection: boolean) => void;
  hasCameraPermissions: boolean;
  setCameraPermissions: (hasCameraPermissions: boolean) => void;
  hasLocationPermissions: boolean;
  setLocationPermissions: (hasLocationPermissions: boolean) => void;
  offlineData: any[];
  setOfflineData: (offlineData: any[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppContextValue>({
  login: null,
  setLogin: () => { },
  hasInternetConnection: false,
  setInternetConnection: () => { },
  hasCameraPermissions: true,
  setCameraPermissions: () => { },
  hasLocationPermissions: true,
  setLocationPermissions: () => { },
  offlineData: [],
  setOfflineData: () => { },
  loading: true,
  setLoading: () => { },

});

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [login, setLogin] = useState<string | undefined | null>(null);
  const [hasInternetConnection, setInternetConnection] = useState(false);
  const [hasCameraPermissions, setCameraPermissions] = useState(true);
  const [hasLocationPermissions, setLocationPermissions] = useState(true);
  const [offlineData, setOfflineData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storeOfflineData = async () => {
      try {
        if (offlineData?.length)
          await AsyncStorage.setItem(offlineKey, JSON.stringify(offlineData));
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
      const userNumber = await getString(loginKey);
      setLogin(userNumber);
    };
    const checkCameraPermission = async () => {
      const cameraPermission = await requestCameraPermission();
      setCameraPermissions(cameraPermission);
    };
    const checkLocationPermission = async () => {
      const locationPermission = await requestLocationPermission();
      setLocationPermissions(locationPermission);
    };
    const checkAllPermissions = async () => {
      const allPermissions = await requestAllPermissions();
      setLocationPermissions(allPermissions.location);
      setCameraPermissions(allPermissions.camera);
    }
    const retrieveOfflineData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(offlineKey);
        if (storedData && JSON.stringify(offlineData) !== storedData)
          setOfflineData(JSON.parse(storedData));
      } catch (error) {
        console.log('Error retrieving offline data:', error);
      }
    };

    Promise.all([
      hasConnection,
      checkLogin(),
      checkAllPermissions(),
      retrieveOfflineData(),
    ])
      .then(() => setLoading(false));
  }, []);

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
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
