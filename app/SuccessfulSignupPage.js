import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SuccessfulSignupPage = () => {
  const navigation = useNavigation();

  const handleContinue = () => {
    // Navigate to the login page
    navigation.navigate('LoginPage');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleContinue}>
      <View>
        <Text style={styles.message}>Sign-Up Successful 🎉</Text>
        <Text style={styles.instructions}>Click on the screen to continue</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  instructions: {
    fontSize: 16,
    color: '#555',
  },
});

export default SuccessfulSignupPage;
