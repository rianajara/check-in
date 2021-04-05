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
import Icon from '@expo/vector-icons/AntDesign';
import AppContext from '@Components/AppContext';
import UserConstants from '@Constants/User';

const img_top = require('@Images/image.png');

const Register = (props) => {
  const { navigation } = props;
  const globalState = useContext(AppContext);

  const pushRegisterHost = () => {
    globalState.changeUserType(UserConstants.userType.HOST);
    navigation.navigate('registerHost');
  };
  const pushRegisterAttendee = () => {
    globalState.changeUserType(UserConstants.userType.ATTENDEE);
    navigation.navigate('registerAttendee');
  };

  return (
    <View style={styles.contentContainer}>
      <Image source={img_top} style={styles.smallImage} />
      <Text
        style={{
          fontSize: 20,
          fontFamily: 'Bold',
          alignSelf: 'center',
          marginTop: 25,
          marginBottom: 25,
        }}>
        Create an account
      </Text>
      <Text
        style={{
          fontSize: 15,
          fontFamily: 'Thin',
          textAlign: 'center',
          marginTop: 5,
          opacity: 0.6,
          //marginBottom:5
        }}>
        Register account as:
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.smallButton}
          title="Organization"
          onPress={pushRegisterHost}
        />
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'Thin',
            textAlign: 'center',
            opacity: 0.6,
            //marginBottom:5
          }}>
          or
        </Text>
        <Button
          style={styles.smallButton}
          title="Student Attendee"
          onPress={pushRegisterAttendee}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#fff7d5',
    flex: 1,
    alignItems: 'center',
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
    justifyContent: 'space-evenly',
    height: '30%',
  },
  smallButton: {},
  icon: {
    marginRight: 15,
  },
});

export default Register;
