import { createStackNavigator } from '@react-navigation/stack';
import BottomBar from './Tabbar/BottomBar';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Base" component={BottomBar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


