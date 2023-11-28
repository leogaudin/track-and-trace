import React, {useContext, useState} from 'react';
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
import AppContext from '../../context/AppContext';

export default function Scanner() {
  const [flash, setFlash] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);
  const [offlineScansVisible, setOfflineScansVisible] = useState(false);
  const [data, setData] = useState('');
  const {hasCameraPermissions, hasLocationPermissions, loading} = useContext(AppContext);

  const handleRead = (e: { data: string; }) => {
    if (!resultVisible) {
      if (e.data.startsWith('tnt://'))
      {
        e.data = e.data.replace('tnt://', '');
        setData(e.data);
        setResultVisible(true);
      }
    }
  };

  if (!loading && hasCameraPermissions && hasLocationPermissions)
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
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 50,
          }}>
            <IconButton onPress={() => setOfflineScansVisible(true)} icon={<Offline />} />
            <IconButton onPress={() => setFlash(!flash)} icon={<Flashlight />} />
          </View>
        <Toast />
      </View>
    );
}
