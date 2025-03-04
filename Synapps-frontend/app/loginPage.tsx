import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import loginPageStyles from './styles/loginPageStyles';
import { useRouter } from 'expo-router';

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/home'); 
  };

  return (
    <View style={loginPageStyles.container}>
      <Text style={loginPageStyles.title}>Synapps</Text>
      <Text style={loginPageStyles.subtitle}>Welcome Back</Text>
      <View style={loginPageStyles.inputContainer}>
        <TextInput 
          placeholder="Email" 
          style={loginPageStyles.input} 
          keyboardType="email-address"
        />
        <Ionicons name="mail-outline" size={24} style={loginPageStyles.icon} />
      </View>
      <View style={loginPageStyles.inputContainer}>
        <TextInput 
          placeholder="Password" 
          style={loginPageStyles.input} 
          secureTextEntry
        />
        <Ionicons name="lock-closed-outline" size={24} style={loginPageStyles.icon} />
      </View>
      <TouchableOpacity style={loginPageStyles.loginButton} onPress={handleLogin}>
        <Text style={loginPageStyles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;
