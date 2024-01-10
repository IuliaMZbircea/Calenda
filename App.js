import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '.app/WelcomePage';
import CalendarPage from '.app/CalendarPage';
import ChooseAuthOption from '.app/ChooseAuthOption';
import LoginPage from '.app/LoginPage';
import SignUpPage from '.app/SignUpPage';
import CreateTaskPage from './app/CreateTaskPage';
import CreateToDo from '.app/CreateToDo';
import SuccessfulSignupPage from './app/SuccessfulSignupPage';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { User } from 'firebase/auth'; 

const Stack = createStackNavigator();

//const InsideStack = createStackNavigator();

// function InsideLayout() {
//   return (
//     <InsideStack.Navigator>
//       <InsideStack.Screen name="NextPage" component={CalendarPage}></InsideStack.Screen>
//     </InsideStack.Navigator>
//   )
// }

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user',user);
      setUser(user);
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ChooseAuthOptionPage" component={ChooseAuthOption} />
        {user ? (
          <Stack.Screen name="NextPage" component={CalendarPage} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="SignUpPage" component={SignUpPage} />
          </>
        )}
        <Stack.Screen name="CreateToDo" component={CreateToDo} />
        <Stack.Screen name="SuccessfulSignupPage" component={SuccessfulSignupPage} />
        {/* other screens */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
