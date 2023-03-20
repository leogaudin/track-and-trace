'use strict';

import React, {Component, useState} from 'react';
import {Alert, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import globalStyles from '../../styles/GlobalStyles';
import ResultModal from '../organisms/Result';

export default function Scanner(props: any) {
  const [flash, setFlash] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState({});

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
        // cameraType={this.state.back ? 'front' : 'back'}
        cameraStyle={[globalStyles.camera]}
        onRead={e => {
          if (!modalVisible) {
            if (JSON.parse(e.data).hasOwnProperty('DN #')) {
              setData(JSON.parse(e.data));
              setModalVisible(true);
            }
          }
        }}
        flashMode={
          flash
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
      />
    </View>
  );
}

// function Result({data}: {data: string}) {
//   return (
//     <Modal
//       style={[globalStyles.view, globalStyles.modal]}
//       visible={visible}
//       animationType={'slide'}
//       onRequestClose={() => {
//         setVisible(false);
//       }}>
//       <Text style={globalStyles.title}>{data}</Text>
//       <View style={globalStyles.horizontal}>
//         <Pressable
//           style={globalStyles.button}
//           onPress={() => setVisible(false)}>
//           <Text style={{fontWeight: 'normal'}}>Cancel</Text>
//         </Pressable>
//         <Pressable
//           style={globalStyles.button}
//           onPress={() => setVisible(false)}>
//           <Text>Send</Text>
//         </Pressable>
//       </View>
//     </Modal>
//   );
// }

const styles = StyleSheet.create({
  marker: {
    color: 'white',
  },
});
