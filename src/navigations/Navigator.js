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
import ModifyHost from '../screens/ModifyHost';
import CheckInAttendees from '../screens/CheckInAttendees';
import CameraScan from '../screens/CameraScan';
import ViewAccount_Attendee from '../screens/ViewAccount_Attendee';
import ViewAccount_Host from '../screens/ViewAccount_Host';
import { UserProvider } from '../context/UserContext';

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
		ViewAccount_Attendee:ViewAccount_Attendee,
		MainHost: MainHost,
		ViewAccount_Host:ViewAccount_Host,
		CreateEvent: CreateEvent,
		ViewEvents: ViewEvents,
		ViewEvent: ViewEvent,
        ModifyEvent: ModifyEvent,
		ModifyHost:ModifyHost,
        ModifyAttendee: ModifyAttendee,
		CheckInAttendees:CheckInAttendees,
    	CameraScan:CameraScan
	},
	{
		defaultNavigationOptions: stackNavigatorOptions,
	}
);
export default createAppContainer(AppNavigator);
