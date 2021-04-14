import React, { useEffect, useState } from 'react';
import {
	Text,
	View,
	Image,
	TextInput,
	KeyboardAvoidingView,
	StyleSheet,
	ScrollView,
	Dimensions,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Firebase from '../components/Firebase';
import { UserContext } from '../context/UserContext.js';
import { useContext } from 'react';


const db = Firebase.firestore();
db.settings({ timestampsInSnapshots: true });



const ViewEvent = (props) => {
	const eventInfo = props.navigation.state.params.data;
	const [eventData, setEventData] = useState(eventInfo)
	const { currentUser, setCurrentUser } = useContext(UserContext);
	

	const deleteEvent = async () => {
		db.collection('OrgEvents')
			.doc(currentUser['hostOrg'])
			.collection('Events')
			.doc(eventInfo[Object.keys(eventInfo)[0]]['Title'])
			.collection('Attendees')
			.doc('Attendees List')
			.delete().then(

		db.collection('OrgEvents')
			.doc(currentUser['hostOrg'])
			.collection('Events')
			.doc(eventInfo[Object.keys(eventInfo)[0]]['Title'])
			.delete()
			)
			
			props.navigation.navigate('MainHost')
			
	}

	return (
		<View style={styles.contentContainer}>
			
			<View style={styles.eventInfoContainer}>
				<ScrollView style={styles.scrollView}>
					<View style={styles.eventHeaderTextView}>
						<Text style={styles.eventHeaderText}>
							{eventInfo[Object.keys(eventInfo)[0]]['Title']}
						</Text>
					</View>
					<Text style={styles.eventInfoText}>
						<Text style={styles.boldText}>Event Type: </Text>
						{eventInfo[Object.keys(eventInfo)[0]]['Event Type']}
					</Text>
					<Text style={styles.eventInfoText}>
						<Text style={styles.boldText}>Date: </Text>
						{eventInfo[Object.keys(eventInfo)[0]]['Date']}
					</Text>
					<Text style={styles.eventInfoText}>
						<Text style={styles.boldText}>Time: </Text>
						{eventInfo[Object.keys(eventInfo)[0]]['Time']}
					</Text>
					<Text style={styles.eventInfoText}>
						<Text style={styles.boldText}>Location: </Text>
						{eventInfo[Object.keys(eventInfo)[0]]['Location']}
					</Text>
					<Text style={styles.eventInfoText}>
						<Text style={styles.boldText}>Primary Contact: </Text>{' '}
						{eventInfo[Object.keys(eventInfo)[0]]['Primary Contact']}
					</Text>
					<Text style={styles.eventInfoText}>
						<Text style={styles.boldText}>Email: </Text>
						{eventInfo[Object.keys(eventInfo)[0]]['Contact Email']}
					</Text>
					<Text style={styles.eventInfoText}>
						<Text style={styles.boldText}>Description:</Text>{' '}
						{eventInfo[Object.keys(eventInfo)[0]]['Description']}
					</Text>
					<Text style={styles.eventInfoText}>
						<Text style={styles.boldText}>Max Capacity: </Text>
						{eventInfo[Object.keys(eventInfo)[0]]['Max Capacity']}
					</Text>
				</ScrollView>
			</View>

			<View style={styles.viewEventButtonView}>
				<TouchableOpacity
					style={[
						styles.viewEventButton,
						{ backgroundColor: '#c1dace' },
						{ borderColor: '#8dbba4' },
					]}>
					<Text style={styles.viewEventButtonText}>Export Data</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.viewEventButton,
						{ backgroundColor: '#a3d4d8' },
						{ borderColor: '#65b6be' },
					]}
					onPress={() => props.navigation.navigate('CameraScan', {
						eventInfo: eventInfo,
					})}>
					<Text style={styles.viewEventButtonText}>
						Check In Attendees
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={
						() => {props.navigation.navigate('ModifyEvent', {eventInfo: eventInfo})}
						
					}
					style={[
						styles.viewEventButton,
						{ backgroundColor: '#f8caca' },
						{ borderColor: '#f19696' },
					]}>
					<Text style={styles.viewEventButtonText}>Modify Event</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => deleteEvent()}
					style={[
						styles.viewEventButton,
						{ backgroundColor: '#f9d391' },
						{ borderColor: '#f4b23f' },
					]}>
					<Text style={styles.viewEventButtonText}>Delete Event</Text>
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
		justifyContent: 'flex-start',
		paddingTop: 50,
	},
	eventInfoContainer: {
		width: '90%',
		height: '75%',
		backgroundColor: '#d1dfbe',
		borderRadius: 8,
		borderColor: '#aac486',
		borderWidth: 5,
		marginTop: '5%',
		paddingTop: 25,
		paddingHorizontal: 15,
	},
	eventHeaderTextView: {
		borderBottomColor: 'black',
		borderBottomWidth: 4,
	},
	eventHeaderText: {
		fontSize: 40,
		fontWeight: '700',
		marginBottom: 10,
	},
	eventInfoText: {
		fontSize: 20,
		marginVertical: 5,
	},
	boldText: {
		fontWeight: 'bold',
	},
	scrollView: {
		paddingRight: 15,
		width: '90%',
	},
	viewEventButtonView: {
		width: '90%',
		height: 70,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginTop: 40,
	},
	viewEventButton: {
		width: 70,
		height: 70,
		backgroundColor: 'red',
		alignItems: 'center',
		justifyContent: 'space-around',
		borderRadius: 15,
		borderWidth: 4,
		padding: 2,
	},
	viewEventButtonText: {
		fontSize: 12,
		textAlign: 'center',
		fontWeight: '700',
	},
});

export default ViewEvent;
// https://www.npmjs.com/package/react-native-modal-datetime-picker
