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
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
import globalStyles from '../../styles/GlobalStyles';

/**
 *
 * @param   modalVisible an array containing the value of the state hook
 * @param   setModalVisible an array containing the state hook
 * @param   data the JSON formatted content of the QR Code
 * @returns the modal view
 */
export default function Result({
  modalVisible,
  setModalVisible,
  data,
}: {
  modalVisible: boolean;
  setModalVisible: any;
  data: object;
}) {
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState<any>({});
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
        transparent={true}
        animationType={'slide'}
        hardwareAccelerated={true}
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
                  <Text>{data['DN #' as keyof typeof data]}</Text>
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
                    {/* <MapView
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
                    /> */}
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
                  style={[globalStyles.input]}
                />
                <View style={globalStyles.horizontal}>
                  <Pressable
                    style={globalStyles.button}
                    onPress={() => {
                      setModalVisible(false);
                      resetData();
                    }}>
                    <Text>Cancel</Text>
                  </Pressable>
                  <Pressable
                    style={globalStyles.mainButton}
                    onPress={() => {
                      setLocationLoaded(false);
                      const dataToSend = {
                        id: data['DN #' as keyof typeof data],
                        location: userLocation,
                        comment: comment,
                      };
                      setModalVisible(false);
                      resetData();
                    }}>
                    <Text style={[globalStyles.white, {fontWeight: 'bold'}]}>
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
