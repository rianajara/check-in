import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import eventData from '../json/events.json';

const colorPicker = (buttonNum) => {
    if (buttonNum % 4 == 1) {
        return '#A88800';
    } else if (buttonNum % 4 == 2) {
        return '#229977';
    } else if (buttonNum % 4 == 3) {
        return '#775555';
    } else {
        return '#881122';
    }
};

//this is test comment

const borderColorPicker = (buttonNum) => {
    if (buttonNum % 4 == 1) {
        return '#755500';
    } else if (buttonNum % 4 == 2) {
        return '#006644';
    } else if (buttonNum % 4 == 3) {
        return '#442222';
    } else {
        return '#550000';
    }
};

const ViewEvents = (props) => {
    const image = require('../images/image.png');

	return (
		<View style={styles.contentContainer}>
			<View style={styles.scrollViewOuterView}>
				<ScrollView style={styles.scrollView}>
					{eventData['events'].map((data, key) => (
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
									{data['Event Name']}
								</Text>
								<Text style={styles.buttonDetailText}>
									{data['Date']}, {data['Time']}
								</Text>
								<Text style={styles.buttonDetailText}>
									{data['Location']}
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
						{ backgroundColor: '#66B2FF' },
						{ borderColor: '#007FFF' },
					]}>
					<Text style={styles.buttonViewText}>Past Events</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.buttonView,
						{ backgroundColor: '#FF6666' },
						{ borderColor: '#FF0000' },
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
		fontSize: 30,
		fontWeight: '600',
	},
	buttonDetailText: {
		fontSize: 20,
		marginTop: -5,
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
// https://www.npmjs.com/package/react-native-modal-datetime-picker


