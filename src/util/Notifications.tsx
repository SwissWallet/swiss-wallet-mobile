import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from "@notifee/react-native";

const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Permissão para notificações concedida!');
    }
    else {
        console.log('Permissão para notificações negada!');
    }

    await notifee.requestPermission();
};

const getFCMToken = async () => {
    await messaging().getToken();
};

const setupNotifications = () => {
    requestUserPermission();

    messaging().onMessage(async remoteMessage => {
        console.log('Notificação recebida em primeiro plano!');

        const channelId = await notifee.createChannel({
            id: 'Lembrete',
            name: 'Lembrete',
            vibration: true,
            importance: AndroidImportance.HIGH
        });

        await notifee.displayNotification({
            id: 'Lembrete',
            title: remoteMessage.data?.title,
            body: remoteMessage.data?.body,
            android: {
                channelId,
                pressAction: {
                    id: 'default'
                },
                
            }
        });
    });

}

export default setupNotifications;