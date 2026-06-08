import { Platform } from 'react-native';
import notifee, {
  EventType,
  AndroidStyle,
  AndroidImportance,
  AuthorizationStatus,
} from '@notifee/react-native';
import {
  getMessaging,
  RemoteMessage,
  getInitialNotification,
  FirebaseMessagingTypes,
  onNotificationOpenedApp,
} from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';
import { getAnalytics } from '@react-native-firebase/analytics';
import { initializeRNCallKeep } from './RNCallKeepHandler';
import { resetCallState, setupSipConnection } from '../calls/callEvents';
import { navigate } from '../navigation/RootNavigation';
import { NotificationCode } from '../types/EnumType';
import { delay } from './Helper';

const app = getApp();
export const messaging = getMessaging(app);
export const analytics = getAnalytics(app);

export const handleInitialNotification = async () => {
  const initialNotification = await getInitialNotification(messaging);

  if (
    initialNotification?.data?.code ===
    NotificationCode.COMMUNICATION_LIVE_WEB_CHAT_NEW_REQUEST
  ) {
    handleNotificationNavigation(initialNotification, 'WebChat');
  }
  if (
    initialNotification &&
    initialNotification.data?.type !== 'incoming_call'
  ) {
    setTimeout(() => {
      handleNotificationOpened(initialNotification);
    }, 4000);
  }

  const onNotificationOpenedAppHandler = async (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    console.log('onNotificationOpenedAppHandler-----', remoteMessage);
    if (remoteMessage.data?.type !== 'incoming_call') {
      handleNotificationOpened(remoteMessage);
    }
  };

  const unsubscribeNotificationOpenedApp = onNotificationOpenedApp(
    messaging,
    onNotificationOpenedAppHandler,
  );

  const unsubscribeForegroundEvent = notifee.onForegroundEvent(
    ({ type, detail }) => {
      if (type === EventType.PRESS) {
        console.log('Notification pressed:', detail);
        const notificationId = detail?.notification?.id;
        notificationId && notifee.cancelNotification(notificationId);
      }
    },
  );

  return () => {
    unsubscribeNotificationOpenedApp();
    unsubscribeForegroundEvent();
  };
};

export const handleNotificationOpened = async (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) => {
  console.log('handleNotificationOpened--------', remoteMessage);
};

export const handleBackgroundMessage = async (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) => {
  console.log('remote----bg------', remoteMessage);

  if (remoteMessage?.data && remoteMessage?.data?.type == 'incoming_call') {
    setupSipConnection();
  } else {
    await onDisplayNotification(remoteMessage);
  }
};

export const onDisplayNotification = async (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) => {
  const settings = await notifee.requestPermission();
  if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
    console.log('Permission settings:', settings);
  } else {
    console.log('User declined permissions');
  }

  const updatedTitle = remoteMessage.notification?.title ?? 'New Message';

  let body = remoteMessage?.notification?.body || '';
  let media = remoteMessage?.data?.media || '';

  showNotification(updatedTitle, body, media);
};

export const showNotification = async (
  title: string,
  message: string,
  media: any,
) => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });
  message = message ?? 'New Message';
  if (Platform.OS == 'ios') {
    if (media) {
      await notifee.displayNotification({
        title: title,
        body: message,
        ios: {
          attachments: [
            {
              url: media,
            },
          ],
        },
      });
    } else {
      await notifee.displayNotification({
        title: title,
        body: message,
      });
    }
  } else {
    if (media) {
      console.log('inside android image');

      await notifee.displayNotification({
        title: title,
        body: message,
        android: {
          channelId,
          smallIcon: 'ic_launcher',
          importance: AndroidImportance.HIGH,
          style: {
            type: AndroidStyle.BIGPICTURE,
            picture: media,
          },
          actions: [
            {
              title: 'Cancel',
              pressAction: { id: 'cancel' },
            },
          ],
        },
      });
    } else {
      await notifee.displayNotification({
        title: title,
        body: message,
        android: {
          channelId,
          smallIcon: 'ic_launcher',
          importance: AndroidImportance.HIGH,
          actions: [
            {
              title: 'Cancel',
              pressAction: { id: 'cancel' },
            },
          ],
        },
      });
    }
  }
};

export const handleNotificationNavigation = (
  remoteMessage: RemoteMessage,
  screen: string,
) => {
  const data = remoteMessage?.data;

  delay(5000);

  if (!data) {
    return;
  }

  console.log('Notification data:', data);

  switch (screen) {
    case 'WebChat':
      navigate('WebChat', 'notification');
      break;

    case 'order':
      navigate('OrderDetails', {
        orderId: data.order_id,
      });
      break;

    default:
      navigate('Notifications');
      break;
  }
};
