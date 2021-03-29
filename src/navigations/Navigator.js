import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Welcome from '../screens/Welcome';
import Register from '../screens/Register';
import LoginHost from '../screens/LoginHost';
import RegisterHost from '../screens/RegisterHost';
import LoginAttendee from '../screens/LoginAttendee';
import RegisterAttendee from '../screens/RegisterAttendee';
import MainAttendee from '../screens/MainAttendee';
import MainHost from '../screens/MainHost';
import CreateEvent from '../screens/CreateEvent';
import ViewEvents from '../screens/ViewEvents';
import ViewEvent from '../screens/ViewEvent';
import ModifyEvent from '../screens/ModifyEvent';
import ModifyAttendee from '../screens/ModifyAttendee';
import CheckInAttendees from '../screens/CheckInAttendees';
import CameraScan from '../screens/CameraScan';

const stackNavigatorOptions = {
	headerShown: false,
};

const AppNavigator = createStackNavigator(
	{
		Welcome: { screen: Welcome },
		Register: Register,
		LoginHost: LoginHost,
		LoginAttendee: LoginAttendee,
		RegisterHost: RegisterHost,
		RegisterAttendee: RegisterAttendee,
		MainAttendee: MainAttendee,
		MainHost: MainHost,
		CreateEvent: CreateEvent,
		ViewEvents: ViewEvents,
		ViewEvent: ViewEvent,
        ModifyEvent: ModifyEvent,
        ModifyAttendee: ModifyAttendee,
		CheckInAttendees:CheckInAttendees,
    	CameraScan:CameraScan
	},
	{
		defaultNavigationOptions: stackNavigatorOptions,
	}
);
export default createAppContainer(AppNavigator);
