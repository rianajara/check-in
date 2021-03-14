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
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import Icon from '@expo/vector-icons/AntDesign';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import eventData from '../json/events.json';

const ViewEvent = (props) => {
	const eventInfo = props.navigation.state.params.data;

	return (
		<View style={styles.contentContainer}>
			<View style={styles.eventInfoContainer}>
				<ScrollView style={styles.scrollView}>
					<View style={styles.eventHeaderTextView}>
						<Text style={styles.eventHeaderText}>
							{eventInfo['Event Name']}
						</Text>
					</View>
					<Text style={styles.eventInfoText}>
						<Text style={styles.boldText}>Date: </Text>
						{eventInfo['Date']}
					</Text>
					<Text style={styles.eventInfoText}>
						<Text style={styles.boldText}>Time: </Text>
						{eventInfo['Time']}
					</Text>
					<Text style={styles.eventInfoText}>
						<Text style={styles.boldText}>Location: </Text>
						{eventInfo['Location']}
					</Text>
					<Text style={styles.eventInfoText}>
						<Text style={styles.boldText}>Primary Contact: </Text>{' '}
						{eventInfo['Primary Contact']}
					</Text>
					<Text style={styles.eventInfoText}>
						<Text style={styles.boldText}>Email: </Text>
						{eventInfo['Email']}
					</Text>
					<Text style={styles.eventInfoText}>
						<Text style={styles.boldText}>Description:</Text>{' '}
						{eventInfo['Description']}
					</Text>
					<Text style={styles.eventInfoText}>
						<Text style={styles.boldText}>Max Capacity: </Text>
						{eventInfo['Max Capacity']}
					</Text>
				</ScrollView>
			</View>

			<View style={styles.viewEventButtonView}>
				<TouchableOpacity
					style={[
						styles.viewEventButton,
						{ backgroundColor: '#CCCCCC' },
						{ borderColor: '#808080' },
					]}>
					<Text style={styles.viewEventButtonText}>Export Data</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.viewEventButton,
						{ backgroundColor: '#66FF66' },
						{ borderColor: '#009900' },
					]}>
					<Text style={styles.viewEventButtonText}>
						Check In Attendees
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.viewEventButton,
						{ backgroundColor: '#66B2FF' },
						{ borderColor: '#007FFF' },
					]}>
					<Text style={styles.viewEventButtonText}>Modify Event</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.viewEventButton,
						{ backgroundColor: '#FF6666' },
						{ borderColor: '#FF0000' },
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
		backgroundColor: '#ADD8E6',
		borderRadius: 8,
		borderColor: 'black',
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
