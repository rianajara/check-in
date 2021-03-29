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
// import RNPickerSelect, { defaultStyles } from './debug';

const sports = [
	{
		label: 'Social',
		value: 'Social',
	},
	{
		label: 'Industry',
		value: 'Industry',
	},
	{
		label: 'Tabling',
		value: 'Tabling',
	},
    {
		label: 'Workshop',
		value: 'Workshop',
	},
    {
		label: 'General Body',
		value: 'General Body',
	},
];

export default class EventTypeDropDown extends React.Component {
	constructor(props) {
		super(props);

		this.inputRefs = {
			firstTextInput: null,
			favSport0: null,
			favSport1: null,
			lastTextInput: null,
			favSport5: null,
		};

		this.state = {
			numbers: [
				{
					label: '1',
					value: 1,
					color: 'orange',
				},
				{
					label: '2',
					value: 2,
					color: 'green',
				},
			],
			favSport0: undefined,
			favSport1: undefined,
			favSport2: undefined,
			favSport3: undefined,
			favSport4: 'baseball',
			previousFavSport5: undefined,
			favSport5: null,
			favNumber: undefined,
		};

		this.InputAccessoryView = this.InputAccessoryView.bind(this);
	}

	InputAccessoryView() {
		return (
			<View style={defaultStyles.modalViewMiddle}>
				<TouchableWithoutFeedback
					onPress={() => {
						this.setState(
							{
								favSport5: this.state.previousFavSport5,
							},
							() => {
								this.inputRefs.favSport5.togglePicker(true);
							}
						);
					}}
					hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}>
					<View testID='needed_for_touchable'>
						<Text
							style={[
								defaultStyles.done,
								{ fontWeight: 'normal', color: 'red' },
							]}>
							Cancel
						</Text>
					</View>
				</TouchableWithoutFeedback>
				<Text>Name | Prefer</Text>
				<TouchableWithoutFeedback
					onPress={() => {
						this.inputRefs.favSport5.togglePicker(true);
					}}
					hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}>
					<View testID='needed_for_touchable'>
						<Text style={defaultStyles.done}>Done</Text>
					</View>
				</TouchableWithoutFeedback>
			</View>
		);
	}

	render() {
		const placeholder = {
			label: 'Type of Event',
			value: null,
			color: 'black',
            placeholderTextColor:'black'
            
		};

		return (
			<View style={{paddingLeft: 10}}>
				<Text
					style={{
						color: '#8691a0',
						fontWeight: '700',
						fontSize: 16,
					}}>
					Event Type:
				</Text>
				{/* and iOS onUpArrow/onDownArrow toggle example */}
				<View style={styles.container}>
					<Icon
						name='profile'
						size={24}
						color='black'
						style={styles.icon}
                        style={{marginRight: 7, marginBottom: 0, marginTop: 8}}
					/>
					<RNPickerSelect
						placeholder={placeholder}
                        placeholderTextColor='black'
						items={sports}
						onValueChange={(value) => {
							this.setState({
								favSport0: value,
							}); this.props.setEventType(value)
						}}
						style={pickerSelectStyles}
						value={this.state.favSport0}
						ref={(el) => {
							this.inputRefs.favSport0 = el;
						}}
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
        marginBottom: 20
        
	},
});

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 18,
		paddingVertical: 12,
		paddingHorizontal: 10,
		color: 'black',
		paddingRight: 30, // to ensure the text is never behind the icon
        width: 300
	},
	inputAndroid: {
		fontSize: 20,
		paddingHorizontal: 10,
		paddingVertical: 8,
		color: 'black',
		paddingRight: 30, // to ensure the text is never behind the icon
        width: 300
	},
});
