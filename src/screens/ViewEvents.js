import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import Firebase from '../components/Firebase';
import { UserContext } from '../context/UserContext.js';
import { useContext } from 'react';
import { eventTypes } from '../json/eventTypes.json';

import RNPickerSelect from 'react-native-picker-select';//dropdown

const ViewEvents = (props) => {
	const { currentUser, setCurrentUser } = useContext(UserContext);

	const [eventArray, setEventArray] = useState([]);

	//alert(eventArray);




	

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
		snapshot.forEach((collection) => {
			console.log(collection.id, ':', collection.data());
			tempEventArray.push(collection.data());
		});

		

		setEventArray(tempEventArray);

		
	}

	// Help here
	async function filterEvents(db, filter) {

			// This confirms filter value is being passed
			//console.log('filter check:',filter);

			const aesbEvents = db
			.collection('OrgEvents')
			.doc(currentUser['hostOrg'])
			.collection('Events');

			// Not working ????? 
			// reference, https://cloud.google.com/firestore/docs/query-data/queries#node.js_1
			const queryRef = aesbEvents.where('Event Type', '==', filter);
			// seems to return empty
		

		const snapshot = await queryRef.get();
		const tempEventArray = [];

		snapshot.forEach((collection) => {
			console.log('tester: ',collection.id, ':', collection.data());
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
									{Object.keys(data)[0]}
									
									
								</Text>
								<Text style={styles.buttonDetailText}>
									{data[Object.keys(data)[0]]['Date']},{' '}{data[Object.keys(data)[0]]['Time']}
									
								</Text>
								<Text style={styles.buttonDetailText}>
									{data[Object.keys(data)[0]]['Location']}
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


				<RNPickerSelect  //dropdown menu for filter
						//on value change, call filterEvents with the value
						//i have confirmed this part is working
           			 onValueChange={(value) => filterEvents(db,value)}
           			 items={eventTypes} 

					style={pickerSelectStyles}
				/>	





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

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 18,
		paddingVertical: 12,
		paddingHorizontal: 10,
		color: 'black',
		paddingRight: 30, // to ensure the text is never behind the icon
		width: 165,
	},
	inputAndroid: {
		fontSize: 18,
 
		paddingVertical: 17,
 
		color: 'black',
		width: 200,
	},


});

export default ViewEvents;