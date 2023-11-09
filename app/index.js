import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from './components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();
    
    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome to Calenda</Text>
            <Text style={styles.subText}>A new way to organize your time efficiently.</Text>
            <CustomButton
                title="Get Started"
                onPress={() => navigation.navigate('NextPage')} 
                
            />
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
