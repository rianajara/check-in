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
import ViewAccount_Host from './ViewAccount_Host';
import Firebase from '../components/Firebase';
import * as firebase from 'firebase';
import PopUpModal from '../components/PopUpModal';

const ModifyHost = (props) => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [verifypass, verifyPassword] = React.useState('');
	const [updateClickCount, setUpdateClickCount] = React.useState(0);
	const [uniqueID, setUniqueID] = React.useState("");

    const switchPage = () => {
		setTimeout(() => {
			props.navigation.navigate('ViewAccount_Host');
		}, 750);
        
        
	};

	return (
		<View style={styles.contentContainer}>
			<Text
				style={{
					fontSize: 20,
					fontFamily: 'Bold',
					alignSelf: 'center',
					marginTop: 115,
				}}>
				Modify Host Account{' '}
			</Text>
			<View style={styles.inputContainer}>
				<Input
					label="Enter host's first name:"
					placeholder='first name'
					leftIcon={
						<Icon
							name='user'
							size={24}
							color='black'
							style={styles.icon}
						/>
					}
					onChangeText={() => {}}
				/>

				<Input
					label="Enter host's last name:"
					placeholder='last name'
					leftIcon={
						<Icon
							name='user'
							size={24}
							color='black'
							style={styles.icon}
						/>
					}
					onChangeText={() => {}}
				/>

				<Input
					label='Enter preferred organization email:'
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
                    onChangeText={text => setUniqueID(text)}
                    value={uniqueID}
                />
			</View>
			<View style={styles.buttonContainer}>
				<Button
					style={styles.smallButton}
					title='Update'
					onPress={() => {
						signUpWithEmailPassword(
							email,
							password,
							props,
							verifypass
						);
						setUpdateClickCount(updateClickCount + 1);
					}}
				/>
			</View>
			<PopUpModal popUpText={"Information Saved!"} updateClickCount={updateClickCount} switchPage={() => switchPage()}></PopUpModal>
		</View>
	);
};

const signUpWithEmailPassword = (email, password, props, verifypass) => {
	//var email = "test@example.com";
	//var password = "hunter2";
	// [START auth_signup_password]
	firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then((userCredential) => {
			// Signed in
			var user = userCredential.user;
			alert('Successfuly registered.');
            
			
			
			//props.navigation.navigate('MainAttendee');
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
		marginTop: 100,
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

export default ModifyHost;
