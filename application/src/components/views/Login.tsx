import React, { useLayoutEffect } from 'react';
import {useState, useContext} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styles from '../../styles';
import {storeString} from '../../utils/asyncStorage';
import AppContext from '../../context/AppContext';
import { Button, Modal, Portal, Text } from 'react-native-paper';
import PhoneInput from 'react-native-phone-input';
import { loginKey } from '../../constants';


export default function Login(this: any) {
  const [number, setNumber] = useState('');
  const [isNumberValid, setIsNumberValid] = useState(true);
  const {login, setLogin} = useContext(AppContext);

  return (
    <Portal>
      <Modal
        style={styles.view}
        visible={login === undefined}
      >
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}>
            <View style={styles.modalContainer}>
              <View style={styles.modal}>
                <Text style={styles.title}>Enter your phone number</Text>
                <PhoneInput
                  style={{width: '100%'}}
                  ref={ref => this.phone = ref}
                  allowZeroAfterCountryCode={true}
                  initialCountry='fr'
                  initialValue='+33742424242'
                  autoFormat={true}
                  textProps={{
                      style: {
                          marginVertical: 15,
                          fontSize: 20,
                          textAlign: 'left',
                          color: '#000',
                          paddingVertical: 0
                      },
                  }}
                  flagStyle={{marginLeft: 55}}
                  onChangePhoneNumber={text => {
                    setIsNumberValid(this.phone.isValidNumber());
                    setNumber(this.phone.getValue());
                  }}
                  onPressFlag={() => {}}
                />
                <Button
                  style={{marginVertical: 15}}
                  mode='contained'
                  onPress={() => {
                    storeString(loginKey, number);
                    setLogin(number);
                  }}
                  disabled={!isNumberValid || number === ''}>
                    Login
                </Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  );
}
