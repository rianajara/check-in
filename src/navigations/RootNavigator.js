import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '@Screens/Welcome';
import RegisterScreen from '@Screens/Register';
import LoginHostScreen from '@Screens/LoginHost';
import LoginAttendeeScreen from '@Screens/LoginAttendee';
import RegisterAttendeeScreen from '@Screens/RegisterAttendee';
import RegisterHostScreen from '@Screens/RegisterHost';

import { defaultOption, defaultOption2 } from './Options';

const Stack = createStackNavigator();

export default RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="welcome">
      <Stack.Screen
        name="welcome"
        component={WelcomeScreen}
        options={{
          headerShown: false,
          headerTransparent: true,
        }}
      />

      <Stack.Screen
        name="loginHost"
        component={LoginHostScreen}
        options={({ navigation, route }) =>
          defaultOption2({ navigation, route, title: '' })
        }
      />
      <Stack.Screen
        name="loginAttendee"
        component={LoginAttendeeScreen}
        options={({ navigation, route }) =>
          defaultOption2({ navigation, route, title: '' })
        }
      />

      <Stack.Screen
        name="register"
        component={RegisterScreen}
        options={({ navigation, route }) =>
          defaultOption2({ navigation, route, title: '' })
        }
      />
      <Stack.Screen
        name="registerHost"
        component={RegisterHostScreen}
        options={({ navigation, route }) =>
          defaultOption2({
            navigation,
            route,
            title: 'Register Organization Host',
          })
        }
      />
      <Stack.Screen
        name="registerAttendee"
        component={RegisterAttendeeScreen}
        options={({ navigation, route }) =>
          defaultOption2({
            navigation,
            route,
            title: 'Register Student Attendee',
          })
        }
      />
    </Stack.Navigator>
  );
};
