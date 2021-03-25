import React from 'react';
import {
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
  Platform,
} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import MainHostScreen from '@Screens/Home/MainHost';
import MainAttendeeScreen from '@Screens/Home/MainAttendee';

const Stack = createStackNavigator();

export default HomeNavigator = ({ initialRouteName }) => {
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name="mainHost"
        component={MainHostScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="mainAttendee"
        component={MainAttendeeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
