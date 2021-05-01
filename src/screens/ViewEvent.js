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
import { Alert } from 'react-native';
//test
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';


/*
npm install expo-media-library
npm install expo-file-system
npm install expo-permissions

*/

const db = Firebase.firestore();
db.settings({ timestampsInSnapshots: true });

const ViewEvent = (props) => {
	const eventInfo = props.navigation.state.params.data;
	const [eventData, setEventData] = useState(eventInfo);
	const { currentUser, setCurrentUser } = useContext(UserContext);
	const [spotsLeft, setSpotsLeft] = useState(0);
	const [attendeesList, setAttendeesList] = useState([]);
	const [attendeesInfoList, setAttendeesInfoList] = useState([]);
	const [results, setResults] = useState([]);

	const headers = [
		{ label: 'Email', key: 'Email' },
		{ label: 'FirstName', key: 'FirstName' },
		{ label: 'LastName', key: 'LastName' },
		{ label: 'Major', key: 'Major' },
		{ label: 'YearLevel', key: 'YearLevel' },
	];

	const tableHeaders = {
		Email: '',
		FirstName: '',
		LastName: '',
		Major: '',
		YearLevel: '',
	};

	// gets all of the attendees email DONE
	const getAttendeeEmail = async () => {
		const attendees = db
			.collection('OrgEvents')
			.doc(currentUser['hostOrg'])
			.collection('Events')
			.doc(eventInfo[Object.keys(eventInfo)[0]]['Title'])
			.collection('Attendees');

		const snapshot = await attendees.get();
		const tempEventArray = [];

		snapshot.forEach(async (collection) => {
			tempEventArray.push(collection.id);
		});

		setAttendeesList(tempEventArray);
	};




	// ref : https://stackoverflow.com/questions/54586216/how-to-create-text-file-in-react-native-expo


	saveFile = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
		console.log('test1');
		if (status === "granted") {
			console.log('test2');
			let fileUri = FileSystem.documentDirectory + "text.txt";
			console.log('test3');
			await FileSystem.writeAsStringAsync(fileUri, "Hello World", { encoding: FileSystem.EncodingType.UTF8 });
			console.log('test4');


			try{
			const asset = await MediaLibrary.createAssetAsync(fileUri)}

			catch(e) {
				console.log('Catch an error: ', e)
			  }
			console.log('test5');


			await MediaLibrary.createAlbumAsync("Download", asset, false)
			console.log('test6');
		}
	}








	// get and add the attendees information and places it in an array
	const getAttendeeInfo = async () => {
		const tempEventArray = [];

		for (let step = 0; step < attendeesList.length; step++) {
			const attendeeInfo = db
				.collection('Attendee')
				.doc(attendeesList[step]);

			const snapshot = await (await attendeeInfo.get()).data();
			//console.warn("this is the snapshot data "+ attendeesList[step] + JSON.stringify(snapshot.data()))
			tempEventArray.push(snapshot);
		}

		setAttendeesInfoList(tempEventArray);
	};

	//csv maker

	// console
	useEffect(() => {
		//console.warn(attendeesList)
		getAttendeeInfo();
	}, [attendeesList]);
/*
	useEffect(() => {
		//console.warn(attendeesInfoList)
		let ws = XLSX.utils.json_to_sheet(JSON.stringify(attendeesInfoList));
		let wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Attendees');
		const wbout = XLSX.write(wb, {
			type: 'base64',
			bookType: 'xlsx',
		});
	}, [attendeesInfoList]);

	useEffect(() => {
		console.warn(results);
	}, [results]);
*/
	const handleCheckIn = () => {
		if (spotsLeft === 0) {
			Alert.alert(
				'Max Capacity Reached',
				'There are no spots left in this event.',
				[
					{
						text: 'OK',
					},
				]
			);
		} else if (spotsLeft > 0) {
			props.navigation.navigate('CameraScan', {
				eventInfo: eventInfo,
			});
		}
	};

	const deleteEvent = async () => {
		db.collection('OrgEvents')
			.doc(currentUser['hostOrg'])
			.collection('Events')
			.doc(eventInfo[Object.keys(eventInfo)[0]]['Title'])
			.collection('Attendees')
			.doc('Attendees List')
			.delete()
			.then(
				db
					.collection('OrgEvents')
					.doc(currentUser['hostOrg'])
					.collection('Events')
					.doc(eventInfo[Object.keys(eventInfo)[0]]['Title'])
					.delete()
			);

		props.navigation.navigate('MainHost');
	};

	useEffect(() => {
		setSpotsLeft(
			parseInt(eventInfo[Object.keys(eventInfo)[0]]['Spots Left'])
		);
	}, []);

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
						{
							eventInfo[Object.keys(eventInfo)[0]][
								'Primary Contact'
							]
						}
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
					<Text style={styles.eventInfoText}>
						<Text style={styles.boldText}>Spots Left: </Text>
						{eventInfo[Object.keys(eventInfo)[0]]['Spots Left']}
					</Text>
				</ScrollView>
			</View>

			<View style={styles.viewEventButtonView}>
				<TouchableOpacity
					onPress={() => getAttendeeEmail()}
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
					onPress={() => handleCheckIn()}>
					<Text style={styles.viewEventButtonText}>
						Check In Attendees
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						props.navigation.navigate('ModifyEvent', {
							eventInfo: eventInfo,
						});
					}}
					style={[
						styles.viewEventButton,
						{ backgroundColor: '#f8caca' },
						{ borderColor: '#f19696' },
					]}>
					<Text style={styles.viewEventButtonText}>Modify Event</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => /*deleteEvent()*/	saveFile()}
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
