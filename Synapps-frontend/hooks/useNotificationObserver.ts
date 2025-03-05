import * as Notifications from 'expo-notifications';
import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';

export default function usePushNotification() {
    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            if (token) console.log('Expo Push Token:', token);
        }).catch(error => {
            console.error('Error registering for push notifications:', error);
        });

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            console.log('📩 Notification Received:', notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('📨 Notification Response:', response);
        });

        return () => {
            if (notificationListener.current) {
                Notifications.removeNotificationSubscription(notificationListener.current);
            }
            if (responseListener.current) {
                Notifications.removeNotificationSubscription(responseListener.current);
            }
        };
    }, []);
}

async function registerForPushNotificationsAsync(): Promise<string | undefined> {
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (!Device.isDevice) {
        alert('⚠ Must use a physical device for push notifications.');
        return;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        alert('🚫 Failed to get push token!');
        return;
    }

    try {
        const tokenResult = await Notifications.getExpoPushTokenAsync();
        return tokenResult.data;
    } catch (error) {
        console.error('Error getting push token:', error);
        return;
    }
}

export async function sendPushNotification() {
    await Notifications.scheduleNotificationAsync({
    content: {
        title: '🔔 Hello!',
        body: 'This is a push notification!',
        data: { someData: 'goes here' },
    },
    trigger: {
        seconds: 1, // 1 hour
        repeats: false,
    },
});

    
}