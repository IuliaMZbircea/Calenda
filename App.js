import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '.app/WelcomePage';
import CalendarPage from '.app/CalendarPage';
import ChooseAuthOption from '.app/ChooseAuthOption';
import LoginPage from '.app/LoginPage';
import SignUpPage from '.app/SignUpPage';
import SuccessfulSignupPage from './app/SuccessfulSignupPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ChooseAuthOptionPage" component={ChooseAuthOption} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="SignUpPage" component={SignUpPage} />
        <Stack.Screen name="NextPage" component={CalendarPage} />
        <Stack.Screen name="SuccessfulSignupPage" component={SuccessfulSignupPage} />
        {/*other screens*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
