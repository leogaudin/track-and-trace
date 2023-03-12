'use strict';

import React, { Component, useState, useEffect } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

export class ScanScreen extends Component {
  state = {
    back: false,
    flash: false,
  };

  changeCamera = () => {
    this.setState({
      back: !this.state.back,
    });
  };

  flashController = () => {
    this.setState({
      flash: !this.state.flash,
    });
  };

  onSuccess = e => {
    Alert.alert('Result ', e.data, [
      {
        text: 'COPY',
        onPress: () => {
          Clipboard.setString(e.data);
        },
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
  };

  render() {
    // const [hasPermission, setHasPermission] = useState(null);
    // const [scanned, setScanned] = useState(false);
    // const [text, setText] = useState('Not yet scanned');
    // const askForCameraPermission = () => {
    //   (async () => {
    //     const { status } = await QRCodeScanner.req
    //   })
    // }
    return (
      <QRCodeScanner
        fadeIn={true}
        showMarker={true}
        reactivate={true}
        reactivateTimeout={3000}
        cameraType={this.state.back ? 'front' : 'back'}
        onRead={this.onSuccess}
        flashMode={
          this.state.flash
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
        topContent={
          <Text style={styles.centerText}>
            Go to{' '}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});
