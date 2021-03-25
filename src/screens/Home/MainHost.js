import React from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import Icon from '@expo/vector-icons/AntDesign';
import Footer from '@Components/Footer';
const MainHost = (props) => {
  // const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");
  return (
    <View style={styles.contentContainer}>
      <Text
        style={{
          fontSize: 20,
          fontFamily: 'Bold',
          alignSelf: 'center',
          marginTop: 50,
        }}>
        Organization Host Sign In
      </Text>

      <View style={styles.buttonContainer}>
        <Button style={styles.smallButton} title="Check In Attendees" />
        <Button
          style={styles.smallButton}
          title="Create an Event"
          onPress={() => props.navigation.navigate('CreateEvent')}
        />
        <Button
          style={styles.smallButton}
          title="View Events"
          onPress={() => props.navigation.navigate('ViewEvents')}
        />
      </View>

      <Footer />
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
    height: '30%',
  },
  smallButton: {},
  icon: {
    marginRight: 15,
  },
});

export default MainHost;
