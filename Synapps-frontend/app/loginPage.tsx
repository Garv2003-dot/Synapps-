import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import loginPageStyles from './styles/loginPageStyles';
import { useRouter } from 'expo-router';
import supabase from './config/supabaseClient'; 

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>(''); 
  const [error, setError] = useState<string | null>(null);


  const handleLogin = async () => {

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const { data, error: fetchError } = await supabase
        .from('users')
        .select('email, password_hash')
        .eq('email', email)
        .single();  

      console.log('Data from Supabase:', data); 
      console.log('Fetch error:', fetchError);

      if (fetchError || !data) {
        setError("User not found.");
        return;
      }

      if (password === data.password_hash) {
        router.push('/home');  
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      console.error("An error occurred:", err);
      setError("An error occurred. Please try again later.");
    }
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
          value={email}
          onChangeText={setEmail}
        />
        <Ionicons name="mail-outline" size={24} style={loginPageStyles.icon} />
      </View>
      <View style={loginPageStyles.inputContainer}>
        <TextInput 
          placeholder="Password" 
          style={loginPageStyles.input} 
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Ionicons name="lock-closed-outline" size={24} style={loginPageStyles.icon} />
      </View>

      {error && <Text style={loginPageStyles.errorText}>{error}</Text>}

      <TouchableOpacity style={loginPageStyles.loginButton} onPress={handleLogin}>
        <Text style={loginPageStyles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;
