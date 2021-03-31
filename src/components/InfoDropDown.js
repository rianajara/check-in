import React from 'react';
import {
	Button,
	Text,
	TextInput,
	Platform,
	ScrollView,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/AntDesign';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import { majors } from '../json/majors.json';
import { eventTypes } from '../json/eventTypes.json';



export default class InfoDropDown extends React.Component {
	constructor(props) {
		super(props);
	}

	dropDownTyper()  {
		return (this.props.dropDownType === "event") ? {eventTypes}.eventTypes : {majors}.majors;
	}

	render() {
		const placeholder = {
			label: this.props.labelInfo,
			value: null,
			color: 'black',
			placeholderTextColor: 'black',
		};

		const dataTypes = this.dropDownTyper.bind(this);
		

		

		return (
			
			<View style={{ paddingLeft: 10 }}>
				<Text
					style={{
						color: '#8691a0',
						fontWeight: '700',
						fontSize: 16,
					}}>
					{this.props.labelInfo}:
				</Text>
				{/* and iOS onUpArrow/onDownArrow toggle example */}
				<View style={styles.container}>
					<Icon
						name='profile'
						size={24}
						color='black'
						style={styles.icon}
						style={{
							marginRight: 7,
							marginBottom: 0,
							marginTop: 11,
						}}
					/>
					<RNPickerSelect
					
						placeholder={placeholder}
						placeholderTextColor='black'
						items={dataTypes()}
						onValueChange={(value) => {
							this.props.setDataType(value);
						}}
						style={pickerSelectStyles}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flex: 1,
		borderBottomWidth: 1,
		borderColor: '#aeb7be',
		width: '97%',
		marginBottom: 20,
	},
});

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 18,
		paddingVertical: 12,
		paddingHorizontal: 10,
		color: 'black',
		paddingRight: 30, // to ensure the text is never behind the icon
		width: 300,
	},
	inputAndroid: {
		fontSize: 20,
		paddingHorizontal: 10,
		paddingVertical: 22.5,
		color: 'black',
		paddingRight: 30, // to ensure the text is never behind the icon
		width: 300,
	},
});
