import React from 'react';
import {
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import { Button, Text, Input } from 'react-native-elements';
import Firebase from '../components/Firebase';
import * as firebase from 'firebase';

const ForgotPassword = (props) => {
  const [email, setEmail] = React.useState('');
  const sendEmail = async () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(async (user) => {
        alert('password link is successfully sent.');
        setEmail('');
        props.navigation.pop();
      });
  };

  return (
    <View style={styles.contentContainer}>
      <View>
        <Text h1>Password Reset</Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text h4>Please Enter Your Email address</Text>
        <Text h4>for reset your password</Text>
      </View>

      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text h5>Your Email Address : </Text>
        <Input
          placeholder=""
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View
        style={{
          marginTop: 20,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          type="outline"
          title="Sent Link for Reset"
          onPress={sendEmail}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#fff7d5',
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 70,
    justifyContent: 'flex-start',
  },
  smallButton: {
    borderColor: 'gray',
  },
});

export default ForgotPassword;
