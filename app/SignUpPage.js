import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUpPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // Format the date as needed
    const formattedDate = date.toISOString().split('T')[0];
    setBirthdate(formattedDate);
    hideDatePicker();
  };

  const isEmailValid = (email) => {
    // Regular expression for a valid email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isNameValid = (name) => {
    // You can define your own validation logic for the name
    // For example, checking if it contains only letters
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
  };

  const isPasswordValid = (password) => {
    // You can define your own validation logic for the password
    // For example, checking if it has a minimum length
    return password.length >= 6;
  };

  const isSurnameValid = (surname) => {
    // You can define your own validation logic for the surname
    // For example, checking if it contains only letters
    const surnameRegex = /^[a-zA-Z]+$/;
    return surnameRegex.test(surname);
  };

  const handleSignUp = () => {
    // Input validation
    if (!isNameValid(name)) {
      Alert.alert('Validation Error', 'Invalid name');
      return;
    }

    if (!isSurnameValid(surname)) {
      Alert.alert('Validation Error', 'Invalid surname');
      return;
    }

    if (!isEmailValid(email)) {
      Alert.alert('Validation Error', 'Invalid email');
      return;
    }

    if (!isPasswordValid(password)) {
      Alert.alert('Validation Error', 'Password should be at least 6 characters');
      return;
    }

    if (!birthdate) {
      Alert.alert('Validation Error', 'Birthdate is required');
      return;
    }

    // If all validations pass, proceed with sign-up
    console.log('Signing up with:', email, password, name, surname, birthdate);
    handleGetStarted();
  };

  const handleLoginRedirect = () => {
    navigation.navigate('LoginPage');
  };

  const handleGetStarted = () => {
    navigation.navigate('SuccessfulSignupPage');
  };

  const signUp = async () => {
   
    try{
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert('Check your emails!');
    } catch (error) {
      console.log(error);
      alert('Sign in failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Surname</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your surname"
          value={surname}
          onChangeText={(text) => setSurname(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
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

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Birthdate</Text>
        <Button title={birthdate ? birthdate : 'Select your birthdate'} onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>

      <Button title="Sign Up" onPress={signUp} />
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text style={styles.link} onPress={handleLoginRedirect}>
            Login
          </Text>
        </Text>
      </View>
    </ScrollView>
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
  loginContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
  },
  link: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});

export default SignUpPage;

