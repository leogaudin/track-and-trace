import React from 'react';
import { TouchableOpacity, Dimensions, View } from 'react-native';
import styles from '../../styles';
import { Modal, Portal, Text, Button } from 'react-native-paper';

interface InfoModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose, title, children }) => {
  return (
    <Portal>
      <Modal visible={visible} style={styles.view}>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <Text style={styles.title}>
                {title}
              </Text>
              {children}
              <TouchableOpacity onPress={onClose}>
                <Button
                  mode='outlined'
                  style={{margin: 20}}
                >
                    Close
                </Button>
              </TouchableOpacity>
            </View>
          </View>
      </Modal>
    </Portal>
  );
};

export default InfoModal;
