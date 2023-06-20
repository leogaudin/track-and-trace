import React from 'react';
import { Modal, Text, TouchableOpacity, Dimensions, Pressable, View } from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';

const InfoModal = ({ visible, onClose, title, text, children }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <Pressable style={styles.modalContainer} onPress={onClose}>
        <View style={styles.modalContent}>
		  <Text style={[GlobalStyles.title]}>
			{title}
		  </Text>
          {children}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <View style={[GlobalStyles.button]}>
              <Text style={[{ fontWeight: 'bold', textAlign: 'center' }]}>
                Close
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

const { width } = Dimensions.get('window');

const styles = {
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 42,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 16,
    width: width - 40,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
  },
};

export default InfoModal;
