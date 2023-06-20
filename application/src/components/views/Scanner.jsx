'use strict';

import React, {useState} from 'react';
import {Pressable, View, Text} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import globalStyles from '../../styles/GlobalStyles';
import ResultModal from '../organisms/Result';
import OfflineScansModal from '../molecules/OfflineScans';
import Flashlight from '../svg/Flashlight';
import Offline from '../svg/Offline';
import IconButton from '../atoms/IconButton';
import Toast from 'react-native-toast-message';

export default function Scanner() {
  const [flash, setFlash] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [data, setData] = useState('');

  const handleRead = e => {
    if (!resultVisible) {
      setData(e.data);
      setResultVisible(true);
    }
  };

  return (
    <View>
      <QRCodeScanner
        fadeIn={true}
        vibrate={false}
        reactivate={true}
        reactivateTimeout={3000}
        cameraStyle={globalStyles.camera}
        onRead={handleRead}
        flashMode={
          flash
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
      />
      <ResultModal
        modalVisible={resultVisible}
        setModalVisible={setResultVisible}
        data={data}
      />
      <OfflineScansModal
        visible={notificationVisible}
        onClose={() => setNotificationVisible(false)}
      />
      <View
        style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 50,
        }}>
          <Pressable onPress={() => setNotificationVisible(true)}>
            <IconButton icon={<Offline />} />
          </Pressable>
          <Pressable onPress={() => setFlash(!flash)}>
            <IconButton icon={<Flashlight />} />
          </Pressable>
        </View>
      </View>
      <Toast />
    </View>
  );
}
