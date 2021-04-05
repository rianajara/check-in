import { Alert } from 'react-native';

const Confirm = (title, cb = () => {}) => {
  return Alert.alert(
    title,
    '',
    [
      {
        text: 'Yes',
        onPress: () => {
          cb(true);
        },
      },
      {
        text: 'No',
        onPress: () => {
          cb(false);
        },
      },
    ],
    { cancelable: true }
  );
};

export default Confirm;
