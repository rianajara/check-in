import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import Firebase from '../components/Firebase';

const ViewEvents = (props) => {
	const [eventArray, setEventArray] = useState([]);

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
			.doc('AESB')
			.collection('Events');
		const snapshot = await aesbEvents.get();
		const tempEventArray = [];
		snapshot.forEach((collection) => {
			console.log(collection.id, ':', collection.data());
			tempEventArray.push(collection.data());
		});

		setEventArray(tempEventArray);
	}

	useEffect(() => {
		getAllEvents(db);
	}, []);

	return (
		<View style={styles.contentContainer}>
			<View style={styles.scrollViewOuterView}>
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
									{data['Details']['Event Title']}
								</Text>
								<Text style={styles.buttonDetailText}>
									{data['Details']['Date']},{' '}
									{data['Details']['Time']}
								</Text>
								<Text style={styles.buttonDetailText}>
									{data['Details']['Location']}
								</Text>
							</TouchableOpacity>
						</View>
					))}
				</ScrollView>
			</View>
			<View style={styles.buttonViewContainer}>
				<TouchableOpacity
					style={[
						styles.buttonView,
						{ backgroundColor: '#d1dfbe' },
						{ borderColor: '#aac486' },
					]}>
					<Text style={styles.buttonViewText}>Past Events</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.buttonView,
						{ backgroundColor: '#d7eef6' },
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
});

export default ViewEvents;
