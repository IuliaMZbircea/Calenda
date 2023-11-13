import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';

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

  const handleSignUp = () => {
    // Input validation
    if (!name || !surname || !email || !password || !birthdate) {
      Alert.alert('Validation Error', 'All fields are required');
      return;
    }

    console.log('Signing up with:', email, password, name, surname, birthdate);
    handleGetStarted();
  };

  const handleLoginRedirect = () => {
    navigation.navigate('LoginPage');
  };

  const handleGetStarted = () => {
    navigation.navigate('CalendarPage');
  };

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

      <Button title="Sign Up" onPress={handleSignUp}/>
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
