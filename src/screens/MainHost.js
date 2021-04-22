import React from 'react';
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
import { UserContext } from '../context/UserContext.js';
import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

//work on adding functionality to log user out

const MainHost = (props) => {
	// const [email, setEmail] = React.useState("");
	// const [password, setPassword] = React.useState("");
	const image = require('../images/image.png');
	const { currentUser, setCurrentUser } = useContext(UserContext);

	const logOut = async () => {
		
        await AsyncStorage.removeItem('currentUser')
        setCurrentUser(null);
	};
	return (
		<View style={styles.contentContainer}>
			<Text
				style={{
					fontSize: 20,
					fontFamily: 'Bold',
					alignSelf: 'center',
					marginTop: 50,
				}}>
				Organization Host Main Page
			</Text>

			<View style={styles.buttonContainer}>
				<Button
					style={styles.smallButton}
					title='Create an Event'
					onPress={() => props.navigation.navigate('CreateEvent')}
				/>
				<Button
					style={styles.smallButton}
					title='View Events'
					onPress={() => props.navigation.navigate('ViewEvents')}
				/>
				<Button
					style={styles.smallButton}
					title='Account'
					onPress={() =>
						props.navigation.navigate('ViewAccount_Host')
					}
				/>
				<Button
					style={styles.smallButton}
					title='Log Out'
					onPress={() => {
						 logOut(), props.navigation.navigate('Welcome')
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
