import React from 'react';
import {Text, View, Image, TextInput,KeyboardAvoidingView, StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import Icon from '@expo/vector-icons/AntDesign';
import { NavigationEvents } from 'react-navigation';
import MainHost from './MainHost';
import Firebase from '../components/Firebase'
import * as firebase from 'firebase';

const db = Firebase.firestore();

const RegisterHost = (props) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [verifypass, verifyPassword] = React.useState("");
    const [uniqueID, setUniqueID] = React.useState("");
    const [firstName, setfirstName] = React.useState("");
    const [lastName, setlastName] = React.useState("");
    const [org, setOrg] = React.useState("");
    
    const image = require('../images/image.png');
    
    return (
        <View style={styles.contentContainer}>
           
            <Text style={{
                    fontSize: 20,
                    fontFamily:'Bold',
                    alignSelf: "center",
                    marginTop:50
                    
                }}
                >Register Organization Host </Text>
            <View style={styles.inputContainer}>
            	<Input
                    label = 'Enter host first name:'
                    placeholder='First Name'
                    leftIcon={
                        <Icon
                            name='mail'
                            size={24}
                            color='black'
                            style={styles.icon}
                        />
                    }
                    onChangeText={text => setfirstName(text)}
                    value={firstName}
                />

                <Input
                    label = 'Enter host last name:'
                    placeholder='Last Name'
                    leftIcon={
                        <Icon
                            name='mail'
                            size={24}
                            color='black'
                            style={styles.icon}
                        />
                    }
                    onChangeText={text => setlastName(text)}
                    value={lastName}
                />

                <Input
                    label = 'Enter the name of the organization:'
                    placeholder='example: AESB'
                    leftIcon={
                        <Icon
                            name='mail'
                            size={24}
                            color='black'
                            style={styles.icon}
                        />
                    }
                    onChangeText={text => setOrg(text)}
                    value={org}
                />
                <Input
                    label = 'Enter host email associated to organization:'
                    placeholder='youremail@address.com'
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
                    label='Enter password:'
                    placeholder='password'
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

                <Input
                    label='Re-type password:'
                    placeholder='confirm password'
                    secureTextEntry={true}
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='black'
                            style={styles.icon}
                        />
                    }
                    onChangeText={text => verifyPassword(text)}
                    value={verifypass}
                />

                <Input
                    label='Enter your 6 digit code'
                    placeholder='Unique ID'
                    //secureTextEntry={true}
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='black'
                            style={styles.icon}
                        />
                    }
                    onChangeText={text => setUniqueID(text)}
                    value={uniqueID}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button style={styles.smallButton}  title="Sign Up" 
                onPress={()=>signUpWithEmailPassword(email,password,props,verifypass,uniqueID,firstName,lastName,org)}
                
                />
            </View>
        </View>
        
    )
}

//onPress={()=>correct(email,password,verifypass)}

const signUpWithEmailPassword=(email,password,props,verifypass,uniqueID,firstName,lastName,org)=> {
  //var email = "test@example.com";
  //var password = "hunter2";
  // [START auth_signup_password]
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;

      const data = {
        email:user.email,
        UniqueID:uniqueID,
        Firstname:firstName,
        Lastname:lastName,
        Organization:org

        //uid:user.uid
    }
    //console.log(data)
      props.navigation.navigate('MainHost')
      alert("Successfuly registered.")
      return db.collection('Host').doc(email).set(data);
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = validate_Field(email,password,verifypass);
      //validate_Field(email,password,verifypass)
      // ..
    });
  // [END auth_signup_password]
}

// const createUser = async (token)=>{
//     var firestore = Firebase.firestore();
//     const data = {
//         name: 'void',
//         email: token.user.email
//     }
//     await firestore.collection('Users').doc(token.user.uid).set(userData);
// }

const validate_Field=(email, password, verifypass)=>{
    if(email==""){
        alert("Please enter an email address")
        return false
    }
    else if (password!=verifypass){
        alert("The password you entered does not match")
        return false
    }
    else if (password==""){
        alert("Please enter a password")
        return false
    }
    else if (verifypass==""){
        alert("Please re-enter password")
        return false
    }
    return true
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
        justifyContent:'space-around',
        height: '40%',
    },
    smallButton: {
    },
    icon: {
        marginRight: 15
    }
})

export default RegisterHost;