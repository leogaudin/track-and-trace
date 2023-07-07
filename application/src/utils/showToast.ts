import Toast from 'react-native-toast-message';

export function showToast(type: string, title: string, text: string) {
  Toast.show({
    type: type,
    text1: title,
    text2: text,
    topOffset: 60,
  });
}
