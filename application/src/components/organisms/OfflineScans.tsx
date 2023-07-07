import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import InfoModal from '../molecules/InfoModal';
import { Button, Text } from 'react-native-paper';
import { sendOfflineData } from '../../utils/asyncStorage';
import AppContext from '../../context/AppContext';

interface OfflineScansProps {
  visible: boolean;
  onClose: () => void;
}

interface DataProps {
  boxId: string;
  time: number | Date;
}

export default function OfflineScans({ visible, onClose }: OfflineScansProps) {
  const [isConnected] = useState(true);
  const { offlineData } = useContext(AppContext);

  return (
    <InfoModal
      title={'Offline scans'}
      visible={visible}
      onClose={onClose}
      children={
        <View>
          {offlineData.length ? (
            <View>
              {offlineData.map((data: DataProps, index) => {
                return (
                  <View
                    key={data.boxId}
                    style={{
                      justifyContent: 'center',
                      padding: 10,
                      marginVertical: 5,
                      backgroundColor: '#EFEFEF',
                      borderRadius: 10,
                    }}>
                    <Text
                      style={{ fontWeight: 'bold', fontSize: 17, marginBottom: 7 }}>
                      Box n°{data.boxId}
                    </Text>
                    <Text>{new Date(data.time).toLocaleString()}</Text>
                  </View>
                );
              })}
              <Button
                mode='contained'
                onPress={() => {
                  sendOfflineData(offlineData);
                  onClose();
                }}
                disabled={!isConnected}
                style={{ margin: 5 }}>
                Send offline scans
              </Button>
            </View>
          ) : (
            <Text style={{ textAlign: 'center' }}>No offline scans</Text>
          )}
        </View>
      }
    />
  );
}
