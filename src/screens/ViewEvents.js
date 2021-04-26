import React, { useEffect, useState } from 'react';
import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	TouchableHighlight,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import Firebase from '../components/Firebase';
import { UserContext } from '../context/UserContext.js';
import { useContext } from 'react';

import RNPickerSelect from 'react-native-picker-select'; //dropdown

const ViewEvents = (props) => {
	const { currentUser, setCurrentUser } = useContext(UserContext);

	const [eventArray, setEventArray] = useState([]);
	const [arrayOfEvents, setArrayOfEvents] = useState([]);
	const [filterChangeCount, setFilterChangeCount] = useState(0);
	const [pastEvents, setPastEvents] = useState(false);
	const [futureEvents, setFutureEvents] = useState(false);
	const [currentFilter, setCurrentFilter] = useState('All');
	const [pastButtonColor, setPastButtonColor] = useState('#d1dfbe');
	const [futureButtonColor, setFutureButtonColor] = useState('#d7eef6');

	const eventTypes = [
		{
			label: 'All',
			value: 'All',
		},
		{
			label: 'Social',
			value: 'Social',
		},
		{
			label: 'Industry',
			value: 'Industry',
		},
		{
			label: 'Tabling',
			value: 'Tabling',
		},
		{
			label: 'Workshop',
			value: 'Workshop',
		},
		{
			label: 'General Body',
			value: 'General Body',
		},
	];

	const colorPicker = (buttonNum) => {
		if (buttonNum % 4 == 1) {
			return '#f8caca'; //pastel salmon
		} else if (buttonNum % 4 == 2) {
			return '#a3d4d8'; //baby blue
		} else if (buttonNum % 4 == 3) {
			return '#f9d391'; //pastel orange
		} else {
			return '#c1dace'; //seafoam green
		}
	};

	//this is test comment

	const borderColorPicker = (buttonNum) => {
		if (buttonNum % 4 == 1) {
			return '#f19696';
		} else if (buttonNum % 4 == 2) {
			return '#65b6be';
		} else if (buttonNum % 4 == 3) {
			return '#f4b23f';
		} else {
			return '#8dbba4';
		}
	};

	const db = Firebase.firestore();

	//get all events in one org (AESB) --- still need to find a way to pass the host's name
	async function getAllEvents(db) {
		const aesbEvents = db
			.collection('OrgEvents')
			.doc(currentUser['hostOrg'])
			.collection('Events');
		const snapshot = await aesbEvents.get();

		const tempEventArray = [];
		snapshot.forEach(async (collection) => {
			const eventTitle = await Object.keys(collection.data())[0];
			if (pastEvents === false && futureEvents === false) {
				await tempEventArray.push(collection.data());
			} else if (
				pastEvents === true &&
				new Date(collection.data()[eventTitle]['Date']) < new Date()
			) {
				
				await tempEventArray.push(collection.data());
			} else if (
				futureEvents === true &&
				new Date(collection.data()[eventTitle]['Date']) > new Date()
			) {
				await tempEventArray.push(collection.data());
			}
		});

		await setEventArray(tempEventArray);

		setArrayList();
	}

	// Help here
	async function filterEvents(filter) {
		setFilterChangeCount(filterChangeCount + 1);
		const aesbEvents = db
			.collection('OrgEvents')
			.doc(currentUser['hostOrg'])
			.collection('Events');

		const snapshot = await aesbEvents.get();
		const tempEventArray = [];

		if (filter === 'All') {
			getAllEvents(db);
		} else {
			snapshot.forEach(async (collection) => {
				const eventTitle = await Object.keys(collection.data())[0];
				if (collection.data()[eventTitle]['Event Type'] === filter) {
					if (pastEvents === false && futureEvents === false) {
						await tempEventArray.push(collection.data());
					} else if (
						pastEvents === true &&
						new Date(collection.data()[eventTitle]['Date']) <
							new Date()
					) {
						await tempEventArray.push(collection.data());
					} else if (
						futureEvents === true &&
						new Date(collection.data()[eventTitle]['Date']) >
							new Date()
					) {
						await tempEventArray.push(collection.data());
					}
				}
			});

			setEventArray(tempEventArray);
		}
	}

	const pastFutureToggle = (buttonPressed) => {
		if (buttonPressed === 'past') {
			if (pastEvents === true) {
				setPastEvents(false);
				setPastButtonColor('#d1dfbe');
			} else if (pastEvents === false) {
				setPastEvents(true);
				setPastButtonColor('#364522');
				setFutureButtonColor('#d7eef6');
				setFutureEvents(false);
			}
		} else if (buttonPressed === 'future') {
			if (futureEvents === true) {
				setFutureEvents(false);
				setFutureButtonColor('#d7eef6');
			} else if (futureEvents === false) {
				setFutureEvents(true);
				setPastEvents(false);
				setFutureButtonColor('#154b5e');
				setPastButtonColor('#d1dfbe');
			}
		}
	};

	const setArrayList = () => {
		setArrayOfEvents(
			<ScrollView style={styles.scrollView}>
				{eventArray.map((data, key) => (
					<View key={key}>
						<TouchableOpacity
							onPress={() =>
								props.navigation.navigate('ViewEvent', {
									data: data,
								})
							}
							style={[
								styles.eventButton,
								{
									backgroundColor: colorPicker(key),
									borderColor: borderColorPicker(key),
								},
							]}
							key={key}>
							<Text style={styles.buttonTitleText}>
								{Object.keys(data)[0]}
							</Text>
							<Text style={styles.buttonDetailText}>
								{data[Object.keys(data)[0]]['Date']},{' '}
								{data[Object.keys(data)[0]]['Time']}
							</Text>
							<Text style={styles.buttonDetailText}>
								{data[Object.keys(data)[0]]['Location']}
							</Text>
						</TouchableOpacity>
					</View>
				))}
			</ScrollView>
		);
	};

	useEffect(() => {
		getAllEvents(db);
	}, []);

	useEffect(() => {
		filterEvents(currentFilter);
	}, [pastEvents, futureEvents]);

	useEffect(() => {
		if (eventArray.length === 0 && filterChangeCount > 0) {
			setArrayOfEvents(
				<Text
					style={{
						fontSize: 20,
						fontFamily: 'Bold',
						alignSelf: 'center',
						marginTop: 115,
						textAlign: 'center',
					}}>
					No Events of this type. {'\n'}Please try a different filter.{' '}
				</Text>
			);
		} else {
			setArrayList();
		}
	}, [eventArray]);

	return (
		<View style={styles.contentContainer}>
			<View style={styles.scrollViewOuterView}>{arrayOfEvents}</View>
			<View style={styles.buttonViewContainer}>
				<TouchableOpacity
					onPress={() => {
						pastFutureToggle('past');
					}}
					style={[
						styles.buttonView,
						{ backgroundColor: pastButtonColor },
						{ borderColor: '#aac486' },
					]}>
					<Text style={styles.buttonViewText}>Past Events</Text>
				</TouchableOpacity>

				<TouchableHighlight style={styles.filterButton}>
					<RNPickerSelect //dropdown menu for filter
						//on value change, call filterEvents with the value
						//i have confirmed this part is working
						onValueChange={(value) => {
							filterEvents(value), setCurrentFilter(value);
						}}
						items={eventTypes}
						style={pickerSelectStyles}
						useNativeAndroidPickerStyle={false}
						placeholder={{}}
					/>
				</TouchableHighlight>

				<TouchableOpacity
					onPress={() => {
						pastFutureToggle('future');
					}}
					style={[
						styles.buttonView,
						{ backgroundColor: futureButtonColor },
						{ borderColor: '#a6d9ea' },
					]}>
					<Text style={styles.buttonViewText}>Upcoming Events</Text>
				</TouchableOpacity>
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
		paddingTop: 50,
	},
	scrollViewOuterView: {
		height: '80%',
		width: '90%',
	},
	scrollView: {},
	eventButton: {
		width: '100%',
		height: 100,
		backgroundColor: 'green',
		borderRadius: 8,
		borderColor: 'black',
		borderWidth: 5,
		marginVertical: '5%',
		paddingHorizontal: 10,
		paddingTop: 2,
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
	buttonTitleText: {
		fontSize: 24,
		fontWeight: '600',
	},
	buttonDetailText: {
		fontSize: 16,
	},
	buttonViewContainer: {
		width: '90%',
		height: 70,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginTop: 40,
	},
	buttonView: {
		width: 70,
		height: 70,
		backgroundColor: 'red',
		alignItems: 'center',
		justifyContent: 'space-around',
		borderRadius: 15,
		borderWidth: 4,
		padding: 2,
	},
	buttonViewText: {
		fontSize: 12,
		textAlign: 'center',
		fontWeight: '700',
	},
	filterButton: {
		width: 150,
		height: 70,
		backgroundColor: 'rgba(255, 217, 112, 0.55)',

		justifyContent: 'space-around',
		borderRadius: 15,
		borderWidth: 4,
		borderColor: '#ffcd43',
	},
	filterText: {
		textAlign: 'center',
	},
});

// https://github.com/lawnstarter/react-native-picker-select/issues/29 sturmenta solution
const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 16,
		textAlign: 'center',
		fontWeight: '700',
		width: 150,
		height: 70,
		paddingRight: 8,
		flexWrap: 'wrap',
	},
	inputAndroid: {
		fontSize: 16,
		textAlign: 'center',
		fontWeight: '700',
		width: 150,
		height: 70,
		paddingRight: 8,
		flexWrap: 'wrap',
		borderColor: 'blue',
		borderWidth: 2
	},
});

export default ViewEvents;
