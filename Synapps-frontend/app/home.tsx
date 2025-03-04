import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/homePageStyles';

const HomePage = () => {
  const router=useRouter();
  const buttons = [
    { id: 1, icon: require('../assets/images/eyelogo.png'), text: 'Eye Specialist' },
    { id: 2, icon: require('../assets/images/skinlogo.png'), text: 'Dermatology Specialist' },
    { id: 3, icon: require('../assets/images/heartlogo.png'), text: 'Cardiology Specialist' },
    { id: 4, icon: require('../assets/images/teethlogo.png'), text: 'Dental Specialist' },
    { id: 5, icon: require('../assets/images/brainlogo.png'), text: 'Neurology Specialist' },
    { id: 6, text: '+ More' },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.hiText}>Hi,</Text>
      <Text style={styles.welcomeText}>Welcome Back</Text>

      <View style={styles.buttonsContainer}>
        {buttons.map((btn) => (
          <TouchableOpacity key={btn.id} style={styles.featureButton}>
            {btn.icon ? (
              <>
                <Image source={btn.icon} style={styles.buttonIcon} />
                <Text style={styles.buttonText}>{btn.text}</Text>
              </>
            ) : (
              <View style={styles.moreButton}>
                <Text style={styles.moreButtonText}>{btn.text}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="home-outline" size={28} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="calendar-outline" size={28} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="person-outline" size={28} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomePage;