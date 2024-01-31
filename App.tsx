import React from 'react';


import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function App(): React.JSX.Element {
const Stack = createNativeStackNavigator();

  return (
    
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen  name="Login" component={Login} />
        <Stack.Screen  name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
// options={{ headerShown: true}}
  );
}

export default App;
