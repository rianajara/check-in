import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import QRCode from 'react-native-qrcode-svg';
import { UserContext } from '../context/UserContext.js';
import { useContext } from 'react';
import Firebase from '../components/Firebase';
import { NavigationActions, StackActions } from 'react-navigation';

const db = Firebase.firestore();
db.settings({ timestampsInSnapshots: true });

const CameraScan = (props) => {
	const eventInfo = props.navigation.state.params.eventInfo;
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const image = require('../images/image.png');
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);
	const { currentUser, setCurrentUser } = useContext(UserContext);
	const [title, setTitle] = useState(
		eventInfo[Object.keys(eventInfo)[0]]['Title']
	);
	const [spotsLeft, setSpotsLeft] = useState(1);

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();

		setSpotsLeft(
			parseInt(eventInfo[Object.keys(eventInfo)[0]]['Spots Left'])
		);
	}, []);

	useEffect(() => {
		if (spotsLeft === 0) {
			Alert.alert(
				'Max Capacity Reached',
				'There are no spots left in this event',
				[
					{
						text: 'To Events Page',
						onPress: () => props.navigation.navigate('MainHost'),
					},
				]
			);
		}
	}, [spotsLeft]);

	function isValidEmail(value) {
		return /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,5}$/.test(value);
	}

	const addAttendee = async (data) => {
		// adds attendee to database
		var docRef = await db
			.collection('OrgEvents')
			.doc(currentUser['hostOrg'])
			.collection('Events')
			.doc(title)
			.collection('Attendees')
			.doc(data);

		docRef.get().then((doc) => {
			if (doc.exists) {
				Alert.alert(
					'Unable to Scan QR Code',
					'This attendee has already been scanned to this event.',
					[
						{
							text: 'OK',
						},
					]
				);
			} else {
				Alert.alert(
					'QR Code Accepted',
					'This attendee has been checked in.',
					[
						{
							text: 'OK',
						},
					]
				);

				docRef.set({
					Attendees: '',
				});

				//updates Spots left field in database
				db.collection('OrgEvents')
					.doc(currentUser['hostOrg'])
					.collection('Events')
					.doc(title)
					.set(
						{
							[title]: {
								Title: title,
								Location:
									eventInfo[Object.keys(eventInfo)[0]][
										'Location'
									],
								'Primary Contact':
									eventInfo[Object.keys(eventInfo)[0]][
										'Primary Contact'
									],
								'Contact Email':
									eventInfo[Object.keys(eventInfo)[0]][
										'Contact Email'
									],
								Date:
									eventInfo[Object.keys(eventInfo)[0]][
										'Date'
									],
								Time:
									eventInfo[Object.keys(eventInfo)[0]][
										'Time'
									],
								Description:
									eventInfo[Object.keys(eventInfo)[0]][
										'Description'
									],
								'Max Capacity':
									eventInfo[Object.keys(eventInfo)[0]][
										'Max Capacity'
									],
								'Event Type':
									eventInfo[Object.keys(eventInfo)[0]][
										'Event Type'
									],
								'Spots Left': spotsLeft - 1,
							},
						},
						{ merge: false }
					);

				setSpotsLeft(spotsLeft - 1);
			}
		});
	};

	useEffect(() => {
		console.warn('how many spots left ' + spotsLeft);
	}, [spotsLeft]);

	const handleBarCodeScanned = ({ type, data }) => {
		if (isValidEmail(data) == false) {
			setScanned(true);
			alert('Not a valid attendee URL');
		} else {
			setScanned(true);
			addAttendee(data);
		}
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={styles.container}>
			<BarCodeScanner
				onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
				style={StyleSheet.absoluteFillObject}
			/>

			{scanned && (
				<Button
					title={'Tap to Scan Again'}
					onPress={() => setScanned(false)}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	barCodeView: {
		width: '100%',
		height: '50%',
		marginBottom: 40,
	},
});

export default CameraScan;
