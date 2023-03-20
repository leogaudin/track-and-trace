import React, {useState} from 'react';
import {Alert, Modal, Pressable, Text, View} from 'react-native';
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
              <Text>{data["DN #" as keyof typeof data]}</Text>
            </Text>
            <Text>
              <Text style={{fontWeight: 'bold'}}>Scan time : </Text>
              <Text>{Date().toLocaleString()}</Text>
            </Text>
            <View style={globalStyles.horizontal}>
              <Pressable
                style={globalStyles.button}
                onPress={() => setModalVisible(false)}>
                <Text>Cancel</Text>
              </Pressable>
              <Pressable
                style={globalStyles.mainButton}
                onPress={() => setModalVisible(false)}>
                <Text style={[globalStyles.white, {fontWeight: 'bold'}]}>Send</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
