import React, {useEffect} from 'react';
import {
  Text,
  Pressable,
  View,
} from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';
import InfoModal from './InfoModal';
import {offlineData, sendOfflineData, storeOfflineData, updateOfflineData} from '../../utils/asyncStorage';
import NetInfo from '@react-native-community/netinfo';

export default function OfflineScans({visible, onClose, title}) {
  const [isConnected, setIsConnected] = React.useState(true);

  useEffect(() => {
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });
    updateOfflineData();
  }, [offlineData]);
  return (
    <InfoModal
      title={'Offline scans'}
      visible={visible}
      onClose={onClose}
      children={
        <View>
          {offlineData.length ? (
          <View>
              {offlineData.map((data, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      justifyContent: 'center',
                      padding: 10,
                      marginVertical: 5,
                      backgroundColor: '#EFEFEF',
                      borderRadius: 10,
                    }}>
                    <Text
                      style={{fontWeight: 'bold', fontSize: 17, marginBottom: 7}}>
                      Box n°{data.boxId}
                    </Text>
                    <Text>{new Date(data.time).toLocaleString()}</Text>
                  </View>
                );
              })}
              <Pressable
                onPress={() => {
                  sendOfflineData();
                  onClose();
                }}
                disabled={!isConnected}
                style={[GlobalStyles.mainButton, {opacity: isConnected ? 1 : 0.5}]}
              >
                <Text style={{textAlign: 'center', color: 'white'}}>
                  Send manually
                </Text>
              </Pressable>
            </View>
          ) : (
            <Text style={{textAlign: 'center'}}>No offline scans</Text>
          )}
        </View>
      }
    />
  );
}
