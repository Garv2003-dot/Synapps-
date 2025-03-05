import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './styles/landingPageStyles';

const LandingPage=()=>{
    const router=useRouter();

    return (
        <View style={styles.container}>
          <Image source={require('../assets/images/synappslogo.jpeg')} style={styles.logo} />
          <TouchableOpacity style={styles.button} onPress={() => router.push('/loginPage')}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <Text style={styles.newUserText}>New to this app?{' '}
          <Text 
            style={styles.registerText} 
              onPress={() => router.push('/registerPage')}
          >
            Register
          </Text>
          </Text>
        </View>
      );
};
export default LandingPage;