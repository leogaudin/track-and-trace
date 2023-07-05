import React, {useState, useEffect} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import axios from 'axios';
import {getString, storeOfflineData} from '../../utils/asyncStorage';
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
import globalStyles from '../../styles/GlobalStyles';
import SparkMD5 from 'spark-md5';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';

export function sendScan(data) {
  return new Promise((resolve, reject) => {
    axios
      .post('https://track-and-trace-api.vercel.app/api/scan', data, {
        headers: {'Content-Type': 'application/json'},
      })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          showToast(
            'success',
            'Success!',
            'Scan sent successfully',
          );
          resolve(response.data);
        } else {
          reject(
            new Error(`Request failed with status code ${response.status}`),
          );
        }
      })
      .catch(error => {
        showToast(
          'error',
          'Error!',
          'Scan could not be sent',
        );
        reject(error);
      });
  });
}

export function showToast(type, text1, text2) {
  Toast.show({
    type: type,
    text1: text1,
    text2: text2,
    topOffset: 60,
  });
}

/**
 *
 * @param   modalVisible an array containing the value of the state hook
 * @param   setModalVisible an array containing the state hook
 * @param   data the JSON formatted content of the QR Code
 * @returns the modal view
 */
export default function Result({modalVisible, setModalVisible, data}) {
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState({});
  const [componentMounted, setComponentMounted] = useState(false);
  const [comment, setComment] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

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
            Alert.alert('Timeout', 'The location search has timed out.');
            break;
        }
      },
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 360000},
    );
  }

  function resetData() {
    setLocationLoaded(false);
    setComment('');
  }

  return (
    <>
      <Modal
        style={[globalStyles.view, {backgroundColor: 'black'}]}
        visible={modalVisible}
        transparent
        animationType={'slide'}
        hardwareAccelerated
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}>
            <View style={globalStyles.modalContainer}>
              <View style={globalStyles.modal}>
                <Text style={[globalStyles.title]}>
                  <Text>Box n°</Text>
                  <Text>{data}</Text>
                </Text>
                {locationLoaded && componentMounted ? (
                  <View
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
                        latitude: userLocation.coords.latitude,
                        longitude: userLocation.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}
                    />
                  </View>
                ) : (
                  <Text>Determining current location...</Text>
                )}
                <TextInput
                  editable
                  multiline
                  numberOfLines={4}
                  maxLength={140}
                  onChangeText={text => setComment(text)}
                  value={comment}
                  placeholder="Add a comment..."
                  style={[globalStyles.input, {height: 100}]}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <CheckBox
                    value={toggleCheckBox}
                    onValueChange={newValue => setToggleCheckBox(newValue)}
                    style={{marginRight: 10}}
                  />
                  <Text>Final destination</Text>
                </View>
                <View style={globalStyles.horizontal}>
                  <Pressable
                    style={globalStyles.button}
                    onPress={() => {
                      setModalVisible(false);
                      resetData();
                    }}>
                    <Text style={{textAlign: 'center'}}>Cancel</Text>
                  </Pressable>
                  <Pressable
                    disabled={!locationLoaded || !userLocation}
                    style={[globalStyles.mainButton]}
                    onPress={() => {
                      setLocationLoaded(false);
                      getString('user_number').then(user_id => {
                        const dataToSend = {
                          id: '',
                          boxId: data,
                          operatorId: user_id,
                          time: Date.now(),
                          location: userLocation,
                          finalDestination: toggleCheckBox,
                          comment: comment,
                        };
                        dataToSend.id = SparkMD5.hash(
                          JSON.stringify(dataToSend),
                        );
                        setModalVisible(false);
                        resetData();
                        NetInfo.fetch().then(state => {
                          if (state.isConnected) {
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
                        });
                      });
                    }}>
                    <Text
                      style={[
                        globalStyles.white,
                        {fontWeight: 'bold', textAlign: 'center'},
                      ]}>
                      Send
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}
