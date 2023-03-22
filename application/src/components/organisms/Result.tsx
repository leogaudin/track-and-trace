import React, {useState, useEffect} from 'react';
import {Alert, Modal, Pressable, Text, View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
import globalStyles from '../../styles/GlobalStyles';
import {PERMISSIONS} from 'react-native-permissions';

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
        // switch (error.code) {
        //   case 1:
        //     Alert.alert(
        //       'Permission denied',
        //       'We need your location to know where and when the QR code are scanned. Nothing more.',
        //     );
        // }
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 120000},
    );
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
        <View style={globalStyles.modalContainer}>
          <View style={globalStyles.modal}>
            <Text style={globalStyles.title}>Scan result</Text>
            <Text>
              <Text style={{fontWeight: 'bold'}}>Delivery note n°</Text>
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
              <View style={{height: 100, width: '100%'}}>
                <MapView
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
            <View style={globalStyles.horizontal}>
              <Pressable
                style={globalStyles.button}
                onPress={() => {
                  setModalVisible(false);
                  setLocationLoaded(false);
                }}>
                <Text>Cancel</Text>
              </Pressable>
              <Pressable
                style={globalStyles.mainButton}
                onPress={() => {
                  setModalVisible(false);
                  setLocationLoaded(false);
                }}>
                <Text style={[globalStyles.white, {fontWeight: 'bold'}]}>
                  Send
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
