import React, { useEffect, useState } from 'react';
import {
	Text,
	View,
	Image,
	TextInput,
	KeyboardAvoidingView,
	StyleSheet,
	Platform,
} from 'react-native';
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import Icon from '@expo/vector-icons/AntDesign';
import QRCode from 'react-native-qrcode-svg';
import { UserContext } from '../context/UserContext.js';
import { useContext } from 'react';
import * as firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainAttendee = (props) => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const image = require('../images/image.png');
	const { currentUser, setCurrentUser } = useContext(UserContext);
	const [qrcodePic, setQRCodePic] = useState(currentUser['attendeeEmail'])

	const logOut = async () => {
		
		props.navigation.navigate('Welcome')
		setQRCodePic("some string value")
		await AsyncStorage.removeItem('currentUser')
        //setCurrentUser(null);
	};

<<<<<<< HEAD
	console.warn(currentUser);
	console.warn(currentUser['attendeeEmail']);

	useEffect(() => {
        var user = firebase.auth().currentUser

        if (user != null) {
            user.providerData.forEach(function (profile) {
                //console.warn('provider uid ' + user.uid);
            });
        }
    }, []);
	

=======
>>>>>>> 1397f8022521c31db43f9585adfcc303a565e901
	return (
		<View style={styles.contentContainer}>
			<Text
				style={{
					fontSize: 20,
					fontFamily: 'Bold',
					alignSelf: 'center',
					marginTop: 50,
				}}>
				Attendee Main Page
			</Text>
			
			<QRCode 
				value= {qrcodePic}
				size={300} 
			/>

			<View style={styles.buttonContainer}>
				<Button
					style={styles.smallButton}
					title='Account'
					onPress={() =>
						props.navigation.navigate('ViewAccount_Attendee')
					}
				/>
				<Button
					style={styles.smallButton}
					title='Log Out'
					onPress={() => {
						logOut();
					}}
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
		justifyContent: 'space-evenly',
	},

	api: {
		width: 300,
		height: 300,
		backgroundColor: 'gray',
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

export default MainAttendee;
