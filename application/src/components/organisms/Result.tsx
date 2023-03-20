import React from 'react';
import {Alert, Modal, Pressable, Text, View} from 'react-native';
import globalStyles from '../../styles/GlobalStyles';

export default function Result({
  modalVisible,
  setModalVisible,
  data,
}: {
  modalVisible: boolean;
  setModalVisible: any;
  data: string;
}) {
  return (
    <>
      <Modal
        style={[globalStyles.view]}
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
            <Text>{data}</Text>
            <View style={globalStyles.horizontal}>
              <Pressable
                style={globalStyles.button}
                onPress={() => setModalVisible(false)}>
                <Text>Cancel</Text>
              </Pressable>
              <Pressable
                style={globalStyles.mainButton}
                onPress={() => setModalVisible(false)}>
                <Text style={{fontWeight: 'bold'}}>Send</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
