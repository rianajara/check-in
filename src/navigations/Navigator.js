import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Welcome from '../screens/Welcome';
import Register from '../screens/Register';
import RegisterHost from '../screens/RegisterHost';

const stackNavigatorOptions = {
    headerShown:false
}

const AppNavigator = createStackNavigator({
    Welcome:{screen:Welcome},
    Register:{screen:Register},
    RegisterHost:{screen:RegisterHost}

},
{
    defaultNavigationOptions : stackNavigatorOptions
}  
);
export default createAppContainer(AppNavigator);

 