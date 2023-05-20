import React from 'react';
import {useState, useEffect} from 'react';
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
import {getString} from '../../utils/asyncStorage';
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
import globalStyles from '../../styles/GlobalStyles';
import SparkMD5 from 'spark-md5';

function sendScan(json) {
  return new Promise(resolve => {
    axios
      .post('https://track-and-trace-api.vercel.app/api/scan', json, {
        headers: {'Content-Type': 'application/json'},
      })
      .then(res => res.status === 201 && res.data)
      .then(res => res.data)
      .then(resolve)
      .catch(console.error);
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
  const [timestamp, setTimestamp] = useState(Date.now());

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
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 120000},
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
                <Text>
                  <Text style={{fontWeight: 'bold'}}>Scan time : </Text>
                  <Text>
                    {locationLoaded
                      ? Date().toLocaleString()
                      : 'Determining current time...'}
                  </Text>
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
                          comment: comment,
                        };
                        dataToSend.id = SparkMD5.hash(
                          JSON.stringify(dataToSend),
                        );
                        setModalVisible(false);
                        sendScan(JSON.stringify(dataToSend)).then(() => {
                          resetData();
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
