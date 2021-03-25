import React, { useContext } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import Icon from '@expo/vector-icons/AntDesign';
import UserService from '@Services/User';
import UserConstants from '@Constants/User';
import AppContext from '@Components/AppContext';
import alert from '@Components/Alert';

const RegisterAttendee = (props) => {
  const { navigation } = props;
  const globalState = useContext(AppContext);
  const userType = globalState.auth.userType;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [verifypass, verifyPassword] = React.useState('');

  const image = require('../images/image.png');

  const signUp = async () => {
    if (!validate_Field(email, password, verifypass)) return;

    globalState.changeLoading(true);

    const res = await UserService.signUp(email, password, userType);

    if (!res) return alert('가입 실패');
    else {
      globalState.changeLoading(false);
      navigation.popToTop();
    }
  };

  return (
    <View style={styles.contentContainer}>
      <View style={styles.inputContainer}>
        <Input
          label="Enter student email:"
          placeholder="youremail@address.com"
          leftIcon={
            <Icon name="mail" size={24} color="black" style={styles.icon} />
          }
          onChangeText={(text) => setEmail(text)}
          value={email}
        />

        <Input
          label="Enter password:"
          placeholder="password"
          secureTextEntry={true}
          leftIcon={
            <Icon name="lock" size={24} color="black" style={styles.icon} />
          }
          onChangeText={(text) => setPassword(text)}
          value={password}
        />

        <Input
          label="Re-type password:"
          placeholder="confirm password"
          secureTextEntry={true}
          leftIcon={
            <Icon name="lock" size={24} color="black" style={styles.icon} />
          }
          onChangeText={(text) => verifyPassword(text)}
          value={verifypass}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.smallButton} title="Sign Up" onPress={signUp} />
      </View>
    </View>
  );
};

const validate_Field = (email, password, verifypass) => {
  if (email == '') {
    alert('Please enter an email address');
    return false;
  } else if (password != verifypass) {
    alert('The password you entered does not match');
    return false;
  } else if (password == '') {
    alert('Please enter a password');
    return false;
  } else if (verifypass == '') {
    alert('Please re-enter password');
    return false;
  }
  return true;
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#fff7d5',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  smallImage: {
    marginTop: 60,
    width: 200,
    height: 200,
  },
  inputContainer: {
    width: '90%',
    marginTop: 50,
    justifyContent: 'space-evenly',
  },
  buttonContainer: {
    justifyContent: 'space-around',
    height: '40%',
  },
  smallButton: {},
  icon: {
    marginRight: 15,
  },
});

export default RegisterAttendee;
