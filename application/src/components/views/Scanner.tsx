import React, {useState} from 'react';
import {View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import styles from '../../styles';
import SendScanModal from '../organisms/SendScanModal';
import OfflineScansModal from '../organisms/OfflineScans';
import Flashlight from '../../assets/svg/Flashlight';
import Offline from '../../assets/svg/Offline';
import IconButton from '../atoms/IconButton';
import Toast from 'react-native-toast-message';

export default function Scanner() {
  const [flash, setFlash] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);
  const [offlineScansVisible, setOfflineScansVisible] = useState(false);
  const [data, setData] = useState('');

  const handleRead = (e: { data: React.SetStateAction<string>; }) => {
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
        cameraStyle={styles.camera}
        onRead={handleRead}
        flashMode={
          flash
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
      />
      <SendScanModal
        modalVisible={resultVisible}
        setModalVisible={setResultVisible}
        data={data}
      />
      <OfflineScansModal
        visible={offlineScansVisible}
        onClose={() => setOfflineScansVisible(false)}
      />
      <View
        style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 50,
        }}>
          <IconButton onPress={() => setOfflineScansVisible(true)} icon={<Offline />} />
          <IconButton onPress={() => setFlash(!flash)} icon={<Flashlight />} />
        </View>
      </View>
      <Toast />
    </View>
  );
}
