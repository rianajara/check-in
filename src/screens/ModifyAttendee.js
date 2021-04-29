import React from 'react';
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
import ViewAccount_Attendee from './ViewAccount_Attendee';
import Firebase from '../components/Firebase';
import * as firebase from 'firebase';
import PopUpModal from '../components/PopUpModal';
import InfoDropDown from '../components/InfoDropDown';
import { ScrollView } from 'react-native-gesture-handler';
import { UserContext } from '../context/UserContext.js';
import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import * as admin from 'firebase-admin';

const db = Firebase.firestore();
//const admin = require('firebase-admin');

const ModfiyAttendee = (props) => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [verifypass, verifyPassword] = React.useState('');
	const [updateClickCount, setUpdateClickCount] = React.useState(0);
	const [major, setMajor] = React.useState('');
	const [yearlevel, setyearLevel] = React.useState('');
	const { currentUser, setCurrentUser } = useContext(UserContext);

	const switchPage = () => {
		setTimeout(() => {
			props.navigation.navigate('MainAttendee');
		}, 750);
	};

	const deleteAccount = (props) => {
        var user = firebase.auth().currentUser
        if (user != null) {
            user.providerData.forEach(function (profile) {
            	user.delete();
            	var Email = (currentUser['attendeeEmail'])
            	props.navigation.navigate('Welcome');
                alert('User deleted.');
                return db.collection('Attendee').doc(Email).delete();
            });
       	 }	
       	 else{
       	 	props.navigation.navigate('Welcome');
       	 }
	};

	const updateAccount = (major,yearlevel) => {
		var Email = (currentUser['attendeeEmail'])
		var data = db.collection('Attendee').doc(Email)
		var user = firebase.auth().currentUser
		console.log(user)
		//console.log(collection)
		data.update({
			Major: major,
			YearLevel: yearlevel
		})
		.then(async() => {
			let userData = {
                    attendeeEmail: (currentUser['attendeeEmail']),
                    attendeeFirstName: (currentUser['attendeeFirstName']),
                    attendeeLastName: (currentUser['attendeeLastName']),
                    attendeeMajor: major,
                    attendeeYearLevel: yearlevel,
					userType: "attendee"
                }
                
                setCurrentUser(userData);
				AsyncStorage.setItem('currentUser', JSON.stringify(userData))
		    console.log("Document successfully updated!");
		})
	};


	return (
		<View style={styles.contentContainer} >
			<Text
				style={{
					fontSize: 20,
					fontFamily: 'Bold',
					alignSelf: 'center',
					marginTop: 115,
				}}>
				Modify Student Attendee{' '}
			</Text>
			<ScrollView >
				<View style={styles.inputContainer}>
					<Input
					
						label='First name:'
						placeholder='first name'
						leftIcon={
							<Icon
								name='user'
								size={24}
								color='black'
								style={styles.icon}
							/>
						}
						defaultValue={currentUser['attendeeFirstName']}
						color='gray'
						editable={false}
					/>

					<Input
						label='Last name:'
						placeholder='last name'
						leftIcon={
							<Icon
								name='user'
								size={24}
								color='black'
								style={styles.icon}
							/>
						}
						defaultValue={currentUser['attendeeLastName']}
						color='gray'
						editable={false}
					/>

					<Input
						label='Student email:'
						placeholder='youremail@address.com'
						leftIcon={
							<Icon
								name='mail'
								size={24}
								color='black'
								style={styles.icon}
							/>
						}
						defaultValue={currentUser['attendeeEmail']}
						color='gray'
						editable={false}
						// onChangeText={(text) => setEmail(text)}
						// value={email}
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
						label='Enter attendee year level:'
						placeholder='Year Level'
						leftIcon={
							<Icon
								name='mail'
								size={24}
								color='black'
								style={styles.icon}
							/>
						}
						onChangeText={(text) => setyearLevel(text)}
						defaultValue={currentUser['attendeeYearLevel']}
						//value={yearlevel}
					/>
//line 196
				</View>

				<View >
					<InfoDropDown 
						setDataType={(value) => setMajor(value)}
						dropDownType={'major'}
						defaultEventType={'major'}
						labelInfo="Choose a major">
						
					</InfoDropDown>
				</View>
				

			
			</ScrollView>
			<View style={styles.buttonContainer}>
				<Button
					style={styles.smallButton}
					title='Update'
					onPress={() => {
						updateAccount(major,yearlevel)
						setUpdateClickCount(updateClickCount + 1);
					}}
				/>

				<Button
					title = 'Delete Account'
					type = 'clear'
					onPress={() => {
						deleteAccount(props);
					}}
				/>
			</View>

			
			<PopUpModal
				popUpText={'Information Saved!'}
				updateClickCount={updateClickCount}
				switchPage={() => switchPage()}></PopUpModal>
				
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
	//console.warn('testing the validation');
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
		width: '99%',
		marginTop: 15,
		justifyContent: 'space-evenly',
	},
	buttonContainer: {
		justifyContent: 'space-evenly',
		height: '17%',
	},
	smallButton: {},
	icon: {
		marginRight: 15,
	},
});

export default ModfiyAttendee;
