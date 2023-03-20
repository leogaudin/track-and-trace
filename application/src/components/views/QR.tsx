'use strict';

import React, {Component, useState} from 'react';
import {Alert, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import globalStyles from '../../styles/GlobalStyles';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import ResultModal from '../organisms/Result'

// export class ScanScreen extends Component {
//   state = {
//     back: false,
//     flash: false,
//   };

//   changeCamera = () => {
//     this.setState({
//       back: !this.state.back,
//     });
//   };

//   flashController = () => {
//     if (!this.state.back) {
//       this.setState({
//         flash: !this.state.flash,
//       });
//     }
//   };

//   onSuccess = (e: {data: string}) => {
//     Alert.alert('Result ', e.data, [
//       {
//         text: 'Copy',
//         onPress: () => {
//           Clipboard.setString(e.data);
//         },
//       },
//       {
//         text: 'Cancel',
//         onPress: () => console.log('Cancel Pressed'),
//         style: 'cancel',
//       },
//     ]);
//   };

//   render() {
//     return (
//       <View style={globalStyles.view}>
//         <Text style={globalStyles.title}>Scan the QR Code</Text>
//         <QRCodeScanner
//           fadeIn={true}
//           reactivate={true}
//           reactivateTimeout={3000}
//           cameraType={this.state.back ? 'front' : 'back'}
//           cameraStyle={[globalStyles.camera]}
//           onRead={this.onSuccess}
//           flashMode={
//             this.state.flash
//               ? RNCamera.Constants.FlashMode.torch
//               : RNCamera.Constants.FlashMode.off
//           }
//         />
//         <View style={[globalStyles.horizontal]}>
//           <Pressable
//             onPress={this.changeCamera}
//             style={[globalStyles.button, globalStyles.shadow]}>
//             <Text style={globalStyles.big}>🔄</Text>
//           </Pressable>
//           <Pressable
//             onPress={this.flashController}
//             style={[globalStyles.button, globalStyles.shadow]}>
//             <Text style={globalStyles.big}>💡</Text>
//           </Pressable>
//         </View>
//       </View>
//     );
//   }
// }

export default function Scanner(props: any) {
  const [flash, setFlash] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState('');

  return (
    <View>
      <ResultModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        data={data}
      />
      <QRCodeScanner
        fadeIn={true}
        reactivate={true}
        reactivateTimeout={3000}
        // cameraType={this.state.back ? 'front' : 'back'}
        cameraStyle={[globalStyles.camera]}
        onRead={e => {
          setData(e.data);
          setModalVisible(true);
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
