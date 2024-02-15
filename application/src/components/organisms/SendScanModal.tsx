import React, {useState, useEffect, useContext} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
import styles from '../../styles';
import SparkMD5 from 'spark-md5';
import { showToast } from '../../utils/showToast';
import { Modal, Text, TextInput, Portal, Button } from 'react-native-paper';
import { sendScan } from '../../utils/api';
import AppContext from '../../context/AppContext';

interface ResultProps {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  data: string;
}

/**
 *
 * @param   modalVisible an array containing the value of the state hook
 * @param   setModalVisible an array containing the state hook
 * @param   data the JSON formatted content of the QR Code
 * @returns the modal view
 */
export default function SendScanModal({modalVisible, setModalVisible, data}: ResultProps) {
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState<GeolocationResponse>();
  const [componentMounted, setComponentMounted] = useState(false);
  const [comment, setComment] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const {login, hasInternetConnection, offlineData, setOfflineData} = useContext(AppContext);

  useEffect(() => {
    setComponentMounted(true);
  }, []);

  if (!locationLoaded && componentMounted) {
    Geolocation.getCurrentPosition(
      position => {
        setUserLocation(position);
        setLocationLoaded(true);
      },
      error => {
        switch (error.code) {
          case 3:
            showToast('error', 'Timeout', 'The location search has timed out.');
            break;
        }
      },
      {enableHighAccuracy: false, timeout: 10000, maximumAge: 10000},
    );
  }

  function resetData() {
    setLocationLoaded(false);
    setComment('');
    setToggleCheckBox(false);
  }

  const storeOfflineData = (scannedData: any) => {
    const updatedOfflineData = [...offlineData, scannedData];
    setOfflineData(updatedOfflineData);
  };

  return (
    <Portal>
      <Modal
        style={[styles.view]}
        visible={modalVisible}
      >
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modal}>
                <Text style={[styles.title]}>
                  Box n°{data}
                </Text>
                {locationLoaded && componentMounted ? (
                  Platform.OS !== 'android'
                  ? <View
                    style={{
                      height: 150,
                      width: '100%',
                      margin: 10,
                      borderRadius: 10,
                      overflow: 'hidden',
                    }}>
                    <MapView
                      pitchEnabled={false}
                      rotateEnabled={false}
                      scrollEnabled={false}
                      zoomEnabled={false}
                      style={{flex: 1}}
                      initialRegion={{
                        latitude: userLocation!.coords.latitude,
                        longitude: userLocation!.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}
                    />
                  </View>
                  : false
                ) : (
                  <Text>Determining current location...</Text>
                )}
                <TextInput
                  mode='outlined'
                  value={comment}
                  onChangeText={text => setComment(text)}
                  style={{width: '100%'}}
                  placeholder='Add a comment...'
                  maxLength={140}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 15,
                  }}>
                  <CheckBox
                    value={toggleCheckBox}
                    onValueChange={newValue => setToggleCheckBox(newValue)}
                    style={{marginRight: 10}}
                    tintColors={{true: '#007AFF', false: '#C7C7CC'}}
                  />
                  <Text>Mark as received (HT only)</Text>
                </View>
                <View style={[styles.horizontal,]}>
                  <Button
                    mode='outlined'
                    style={{margin: 5}}
                    onPress={() => {
                      setModalVisible(false);
                      resetData();
                    }}>
                    Cancel
                  </Button>
                  <Button
                    disabled={!locationLoaded || !userLocation}
                    mode='contained'
                    style={{margin: 5}}
                    onPress={() => {
                      setLocationLoaded(false);
                      const dataToSend = {
                        id: '',
                        boxId: data,
                        operatorId: login,
                        time: Date.now(),
                        location: userLocation,
                        markedAsReceived: toggleCheckBox,
                        comment: comment,
                      };
                      dataToSend.id = SparkMD5.hash(JSON.stringify(dataToSend));
                      setModalVisible(false);
                      resetData();
                      if (hasInternetConnection) {
                        sendScan(dataToSend)
                          .catch(err => {
                            storeOfflineData(dataToSend);
                          });
                      } else {
                        storeOfflineData(dataToSend);
                        showToast(
                          'info',
                          'No internet connection',
                          'Scan will be sent when connection is restored',
                        );
                      }
                    }}>
                      Send
                  </Button>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  );
}
