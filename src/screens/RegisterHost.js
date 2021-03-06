import React, { useState } from 'react';
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
import { NavigationEvents } from 'react-navigation';
import MainHost from './MainHost';
import PopUpModal from '../components/PopUpModal';
import Firebase from '../components/Firebase';
import * as firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';
import { UserContext } from '../context/UserContext.js';
import { useContext } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const db = Firebase.firestore();

const RegisterHost = (props) => {
	const { currentUser, setCurrentUser } = useContext(UserContext);
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [verifypass, verifyPassword] = React.useState('');
	const [uniqueID, setUniqueID] = React.useState('');
	const [firstName, setfirstName] = React.useState('');
	const [lastName, setlastName] = React.useState('');
	const [org, setOrg] = React.useState('');
	const [updateClickCount, setUpdateClickCount] = useState(0);
	const [popUpText, setPopUpText] = useState(null);
	const [registered, setRegistered] = useState(false);

	const image = require('../images/image.png');

	const switchPage = () => {
		if(registered === true){
			props.navigation.navigate('MainHost')
		}
		
   }

	const signUpWithEmailPassword = (
		email,
		password,
		props,
		verifypass,
		uniqueID,
		firstName,
		lastName,
		org
	) => {
		//var email = "test@example.com";
		//var password = "hunter2";
		// [START auth_signup_password]
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(async (userCredential) => {
				// Signed in
				var user = userCredential.user;

				const data = {
					Email: user.email,
					UniqueID: uniqueID,
					FirstName: firstName,
					LastName: lastName,
					Organization: org,

					//uid:user.uid
				};
				let userData = {
					hostEmail: email,
					hostFirstName: firstName,
					hostLastName: lastName,
					hostOrg: org,
					hostUniqueID: uniqueID,
					userType: "host"
				}
				setCurrentUser(userData);
				//console.log(data)
				await AsyncStorage.setItem('currentUser', JSON.stringify(userData))
				const orgRef = db.collection('OrgEvents').doc(org);
				const doc = await orgRef.get();
				if (!doc.exists) {
					setPopUpText('Host Registered');
					

					// Add an club name based on information given
					db.collection('OrgEvents').doc(org).set(
						{
							ClubName: org,
						},
						{ merge: true }
					);
					props.navigation.navigate('MainHost');
					//alert('Successfuly registered.');	
					setUpdateClickCount(updateClickCount + 1);
				} 

				return db.collection('Host').doc(org).set(data);
				// ...
			})
			.catch((error) => {
				
				var errorCode = error.code;
				var errorMessage = validate_Field(email, password, verifypass);
				//validate_Field(email,password,verifypass)
				// ..
			});
		// [END auth_signup_password]
	};

	// const createUser = async (token)=>{
	//     var firestore = Firebase.firestore();
	//     const data = {
	//         name: 'void',
	//         email: token.user.email
	//     }
	//     await firestore.collection('Users').doc(token.user.uid).set(userData);
	// }

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

	return (
		<View style={styles.contentContainer}>
			<Text
				style={{
					fontSize: 20,
					fontFamily: 'Bold',
					alignSelf: 'center',
					marginTop: 50,
					marginBottom: 65,
					paddingTop: 10
				}}>
				Register Organization Host{' '}
			</Text>

			<KeyboardAvoidingView
				style={styles.inputContainer}
				behavior={Platform.OS === 'ios' ? "padding" : null}
				>
				<View>
					<ScrollView style={{paddingBottom: 50, paddingTop: 15}}>
						<Input
							label='Enter host first name:'
							placeholder='First Name'
							leftIcon={
								<Icon
									name='mail'
									size={24}
									color='black'
									style={styles.icon}
								/>
							}
							onChangeText={(text) => setfirstName(text)}
							value={firstName}
						/>

						<Input
							label='Enter host last name:'
							placeholder='Last Name'
							leftIcon={
								<Icon
									name='mail'
									size={24}
									color='black'
									style={styles.icon}
								/>
							}
							onChangeText={(text) => setlastName(text)}
							value={lastName}
						/>

						<Input
							label='Enter the name of the organization:'
							placeholder='Organization Name'
							leftIcon={
								<Icon
									name='mail'
									size={24}
									color='black'
									style={styles.icon}
								/>
							}
							onChangeText={(text) => setOrg(text)}
							value={org}
						/>
						<Input
							label='Enter host email associated to organization:'
							placeholder='youremail@address.com'
							leftIcon={
								<Icon
									name='mail'
									size={24}
									color='black'
									style={styles.icon}
								/>
							}
							onChangeText={(text) => setEmail(text)}
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
							onChangeText={(text) => setPassword(text)}
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
							onChangeText={(text) => verifyPassword(text)}
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
							onChangeText={(text) => setUniqueID(text)}
							value={uniqueID}
						/>
					</ScrollView>
				</View>
				<PopUpModal
							style={{ height: 0, padding: 0, margin: 0 }}
							popUpText={popUpText}
							updateClickCount={updateClickCount}
							switchPage={() => switchPage()}></PopUpModal>
			</KeyboardAvoidingView>

			<View style={styles.buttonContainer}>
				<Button
					style={styles.smallButton}
					title='Sign Up'
					onPress={() =>
						signUpWithEmailPassword(
							email,
							password,
							props,
							verifypass,
							uniqueID,
							firstName,
							lastName,
							org
						)
					}
				/>
			</View>
			
		</View>
	);
};

//onPress={()=>correct(email,password,verifypass)}
const styles = StyleSheet.create({
	contentContainer: {
		backgroundColor: '#fff7d5',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-evenly',
		paddingTop: 95,
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
		marginTop: 40,
		height: '40%',
		paddingBottom: 30
	},
	smallButton: {},
	icon: {
		marginRight: 15,
	},
});

export default RegisterHost;
