import React from 'react';
import {Text, View, Image, TextInput,KeyboardAvoidingView, StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import Icon from '@expo/vector-icons/AntDesign';
import Firebase from '../components/Firebase'
import * as firebase from 'firebase';

const LoginAttendee = (props) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const image = require('../images/image.png');
    return (
        <View style={styles.contentContainer}>
            <Image source={image} style={styles.smallImage} />
            <Text style={{
                    fontSize: 20,
                    fontFamily:'Bold',
                    alignSelf: "center",
                    marginTop:50
                    
                }}
                >Attendee Sign In</Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder='Student Email'
                    leftIcon={
                        <Icon
                            name='mail'
                            size={24}
                            color='black'
                            style={styles.icon}
                        />
                    }
                    onChangeText={text => setEmail(text)}
                    value={email}
                />
                <Input
                    placeholder='Enter password'
                    secureTextEntry={true}
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='black'
                            style={styles.icon}
                        />
                    }
                    onChangeText={text => setPassword(text)}
                    value={password}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button style={styles.smallButton} title="Log In" onPress={() => signInWithEmailPassword(email,password,props)} />
                <Button style={styles.smallButton} type="clear" title="Forgot Password" />
                <Button style={styles.smallButton} title = "Dev" onPress ={()=>props.navigation.navigate('MainAttendee')}/>
            </View>
        </View>
        
    )
}

const signInWithEmailPassword = async(email,password,props)=> {
  //var email = "test@example.com";
  //var password = "hunter2";
  // [START auth_signin_password]
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      alert("Successfuly logged in.")
      props.navigation.navigate('MainAttendee')
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Check your password and try again.")
    });
  // [END auth_signin_password]
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor:"#fff7d5",
        flex: 1,
        alignItems: 'center',
        justifyContent:'space-evenly'  
    },
    smallImage: {
        marginTop:60,
        width: 200,
        height: 200,
    },
    inputContainer: {
        width: '90%',
        marginTop: 50,
        justifyContent:'space-evenly',
        
    },
    buttonContainer: {
        marginTop: 15,
		justifyContent: 'space-around',
		height: '35%',
		marginBottom: 50,
    },
    smallButton: {
    },
    icon: {
        marginRight: 15
    }
})

export default LoginAttendee;