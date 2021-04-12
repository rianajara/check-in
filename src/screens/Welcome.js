import React, { useEffect } from 'react';
import { Text, View, Image, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import PopUpModal from '../components/PopUpModal';
import Icon from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Welcome extends React.Component {
	async componentDidMount() {
		this.userTest();
	}

	updateClickCount = 0;

	userTest = async () => {
		let user = await AsyncStorage.getItem('currentUser');

		if (user !== null) {
			
			user = JSON.parse(await AsyncStorage.getItem('currentUser'));
			
			if (user.userType === 'host') {
                alert("Welcome Back " + user.hostFirstName)
				this.props.navigation.navigate('MainHost');
			} else {
                alert("Welcome Back " + user.attendeeFirstName)
				this.props.navigation.navigate('MainAttendee');
			}
		}
	};

	

	render() {
		const { navigate } = this.props.navigation;

		return (
			<View style={{ backgroundColor: '#fff7d5', height: '100%' }}>
				<Image
					source={require('../images/image.png')}
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
					<Button
						title='Log in as host'
						onPress={() => navigate('LoginHost')}
					/>
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
					<Button
						title='Log in as attendee'
						onPress={() => navigate('LoginAttendee')}
					/>
				</View>

				<Text
					onPress={() => navigate('Register')}
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
	}
}
