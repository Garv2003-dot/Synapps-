import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import registerPageStyles from './styles/registerPageStyles';
import { useRouter } from 'expo-router';
import supabase from './config/supabaseClient';
import * as Crypto from 'expo-crypto';

const RegisterPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const hashPassword = async (password: string) => {
    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
    return hashedPassword;
  };

  const handleRegister = async () => {
    if (!email || !password || !fullName || !phone) {
      setError("Please fill all the fields.");
      return;
    }

    try {
      const hashedPassword = await hashPassword(password);

      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password: hashedPassword, 
      });

      if (signupError) {
        setError(signupError.message);
        return;
      }

      const user = data?.user;

      const { data: insertData, error: insertError } = await supabase
        .from('users')
        .insert([
          { user_id: user?.id, email, full_name: fullName, phone: phone, password_hash: hashedPassword }, 
        ]);

      if (insertError) {
        setError(insertError.message);
        return;
      }

      setSuccess("Registration successful! Please check your email for confirmation.");
      router.push('/loginPage');
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <View style={registerPageStyles.container}>
      <Text style={registerPageStyles.title}>Synapps</Text>
      <Text style={registerPageStyles.subtitle}>Create a New Account</Text>

      <View style={registerPageStyles.inputContainer}>
        <TextInput
          placeholder="Full Name"
          style={registerPageStyles.input}
          value={fullName}
          onChangeText={setFullName}
        />
        <Ionicons name="person-outline" size={24} style={registerPageStyles.icon} />
      </View>

      <View style={registerPageStyles.inputContainer}>
        <TextInput
          placeholder="Email"
          style={registerPageStyles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Ionicons name="mail-outline" size={24} style={registerPageStyles.icon} />
      </View>

      <View style={registerPageStyles.inputContainer}>
        <TextInput
          placeholder="Password"
          style={registerPageStyles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Ionicons name="lock-closed-outline" size={24} style={registerPageStyles.icon} />
      </View>

      <View style={registerPageStyles.inputContainer}>
        <TextInput
          placeholder="Phone Number"
          style={registerPageStyles.input}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <Ionicons name="call-outline" size={24} style={registerPageStyles.icon} />
      </View>

      {error && <Text style={registerPageStyles.errorText}>{error}</Text>}

      {success && <Text style={registerPageStyles.successText}>{success}</Text>}

      <TouchableOpacity style={registerPageStyles.registerButton} onPress={handleRegister}>
        <Text style={registerPageStyles.registerText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/loginPage')}>
        <Text style={registerPageStyles.loginLink}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterPage;
