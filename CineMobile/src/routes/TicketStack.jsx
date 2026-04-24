import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen.jsx';
import SucursalScreen from './screens/SucursalScreen.jsx';

const Stack = createNativeStackNavigator();

const TicketStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SucursalScreen"
        component={SucursalScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default TicketStack;
