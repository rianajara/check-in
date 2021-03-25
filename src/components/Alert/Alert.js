import { Alert } from 'react-native';

const AlertComponent = (title, cb = () => {}) => {
  return Alert.alert(
    title,
    '',
    [
      {
        text: 'Yes',
        onPress: () => {
          cb();
        },
      },
    ],
    { cancelable: false }
  );
};

export default AlertComponent;
