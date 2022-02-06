import {createStackNavigator} from '@react-navigation/stack';
import BottomBar from './Tabbar/BottomBar';
import {NavigationContainer} from '@react-navigation/native';
import Login from './components/Login';
import Signup from './components/Signup';
import AddPill from './components/crud/AddPill';
import {LogBox} from 'react-native'
import Pill from './components/Pill';

LogBox.ignoreAllLogs()
const Stack = createStackNavigator();
export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{
				headerShown: false
			}}>
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="Signup" component={Signup} />
				<Stack.Screen name="Base" component={BottomBar} />
				<Stack.Screen name="AddPill" component={AddPill} options={{
					title: 'Add Med',
					headerShown: true,
					headerTintColor: 'black',
				}} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}


