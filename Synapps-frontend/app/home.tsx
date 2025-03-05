import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/homePageStyles';

type ButtonType = {
  id: number;
  icon?: any;
  text: string;
  apiName: string;
  isMore?: boolean;
};

const HomePage = () => {
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);

  const primaryButtons: ButtonType[] = [
    { id: 1, icon: require('../assets/images/eyelogo.png'), text: 'Eye specialist', apiName: 'Eye specialist' },
    { id: 2, icon: require('../assets/images/skinlogo.png'), text: 'Dermatology', apiName: 'Dermatologist' },
    { id: 3, icon: require('../assets/images/heartlogo.png'), text: 'Cardiologist', apiName: 'Cardiologist' },
    { id: 4, icon: require('../assets/images/teethlogo.png'), text: 'Dentist', apiName: 'Dentist' },
    { id: 5, icon: require('../assets/images/brainlogo.png'), text: 'Neurologist', apiName: 'Neurologist' },
    { id: 6, text: '+ More', apiName: '', isMore: true },
  ];

  const moreButtons: ButtonType[] = [
    { id: 7, icon: require('../assets/images/entlogo.png'), text: 'ENT', apiName: 'ENT' },
    { id: 8, icon: require('../assets/images/pedilogo.png'), text: 'Paediatrics', apiName: 'Paediatrics' },
    { id: 9, icon: require('../assets/images/obglogo.png'), text: 'Ob-gyn', apiName: 'Ob-gyn' },
    { id: 10, icon: require('../assets/images/psychlogo.png'), text: 'Psychiatry', apiName: 'Psychiatry' },
    { id: 11, icon: require('../assets/images/physilogo.png'), text: 'Physician', apiName: 'Physician' },
  ];

  const handleNavigation = (apiName: string, isMore?: boolean) => {
    if (isMore) {
      setShowMore(true);
    } else {
      router.push({
        pathname: "/doctors/[speciality]",
        params: { speciality: apiName },
      } as const);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.hiText}>Hi,</Text>
      <Text style={styles.welcomeText}>Welcome Back</Text>
      <FlatList
        contentContainerStyle={styles.scrollContainer}
        data={showMore ? [...primaryButtons.filter(item => !item.isMore), ...moreButtons] : primaryButtons}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.featureButton}
            onPress={() => handleNavigation(item.apiName, item.isMore)}
          >
            {item.icon && <Image source={item.icon} style={styles.buttonIcon} />}
            <Text style={styles.buttonText}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
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
