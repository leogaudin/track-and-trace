import React, {useEffect} from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  Dimensions,
  Pressable,
  View,
} from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';
import InfoModal from './InfoModal';
import {offlineData, updateOfflineData} from '../../utils/asyncStorage';

export default function OfflineScans({visible, onClose, title}) {
  useEffect(() => {
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
            offlineData.map((data, index) => {
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
            })
          ) : (
            <Text style={{textAlign: 'center'}}>No offline scans</Text>
          )}
        </View>
      }
    />
  );
}
