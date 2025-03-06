import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { sendPushNotification } from '@/hooks/useNotificationObserver';

const ConfirmationPage = () => {
  const router = useRouter();
  useEffect(() => {
    const sendNotification = async () => {
      try {
        await sendPushNotification();
        console.log('Push notification scheduled');
      } catch (error) {
        console.error('Error sending push notification:', error);
      }
    };

    sendNotification();
  }, []);
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/tick.png')} style={styles.image} />
      <Text style={styles.title}>Appointment Booked</Text>
      <Text style={styles.message}>
        Your appointment has been successfully booked, you can have a consultation session with your trusted doctor.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
});

export default ConfirmationPage;