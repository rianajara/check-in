import React, { useContext } from 'react';
import { Text, View, Image, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from '@expo/vector-icons/AntDesign';
import AppContext from '@Components/AppContext';
import UserConstants from '@Constants/User';

const img_top = require('@Images/image.png');

const Welcome = (props) => {
  const { navigation } = props;
  const globalState = useContext(AppContext);

  const pushLoginHost = () => {
    globalState.changeUserType(UserConstants.userType.HOST);
    navigation.navigate('loginHost');
  };
  const pushLoginAttendee = () => {
    globalState.changeUserType(UserConstants.userType.ATTENDEE);
    navigation.navigate('loginAttendee');
  };
  const pushRegister = () => navigation.navigate('register');

  return (
    <View style={{ backgroundColor: '#fff7d5', height: '100%' }}>
      <Image
        source={img_top}
        style={{ width: '80%', height: '50%', alignSelf: 'center' }}
      />
      <Text
        style={{
          fontSize: 30,
          fontFamily: 'Bold',
          alignSelf: 'center',
        }}>
        Start checking in now!
      </Text>

      <Text
        style={{
          fontSize: 15,
          fontFamily: 'Regular',
          textAlign: 'center',
          marginTop: 5,
          opacity: 0.6,
        }}>
        Welcome to the check-in app.
      </Text>

      <View style={{ marginTop: 30 }}>
        {/* style={{
                    marginHorizontal:55,
                    alignItems:"center",
                    justifyContent:"center",
                    marginTop:30,
                    backgroundColor:"#003060",
                    paddingVertical:10,
                    borderRadius:23
                }}> */}
        <Button title="Log in as host" onPress={pushLoginHost} />
      </View>

      <View style={{ marginTop: 30 }}>
        {/* style={{
                    marginHorizontal:55,
                    alignItems:"center",
                    justifyContent:"center",
                    marginTop:30,
                    backgroundColor:"#003060",
                    paddingVertical:10,
                    borderRadius:23
                }}> */}
        <Button title="Log in as attendee" onPress={pushLoginAttendee} />
      </View>

      <Text
        onPress={pushRegister}
        style={{
          alignSelf: 'center',
          color: '#288cdc',
          fontFamily: 'SemiBold',
          paddingVertical: 30,
        }}>
        New User
      </Text>
    </View>
  );
};

export default Welcome;
