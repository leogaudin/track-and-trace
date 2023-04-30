'use strict';

import React, {useState} from 'react';
import {View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import globalStyles from '../../styles/GlobalStyles';
import ResultModal from '../organisms/Result';

export default function Scanner() {
  const [flash, setFlash] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState('');

  const handleRead = e => {
    if (!modalVisible) {
      setData(e.data);
      setModalVisible(true);
    }
  };

  return (
    <View>
      <ResultModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        data={data}
      />
      <QRCodeScanner
        fadeIn={true}
        vibrate={false}
        reactivate={true}
        reactivateTimeout={3000}
        cameraStyle={[globalStyles.camera]}
        onRead={handleRead}
        flashMode={
          flash
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
      />
    </View>
  );
}
