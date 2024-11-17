import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export const scheduleMedicineNotification = async (
    medName: string,
    alarmTime: { hour: number; minute: number },
    days: number[]
) => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
        alert('You need to grant notification permissions to set medicine reminders.');
        return null;
    }

    const existingNotifications = await Notifications.getAllScheduledNotificationsAsync();
    const medicineNotifications = existingNotifications.filter(
        notification => notification.content.data.medName === medName
    );

    for (const notification of medicineNotifications) {
        await Notifications.cancelScheduledNotificationAsync(notification.identifier);
    }

    const notificationIds = [];

    for (const day of days) {
        const trigger = {
            hour: alarmTime.hour,
            minute: alarmTime.minute,
            weekday: day + 1,
            repeats: true,
        };

        try {
            const id = await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Medicine Reminder",
                    body: `Time to take ${medName}!`,
                    data: { medName },
                    sound: true,
                },
                trigger,
            });
            console.log('Notification scheduled for', trigger);
            notificationIds.push(id);
        } catch (error) {
            console.error('Error scheduling notification:', error);
        }
    }

    return notificationIds;
};

export const cancelMedicineNotifications = async (medName: string) => {
    const existingNotifications = await Notifications.getAllScheduledNotificationsAsync();
    const medicineNotifications = existingNotifications.filter(
        notification => notification.content.data.medName === medName
    );

    for (const notification of medicineNotifications) {
        await Notifications.cancelScheduledNotificationAsync(notification.identifier);
    }
};

export const initializeNotifications = async () => {
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
};