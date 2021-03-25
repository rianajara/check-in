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
import AppContext from '@Components/AppContext';
import UserConstants from '@Constants/User';
import alert from '@Components/Alert';

const img_top = require('@Images/image.png');

const LoginAttendee = (props) => {
  const globalState = useContext(AppContext);
  const userType = globalState.auth.userType;

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const dev = () => globalState.login();

  const login = async () => {
    if (email.length <= 0) return alert('이메일을 입력해주세요.');
    else if (password.length <= 0) return alert('패스워드를 입력해주세요.');

    globalState.changeLoading(true);
    const user = await UserService.signIn(email, password, userType);
    globalState.changeLoading(false);
    if (!user) return alert('로그인 실패');
    globalState.login({ user });
  };

  return (
    <View style={styles.contentContainer}>
      <Image source={img_top} style={styles.smallImage} />
      <Text
        style={{
          fontSize: 20,
          fontFamily: 'Bold',
          alignSelf: 'center',
          marginTop: 50,
        }}>
        Attendee Sign In
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Student Email"
          leftIcon={
            <Icon name="mail" size={24} color="black" style={styles.icon} />
          }
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <Input
          placeholder="Enter password"
          secureTextEntry={true}
          leftIcon={
            <Icon name="lock" size={24} color="black" style={styles.icon} />
          }
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.smallButton} title="Log In" />
        <Button
          style={styles.smallButton}
          type="clear"
          title="Forgot Password"
        />
        <Button style={styles.smallButton} title="Dev" onPress={login} />
      </View>
    </View>
  );
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

export default LoginAttendee;
