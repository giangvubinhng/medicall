import { createStackNavigator } from '@react-navigation/stack';
import BottomBar from './Tabbar/BottomBar';
import { NavigationContainer } from '@react-navigation/native';
import Login from './components/Login';
import firebaseConfig from './config/fbConfig'
import Signup from './components/Signup';


const Stack = createStackNavigator();
  export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Signup" component={Signup}/>
        <Stack.Screen name="Base" component={BottomBar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


