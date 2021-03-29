import React, { useEffect, useState } from 'react';
import {
	Text,
	View,
	Image,
	TextInput,
	KeyboardAvoidingView,
	StyleSheet,
	ScrollView,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import Icon from '@expo/vector-icons/AntDesign';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import eventData from '../json/events.json';
import * as firebase from 'firebase';
import Firebase from '../components/Firebase';
import PopUpModal from '../screens/PopUpModal';

const db = Firebase.firestore();
db.settings({ timestampsInSnapshots: true });

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
	const [title, setTitle] = useState('');
	const [location, setLocation] = useState('');
	const [primaryContact, setPrimaryContact] = useState('');
	const [contactEmail, setContactEmail] = useState('');
	const [dateSelected, setDateSelected] = useState('');
	const [timeSelected, setTimeSelected] = useState('');
	const [description, setDescription] = useState('');
	const [maxCapacity, setMaxCapacity] = useState('');
	const [updateClickCount, setUpdateClickCount] = useState(0);
	const [popUpText, setPopUpText] = useState(null)

	const inputChecker = () => {
		

		if (
			title.length < 1 ||
			location.length < 1 ||
			primaryContact.length < 1 ||
			contactEmail.length < 1 ||
			dateSelected.length < 1 ||
			timeSelected.length < 1 ||
			description.length < 1 ||
			maxCapacity.length < 1
		) {
			setPopUpText("Please fill out all fields")
			
		}else {
			setPopUpText("Added")
			addNewEvent(title);
		}

		setUpdateClickCount(updateClickCount + 1);
	};

	const addNewEvent = () => {
	
		// Append actual data to the database (RHA for now)
		db.collection('Events')
			.doc('RHA')
			.set(
				{ [title] : { Title: title , Location: location, "Primary Contact": primaryContact, "Contact Email": contactEmail, Date: dateSelected, Time: timeSelected, Description: description, "Max Capacity": maxCapacity} },
				{ merge: true }
			);
	};

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

	return (
		<View style={styles.contentContainer}>
			
			<Text
				style={{
					fontSize: 20,
					fontFamily: 'Bold',
					alignSelf: 'center',
					marginTop: 70,
					marginBottom: 65,
				}}>
				Create Event{' '}
			</Text>
			
			<KeyboardAvoidingView
				style={styles.inputContainer}
				behavior='padding'>
				<View>
					<ScrollView>
						<Input
							label='Event Title:'
							placeholder='Name of Event'
							onChangeText={setTitle}
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
							onChangeText={ setLocation}
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
							onChangeText={setPrimaryContact}
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
							placeholder="Primary Contact's email"
							onChangeText={setContactEmail}
							returnKeyType={'done'}
							leftIcon={
								<Icon
									name='user'
									size={24}
									color='black'
									style={styles.icon}
								/>
							}
						/>

						<TouchableOpacity onPress={() => [showDatePicker()]}>
							<Input
								label='Date:'
								placeholder='Event Date'
								editable={false}
								value={dateSelected}
								onChangeText={setDateSelected}
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
								onChangeText={setTimeSelected}
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
							onChangeText={ setDescription}
							leftIcon={
								<Icon
									name='info'
									size={24}
									color='black'
									style={styles.icon}
								/>
							}
						/>

						<Input
							label='Max Capacity:'
							placeholder='Max Capacity'
							keyboardType={'number-pad'}
							onChangeText={setMaxCapacity}
							returnKeyType={'done'}
							leftIcon={
								<Icon
									name={'team'}
									size={24}
									color='black'
									style={styles.icon}
								/>
							}
						/>
						<PopUpModal style={{height: 0, padding: 0, margin: 0}} popUpText={popUpText} updateClickCount={updateClickCount} ></PopUpModal>
		
					</ScrollView>
				</View>
				<View  />
			</KeyboardAvoidingView>
			
			
			<View style={styles.buttonContainer}>
			
				<Button
					onPress={() => {
						inputChecker();
						
					}}
					style={styles.smallButton}
					title='Create Event'
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
		height: '40%',
	},
	smallButton: {},
	icon: {
		marginRight: 15,
	},
});

export default CreateEvent;
// https://www.npmjs.com/package/react-native-modal-datetime-picker
