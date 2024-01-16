import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from './components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    // Navigate to a screen where the user can choose between login and sign-up
    navigation.navigate('ChooseAuthOptionPage');
  };
  useEffect(() => {
    // Disable the header for this screen
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Calenda</Text>
      <Text style={styles.subText}>A new way to organize your time efficiently.</Text>
      <CustomButton title="Get Started  " onPress={handleGetStarted} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#fff',
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    subText: {
      fontSize: 16,
      marginBottom: 32,
    },
  });
  

export default Home;
