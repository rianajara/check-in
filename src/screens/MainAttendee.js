import React, { useEffect } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainAttendee = (props) => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const image = require('../images/image.png');
	const { currentUser, setCurrentUser } = useContext(UserContext);

	const logOut = async () => {
		setCurrentUser(null);
        await AsyncStorage.removeItem('currentUser')
	};

	console.warn(currentUser);
	console.warn(currentUser['attendeeEmail']);
	

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
				value= {currentUser['attendeeEmail']}
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
						logOut(), props.navigation.navigate('Welcome');
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
