import React from 'react';
import {useState, useEffect, useRef} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles from '../../styles/GlobalStyles';
import PhoneInput from 'react-native-phone-number-input';

export default function Login({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: any;
}) {
  const [componentMounted, setComponentMounted] = useState(false);
  const [number, setNumber] = useState('');
  const [formattedNumber, setFormattedNumber] = useState('');
  const [isNumberValid, setIsNumberValid] = useState(true);
  const phoneInput = useRef<PhoneInput>(null);

  useEffect(() => {
    setComponentMounted(true);
  }, []);

  const storeNumber = async (value: string) => {
    try {
      await AsyncStorage.setItem('user_number', value);
    } catch (e) {
      // saving error
    }
  };

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
                <Text style={globalStyles.title}>Enter your phone number</Text>
                <Text
                  style={[
                    {
                      color: '#E1000F',
                      fontStyle: 'italic',
                      textAlign: 'center',
                      padding: 10,
                    },
                    isNumberValid ? {display: 'none'} : {display: 'flex'},
                  ]}>
                  Invalid number. Please enter it without the country code, or
                  check that it is not too short or too long.
                </Text>
                <PhoneInput
                  ref={phoneInput}
                  defaultValue={number}
                  defaultCode="SL"
                  layout="first"
                  onChangeText={text => {
                    /**
                     * Altough this part may not seem concise, it is necessary to get
                     * real time updates on the validity of the number.
                     */
                    setNumber(text);
                    let formatted =
                      '+' + phoneInput.current?.getCallingCode() + text;
                    setFormattedNumber(formatted);
                    let isValid = formatted.match(
                      /^\+?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4,6}$/im,
                    );
                    setIsNumberValid(isValid === null ? false : true);
                  }}
                  textInputStyle={[
                    isNumberValid
                      ? globalStyles.input
                      : globalStyles.invalidInput,
                  ]}
                  containerStyle={{borderRadius: 10}}
                  placeholder={'Number'}
                  withShadow
                  autoFocus
                />
                <Pressable
                  style={[
                    globalStyles.mainButton,
                    !isNumberValid || number === ''
                      ? globalStyles.disabled
                      : {opacity: 1},
                  ]}
                  onPress={() => {
                    storeNumber(formattedNumber);
                    setModalVisible(false);
                  }}
                  disabled={!isNumberValid || number === ''}>
                  <Text
                    style={[
                      globalStyles.white,
                      {fontWeight: 'bold', textAlign: 'center'},
                    ]}>
                    Login
                  </Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}
