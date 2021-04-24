import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import QRCode from 'react-native-qrcode-svg';
import { UserContext } from '../context/UserContext.js';
import { useContext } from 'react';
import Firebase from '../components/Firebase';

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
  

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	function isValidEmail( value ) {
		return /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,5}$/.test( value );
	}
	

	const addAttendee = (data) => {
    
		db.collection('OrgEvents')
			.doc(currentUser['hostOrg'])
			.collection('Events')
			.doc(title)
			.collection('Attendees')
			.doc(data)
			.set(
				{
					Attendees: '',
        }
			);
	};

	const handleBarCodeScanned = ({ type, data }) => {

		if (isValidEmail(data) == false){
			setScanned(true);
			alert('Not a valid attendee URL');
		}
		else{
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
