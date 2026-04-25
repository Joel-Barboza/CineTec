import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen.jsx';
// import SucursalScreen from './screens/SucursalScreen.jsx';
// import MovieScreen from './screens/MovieScreen.jsx';
// import ProjectionScreen from './screens/ProjectionScreen.jsx';
// import SeatsScreen from './screens/SeatsScreen.jsx';

const Stack = createNativeStackNavigator();

const TicketStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="SucursalScreen"
        component={SucursalScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MovieScreen"
        component={MovieScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProjectionScreen"
        component={ProjectionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SeatsScreen"
        component={SeatsScreen}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
};

export default TicketStack;
