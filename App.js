import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './app/index'; 
import NextPage from './app/NextPage'; 

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="NextPage" component={NextPage} />
        {/*other screens*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;