// ChooseAuthOption.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';


const ChooseAuthOption = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('LoginPage');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUpPage');
  };

  return (
    <LinearGradient colors={['#f5f5f5', '#f5f5f5']} style={styles.container}>
      <View style={styles.contentContainer}>
        
        <Text style={styles.questionText}>You are here to...</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>

          <Text style={styles.buttonText}>Log In  </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          
          <Text style={styles.buttonText}>Sign Up  </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    alignItems: 'center',
  },
  
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0492C2', 
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginVertical: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 12,
  },
  icon: {
    marginRight: 12,
  },
});




export default ChooseAuthOption;
