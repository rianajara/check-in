import React, { useEffect, useState } from 'react';
import {
	Text,
	View,
	Image,
	TextInput,
	KeyboardAvoidingView,
	StyleSheet,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import Icon from '@expo/vector-icons/AntDesign';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import eventData from '../json/events.json';
import * as firebase from 'firebase';
import Firebase from '../components/Firebase';

const db = Firebase.firestore();
db.settings({timestampsInSnapshots: true});

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];



const CreateEvent = (props) => {
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
	const [dateSelected, setDateSelected] = useState('');
	const [timeSelected, setTimeSelected] = useState('');

	const addNewEvent = () => {
		const arrayOne = {}
		/*
		// all documents and information in each document
		db.collection('Events').get().then((snapshot) => {
			snapshot.docs.forEach(doc => {
				console.warn(doc.data())
			})
		})
		*/
	/*

		// Gets the individual document events
		db.collection('Events').doc('RHA').get().then((snapshot) => {
			
			console.warn(snapshot.data())
		})
		*/

		// Append additional dummy event to database
		db.collection('Events').doc('RHA').set({'eventThree':{Location: 'Pyramid', Title: 'Illumination'}}, {merge: true})
	}

	const createTime = (time) => {
		const hour =
			time.getHours() > 12 ? time.getHours() - 12 : time.getHours();
		const minute =
			time.getMinutes() < 10
				? '0' + time.getMinutes()
				: time.getMinutes();
		const ampm = time.getHours() > 11 ? 'pm' : 'am';
		return hour + ':' + minute + ' ' + ampm;
	};

	const createDate = (date) => {
		return (
			months[date.getMonth().toString()] +
			' ' +
			date.getDate() +
			', ' +
			date.getFullYear()
		);
	};

	/* SHOWING DATE PICKER */
	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleDateConfirm = (date) => {
		setDateSelected(createDate(date));
		hideDatePicker();
	};

	useEffect(() => {
		setDateSelected(dateSelected);
	}, [dateSelected]);

	/* SHOWING TIME PICKER */
	const showTimePicker = () => {
		setTimePickerVisibility(true);
	};

	const hideTimePicker = () => {
		setTimePickerVisibility(false);
	};

	const handleTimeConfirm = (time) => {
		setTimeSelected(createTime(time));
		hideTimePicker();
	};

	useEffect(() => {
		setTimeSelected(timeSelected);
	}, [timeSelected]);

	const image = require('../images/image.png');

	return (
		<View style={styles.contentContainer}>
			<Text
				style={{
					fontSize: 20,
					fontFamily: 'Bold',
					alignSelf: 'center',
					marginTop: 60,
					marginBottom: 50,
				}}>
				Create Event{' '}
			</Text>
			<View style={styles.inputContainer}>
				<Input
					label='Event Title:'
					placeholder='Name of Event'
					leftIcon={
						<Icon
							name='mail'
							size={24}
							color='black'
							style={styles.icon}
						/>
					}
				/>

				<Input
					label='Location:'
					placeholder='Event Location'
					leftIcon={
						<Icon
							name='enviromento'
							size={24}
							color='black'
							style={styles.icon}
						/>
					}
				/>

				<Input
					label='Primary Contact:'
					placeholder="Contact's name"
					leftIcon={
						<Icon
							name='user'
							size={24}
							color='black'
							style={styles.icon}
						/>
					}
				/>

				<Input
					label='Contact Email:'
					placeholder=" Primary Contact's email"
					leftIcon={
						<Icon
							name='user'
							size={24}
							color='black'
							style={styles.icon}
						/>
					}
				/>

				<View>
					{eventData['events'].map((data, key) => {
						<>
							<Text>{data['Event Name']}</Text>
							<Text>{data['Date']}</Text>
							<Text>{data['Time']}</Text>
							<Text>{data['Location']}</Text>
						</>;
					})}
				</View>

				<TouchableOpacity onPress={() => [showDatePicker()]}>
					<Input
						label='Date:'
						placeholder='Event Date'
						editable={false}
						value={dateSelected}
						leftIcon={
							<Icon
								name='calendar'
								size={24}
								color='black'
								style={styles.icon}
							/>
						}
					/>
				</TouchableOpacity>

				<DateTimePickerModal
					isVisible={isDatePickerVisible}
					mode='date'
					onConfirm={handleDateConfirm}
					onCancel={hideDatePicker}
				/>

				<DateTimePickerModal
					isVisible={isTimePickerVisible}
					mode='time'
					onConfirm={handleTimeConfirm}
					onCancel={hideTimePicker}
					headerTextIOS='Pick a time'
				/>

				<TouchableOpacity onPress={() => [showTimePicker()]}>
					<Input
						label='Time:'
						placeholder='Event Start Time'
						editable={false}
						value={timeSelected}
						leftIcon={
							<Icon
								name='clockcircleo'
								size={24}
								color='black'
								style={styles.icon}
							/>
						}
					/>
				</TouchableOpacity>

				<Input
					label='Description:'
					placeholder='Event Description'
					leftIcon={
						<Icon
							name='info'
							size={24}
							color='black'
							style={styles.icon}
						/>
					}
				/>
			</View>
			<View style={styles.buttonContainer}>
				<Button onPress={() => {addNewEvent(), console.warn("yyyyyy")}} style={styles.smallButton} title='Create Event' />
			</View>
		</View>
	);
};
/*
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
*/

const styles = StyleSheet.create({
	contentContainer: {
		backgroundColor: '#fff7d5',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-evenly',
		paddingTop: 75,
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
		height: '40%',
	},
	smallButton: {},
	icon: {
		marginRight: 15,
	},
});

export default CreateEvent;
// https://www.npmjs.com/package/react-native-modal-datetime-picker
