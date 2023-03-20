import React, {useState, useEffect} from 'react';
import {Alert, Modal, Pressable, Text, View} from 'react-native';
import GetLocation, {Location} from 'react-native-get-location';
import MapView from 'react-native-maps';
import globalStyles from '../../styles/GlobalStyles';

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
  });

  if (!locationLoaded) {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        setUserLocation(location);
        setLocationLoaded(true);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
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
                  ? new Date(userLocation.time).toLocaleString()
                  : 'Determining current time...'}
              </Text>
            </Text>
            {locationLoaded && componentMounted ? (
              // <MapView
              //   // initialRegion={{
              //   //   latitude: 36.69933699173192,
              //   //   longitude: -4.438967710686544,
              //   //   latitudeDelta: 0.4,
              //   //   longitudeDelta: 0.3,
              //   // }}
              //   style={{flex: 1,}}
              // />
              <Text>
                <Text style={{fontWeight: 'bold'}}>Latitude : </Text>
                <Text>{userLocation.latitude}</Text>
              </Text>
            ) : (
              <Text>Determining current location.../</Text>
            )}
            <View style={globalStyles.horizontal}>
              <Pressable
                style={globalStyles.button}
                onPress={() => setModalVisible(false)}>
                <Text>Cancel</Text>
              </Pressable>
              <Pressable
                style={globalStyles.mainButton}
                onPress={() => setModalVisible(false)}>
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
