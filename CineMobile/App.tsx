import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, } from 'react-native-safe-area-context';
import TicketStack from './src/routes/TicketStack';

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TicketStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;