import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './app/WelcomePage';
import CalendarPage from './app/CalendarPage';
import ChooseAuthOption from './app/ChooseAuthOption';
import LoginPage from './app/LoginPage';
import SignUpPage from './app/SignUpPage';
import CreateToDo from './app/CreateToDo';
import SuccessfulSignupPage from './app/SuccessfulSignupPage';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ChooseAuthOptionPage" component={ChooseAuthOption} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="SignUpPage" component={SignUpPage} />
        {user && (
          <>
            <Stack.Screen name="CalendarPage" component={CalendarPage} />
            <Stack.Screen name="CreateToDo" component={CreateToDo} />
            <Stack.Screen name="SuccessfulSignupPage" component={SuccessfulSignupPage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
