import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;

    }

    if (!validatePassword(password)) {
      Alert.alert(
        'Invalid Password',
        'Password must be at least 6 characters long.'
      );
      return;
    }

    // Add your login logic here
    console.log('Logging in with:', email, password);
    handleGetStarted();
  };

  const validateEmail = (email) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Password must be at least 6 characters long
    return password.length >= 6;
  };

  const handleSignupRedirect = () => {
    navigation.navigate('SignUpPage');
  };

  const handleGetStarted = () => {
    navigation.navigate('CalendarPage');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>
      <Button title="Login" onPress={handleLogin} /> 
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>
          Don't have an account?{' '}
          <Text style={styles.link} onPress={handleSignupRedirect}>
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    color: '#555',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    color: '#333',
  },
  datePickerButton: {
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  datePickerButtonText: {
    fontSize: 16,
    color: '#333',
  },
  signUpButton: {
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
  },
  signUpButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  loginText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#555',
  },
  link: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  signupContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
  },
  signupText: {
    textAlign: 'center',
    color: '#555',
  },
});

export default LoginPage;
