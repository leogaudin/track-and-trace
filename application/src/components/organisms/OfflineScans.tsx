import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import InfoModal from '../molecules/InfoModal';
import { Button, Text } from 'react-native-paper';
import { sendOfflineData } from '../../utils/asyncStorage';
import AppContext from '../../context/AppContext';
import NetInfo from '@react-native-community/netinfo';

interface OfflineScansProps {
  visible: boolean;
  onClose: () => void;
}

interface DataProps {
  boxId: string;
  time: number | Date;
}

export default function OfflineScans({ visible, onClose }: OfflineScansProps) {
  const { offlineData, hasInternetConnection, setInternetConnection } = useContext(AppContext);

  useEffect(() => {
    NetInfo.addEventListener((state) => {
      setInternetConnection(state.isConnected!);
    });
  }, []);

  return (
    <InfoModal
      title={'Offline scans'}
      visible={visible}
      onClose={onClose}
      children={
        <View style={{maxHeight: '50%'}}>
          {offlineData.length ? (
            <View>
              <ScrollView style={{flexGrow:0}}>
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
              </ScrollView>
              <Button
                mode='contained'
                onPress={() => {
                  sendOfflineData(offlineData);
                  onClose();
                }}
                disabled={!hasInternetConnection}
                style={{ marginTop: 20}}>
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
