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

const colorPicker = (buttonNum) => {
    if(buttonNum % 4 == 1){
        return "#A88800"
    }else if(buttonNum % 4 == 2){
        return "#229977"
    }else if(buttonNum % 4 == 3){
        return "#775555"
    }else{
        return "#881122"
    }
}

//this is test comment

const borderColorPicker = (buttonNum) => {
    if(buttonNum % 4 == 1){
        return "#755500"
    }else if(buttonNum % 4 == 2){
        return "#006644"
    }else if(buttonNum % 4 == 3){
        return "#442222"
    }else{
        return "#550000"
    }
}

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

const ViewEvent = (props) => {
	const image = require('../images/image.png');

	return (
		<View style={styles.contentContainer}>
			<ScrollView style={styles.scrollView}>
				{eventData['events'].map((data, key) => (
					<View key={key}>
						<TouchableOpacity style={[styles.eventButton, {backgroundColor: colorPicker(key), borderColor: borderColorPicker(key)}]} key={key}>
							<Text style={styles.buttonTitleText}>{data['Event Name']}</Text>
							<Text style={styles.buttonDetailText}>{data['Date']}, {data['Time']}</Text>
							<Text style={styles.buttonDetailText}>{data['Location']}</Text>
						</TouchableOpacity>
					</View>
				))}
			</ScrollView>
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
	scrollView: {
		marginHorizontal: 20,
        width: "90%"
	},
	eventButton: {
		width: '100%',
        height: 100,
        backgroundColor: "green",
        borderRadius: 8,
        borderColor: "black",
        borderWidth: 5,
        marginVertical: "5%",
        padding: 10
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
        fontSize:30,
        fontWeight: "600"
    },
    buttonDetailText: {
        fontSize:20
    },
    
    
});

export default ViewEvent;
// https://www.npmjs.com/package/react-native-modal-datetime-picker
