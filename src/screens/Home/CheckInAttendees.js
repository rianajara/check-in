import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import eventData from '../../json/events.json';

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

const CheckInAttendees = (props) => {
  return (
    <View style={styles.contentContainer}>
      <Text
        style={{
          fontSize: 15,
          fontFamily: 'Bold',
          alignSelf: 'center',
        }}>
        Choose an event to check in attendees
      </Text>
      <View style={styles.scrollViewOuterView}>
        <ScrollView style={styles.scrollView}>
          {eventData['events'].map((data, key) => (
            <View key={key}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('CameraScan', {
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
                <Text style={styles.buttonTitleText}>{data['Event Name']}</Text>
                <Text style={styles.buttonDetailText}>
                  {data['Date']}, {data['Time']}
                </Text>
                <Text style={styles.buttonDetailText}>{data['Location']}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
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

export default CheckInAttendees;
