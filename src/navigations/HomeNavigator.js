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
import ViewEventScreen from '@Screens/Home/ViewEvent';
import ViewEventsScreen from '@Screens/Home/ViewEvents';
import ViewAccount_Attendee from '@Screens/Home/ViewAccount_Attendee';
import ViewAccount_Host from '@Screens/Home/ViewAccount_Host';

import ModifyEvent from '@Screens/Home/ModifyEvent';
import ModifyAttendee from '@Screens/Home/ModifyAttendee';
import ModifyHost from '@Screens/Home/ModifyHost';

import CreateEventScreen from '@Screens/Home/CreateEvent';

import CheckInAttendees from '@Screens/Home/CheckInAttendees';

import { defaultOption, defaultOption2 } from './Options';

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

      <Stack.Screen
        name="ViewEvent"
        component={ViewEventScreen}
        options={({ navigation, route }) =>
          defaultOption({ navigation, route, title: 'View Event' })
        }
      />
      <Stack.Screen
        name="ViewEvents"
        component={ViewEventsScreen}
        options={({ navigation, route }) =>
          defaultOption({ navigation, route, title: 'View Events' })
        }
      />

      <Stack.Screen
        name="ViewAccount_Attendee"
        component={ViewAccount_Attendee}
        options={({ navigation, route }) =>
          defaultOption({ navigation, route, title: 'Attendde Account' })
        }
      />

      <Stack.Screen
        name="ViewAccount_Host"
        component={ViewAccount_Host}
        options={({ navigation, route }) =>
          defaultOption({ navigation, route, title: 'Host Account' })
        }
      />
      <Stack.Screen
        name="ModifyEvent"
        component={ModifyEvent}
        options={({ navigation, route }) =>
          defaultOption({ navigation, route, title: 'Modify Event' })
        }
      />
      <Stack.Screen
        name="ModifyAttendee"
        component={ModifyAttendee}
        options={({ navigation, route }) =>
          defaultOption({ navigation, route, title: 'Modify Student Attendee' })
        }
      />
      <Stack.Screen
        name="ModifyHost"
        component={ModifyHost}
        options={({ navigation, route }) =>
          defaultOption({ navigation, route, title: 'Modify Host Account' })
        }
      />
      {
        <Stack.Screen
          name="CreateEvent"
          component={CreateEventScreen}
          options={({ navigation, route }) =>
            defaultOption({ navigation, route, title: 'Create Event' })
          }
        />
      }
      <Stack.Screen
        name="CheckInAttendees"
        component={CheckInAttendees}
        options={({ navigation, route }) =>
          defaultOption({ navigation, route, title: 'Check In Attendees' })
        }
      />
    </Stack.Navigator>
  );
};
