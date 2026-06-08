import { Alert, Linking, Platform } from 'react-native';
// import uuid from 'react-native-uuid';
// import Config from 'react-native-config';
// import { useSelector } from 'react-redux';
// import Toast from 'react-native-simple-toast';
// import DeviceInfo from 'react-native-device-info';
// import { FileLogger } from 'react-native-file-logger';
// import ReactNativeBlobUtil from 'react-native-blob-util';
// import { checkVersion } from 'react-native-check-version';
// import Clipboard from '@react-native-clipboard/clipboard';
// import Contacts, { PhoneNumber } from 'react-native-contacts';
// import {
//   FileType,
//   ChatSection,
//   Conversation,
//   MessageThread,
//   DeleteMessage,
//   TeamChatTread,
//   CallNotificationTitle,
//   BusinessMessageSocketPayload,
// } from '../types/DataType';
// import {
//   ChatType,
//   MessageType,
//   MessageStatus,
//   GroupMemberRole,
//   MessageDirection,
//   GroupMemberHistory,
//   GroupMessageActionType,
//   GroupThreadActionTypeLabel,
//   GroupThreadActionStringType,
//   MessageThreadActionType,
//   GroupType,
// } from '../types/EnumType';
// import Icons from './Icons';
// import { ThemeColors } from './theme';
// import { Countries } from './Countries';
// import socketService from './SocketService';
// import { showNotification } from './Firebase';
// import { SecureStorage } from './SecureStorage';
// import { unRegisterSip } from '../calls/callEvents';
// import { requestContactsPermission } from './Permissions';
// import {
//   docRegex,
//   urlRegex,
//   audioRegex,
//   imageRegex,
//   videoRegex,
// } from './regex';
// import { RootState } from '../redux/rootReducer';
// import { employeeStatus, MessageActions, ThreadActionMenu } from './Constants';
// import store, { clearPersistedStore } from '../redux/store';
// import { resetAuthUser } from '../redux/authUser/authUserSlice';
// import { resetPresence } from '../redux/teamPresence/teamPresenceSlice';
// import ToastMessage from '../component/ToastMessage';
// import { triggerAlert } from '../component/triggerAlert';

// export const localLogout = () => {
//   socketService.disconnect();
//   unRegisterSip();
//   store.dispatch(resetAuthUser());
//   store.dispatch(resetPresence());
//   clearPersistedStore();
// };

// export const firstAlphabet = (input?: string): string => {
//   if (!input) return '';

//   return input
//     ?.trim()
//     ?.split(/\s+/)
//     ?.slice(0, 2)
//     ?.map(word => {
//       const firstAlphabet = word
//         ?.split('')
//         ?.find(char => /^[A-Za-z]$/.test(char));
//       return firstAlphabet ? firstAlphabet?.toUpperCase() : '';
//     })
//     ?.join('');
// };

// export const fileType = (input: string): FileType => {
//   if (!input) return 'unsupported';

//   if (imageRegex.test(input)) return 'image';
//   if (videoRegex.test(input)) return 'video';
//   if (docRegex.test(input)) return 'document';
//   if (audioRegex.test(input)) return 'audio';

//   return 'unsupported';
// };

// export const formatTo12Hour = (timestamp: string | number | Date): string => {
//   const date = new Date(timestamp);

//   let hours = date.getHours();
//   let minutes = date.getMinutes();

//   const ampm = hours >= 12 ? 'PM' : 'AM';
//   hours = hours % 12 || 12; // convert 0 → 12

//   const minuteStr = minutes < 10 ? `0${minutes}` : minutes;

//   return `${hours}:${minuteStr} ${ampm}`;
// };

// export const formatToDays = (timestamp: string | number | Date): string => {
//   const date = new Date(timestamp);

//   const today = new Date();
//   const yesterday = new Date(today);
//   yesterday.setDate(today.getDate() - 1);

//   const isToday = date.toDateString() === today.toDateString();
//   const isYesterday = date.toDateString() === yesterday.toDateString();

//   let hours = date.getHours();
//   let minutes = date.getMinutes();

//   const ampm = hours >= 12 ? 'PM' : 'AM';
//   hours = hours % 12 || 12;

//   const minuteStr = minutes < 10 ? `0${minutes}` : minutes;

//   const time = `${hours}:${minuteStr} ${ampm}`;

//   if (isToday) return `Today, ${time}`;
//   if (isYesterday) return `Yesterday, ${time}`;

//   const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//   const months = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December',
//   ];

//   const dayName = days[date.getDay()];
//   const monthName = months[date.getMonth()];
//   const year = date.getFullYear();

//   return `${dayName}, ${monthName}, ${year}, ${time}`;
// };

// export const getNotificationTitle = async (
//   phoneNumber: PhoneNumber,
// ): Promise<CallNotificationTitle | undefined> => {
//   try {
//     const hasPermission = await requestContactsPermission();
//     if (hasPermission) {
//       const contacts = await Contacts.getAllWithoutPhotos();
//       console.log('contacts----', contacts);

//       const matchedContact = contacts?.find(contact =>
//         contact.phoneNumbers?.some(num => num === phoneNumber),
//       );

//       if (matchedContact) {
//         return {
//           name: matchedContact.givenName || matchedContact.familyName || '',
//           pic: matchedContact.thumbnailPath || null,
//           number: phoneNumber,
//         };
//       }
//     }

//     const allContacts = store.getState().contacts.allContacts;

//     if (allContacts && allContacts.length > 0) {
//       const matchedAPIContact = allContacts.find(contact => {
//         return contact.contact_details?.some(item => {
//           const phoneStr = String(item.value);
//           const phoneNumberStr = String(phoneNumber);
//           return (
//             phoneStr?.replace(/\D/g, '') === phoneNumberStr?.replace(/\D/g, '')
//           );
//         });
//       });
//       return {
//         name: matchedAPIContact?.full_name || String(phoneNumber),
//         pic: null,
//         number: phoneNumber,
//       };
//     } else {
//       return {
//         name: String(phoneNumber),
//         pic: null,
//         number: phoneNumber,
//       };
//     }
//   } catch {
//     return {
//       name: phoneNumber,
//       pic: null,
//       number: phoneNumber,
//     };
//   }
// };

// export const showMessageNotification = (
//   payload: BusinessMessageSocketPayload,
// ) => {
//   const notification = store.getState().notification.enableNotification;
//   const incomingMessage = payload?.message;
//   if (!incomingMessage) return;
//   if (
//     incomingMessage?.thread_id !== notification?.thread_id &&
//     !incomingMessage?.thread?.is_muted &&
//     incomingMessage?.direction === MessageDirection.INCOMING
//   ) {
//     const title =
//       incomingMessage?.sender?.full_name ||
//       incomingMessage?.visitor?.full_name ||
//       'New Message';
//     showNotification(
//       title,
//       incomingMessage?.sub_messages?.[0]?.message,
//       incomingMessage?.sub_messages?.[0]?.attachment?.file_path,
//     );
//   }
// };

// export const delay = (ms: number) =>
//   new Promise(resolve => setTimeout(resolve, ms));

// export const convertToBase64 = async (uri: string) => {
//   try {
//     const base64 = await ReactNativeBlobUtil.fs.readFile(uri, 'base64');
//     console.log('Base64 String:', base64);
//     return base64;
//   } catch (error) {
//     console.error('Error converting to base64:', error);
//     return '';
//   }
// };

// export const formatDate = (date: Date) => {
//   const d = new Date(date);
//   const year = d.getFullYear();
//   const month = String(d.getMonth() + 1).padStart(2, '0');
//   const day = String(d.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// };

// export const containsHtmlTags = (str: string) => /<\/?[a-z][\s\S]*>/i.test(str);
// export const stripHtmlTags = (htmlString: string) => {
//   return htmlString.replace(/<[^>]*>/g, '');
// };

// export const capitalize = (text: string): string => {
//   if (!text) return '';
//   return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
// };

// export const secondsToMinutes = (totalSeconds?: number): string => {
//   if (!totalSeconds || totalSeconds === 0) {
//     return '00:00';
//   }

//   const minutes = Math.floor(totalSeconds / 60);
//   const seconds = Math.floor(totalSeconds % 60);

//   return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
//     2,
//     '0',
//   )}`;
// };

// export const clearLogs = () => {
//   FileLogger.deleteLogFiles()
//     .then(res => {
//       console.log('clearLogs response', res);
//     })
//     .catch(err => {
//       console.error('clearLogs Error', err);
//     });
// };
// export const emailLogs = async () => {
//   FileLogger.sendLogFilesByEmail({
//     subject:
//       'EzeetelGo ' +
//       '[' +
//       Platform.OS +
//       '] [' +
//       Config.VERSION +
//       '] Debugging Logs at ' +
//       new Date(),
//     to: ['support@ezeetel.com'],
//   })
//     .then(res => {
//       console.log('emailLogs response', res);
//     })
//     .catch(err => {
//       console.error('emailLogs Error', err);
//     });
// };

// export const updateChecker = async () => {
//   try {
//     const versionInfo = await checkVersion();
//     const localVersion = DeviceInfo.getVersion();
//     const buildNumber = DeviceInfo.getBuildNumber();
//     const systemVersion = DeviceInfo.getSystemVersion();
//     const platform = DeviceInfo.getSystemName();

//     // enable it For Testing only

//     // versionInfo.needsUpdate = true;
//     // versionInfo.updateType = "minor";
//     // versionInfo.latestVersion = "4.0.5";

//     console.log('Version Info:', {
//       localVersion,
//       buildNumber,
//       systemVersion,
//       platform,
//       ...versionInfo,
//     });

//     if (versionInfo?.needsUpdate) {
//       return {
//         updateAvailable: true,
//         updateType: versionInfo?.updateType, // 'major', 'minor', 'patch'
//         storeUrl: versionInfo?.url,
//         localVersion,
//         latestVersion: versionInfo?.version,
//         platform,
//       };
//     } else {
//       return {
//         updateAvailable: false,
//         localVersion,
//         latestVersion: versionInfo?.version,
//         platform,
//       };
//     }
//   } catch (error: any) {
//     console.error('Error checking app version:', error);
//     return {
//       updateAvailable: false,
//       error: true,
//       message: error.message,
//     };
//   }
// };

// export const getMemberRole = (number: number) => {
//   switch (number) {
//     case GroupMemberRole.ADMIN: {
//       return 'Admin';
//     }
//     case GroupMemberRole.MEMBER: {
//       return 'Member';
//     }
//     case GroupMemberRole.READ_ONLY: {
//       return 'Read Only';
//     }
//   }
// };

// export const getMemberHistory = (number: number) => {
//   switch (number) {
//     case GroupMemberHistory.NONE: {
//       return 'None';
//     }
//     case GroupMemberHistory.PAST_DAYS: {
//       return 'Past Days';
//     }
//     case GroupMemberHistory.ALL: {
//       return 'All';
//     }
//     default: {
//       return 'Select';
//     }
//   }
// };

// export const formatChatTime = (isoString: string): string => {
//   if (!isoString) return '';
//   const date = new Date(isoString);

//   return new Intl.DateTimeFormat('en-US', {
//     weekday: 'short', // Mon
//     hour: 'numeric', // 10
//     minute: '2-digit', // 37
//     hour12: true, // AM/PM
//   })?.format(date);
// };

// const isToday = (date: Date) => {
//   if (!date) return '';
//   const today = new Date();
//   return (
//     date.getDate() === today.getDate() &&
//     date.getMonth() === today.getMonth() &&
//     date.getFullYear() === today.getFullYear()
//   );
// };

// const isYesterday = (date: Date) => {
//   if (!date) return '';
//   const yesterday = new Date();
//   yesterday.setDate(yesterday.getDate() - 1);

//   return (
//     date.getDate() === yesterday.getDate() &&
//     date.getMonth() === yesterday.getMonth() &&
//     date.getFullYear() === yesterday.getFullYear()
//   );
// };

// const formatSectionTitle = (iso?: string) => {
//   if (!iso) return 'Unknown date';

//   const date = new Date(iso);

//   if (isNaN(date.getTime())) return 'Unknown date';

//   if (isToday(date)) return 'Today';
//   if (isYesterday(date)) return 'Yesterday';

//   return new Intl.DateTimeFormat('en-US', {
//     weekday: 'short',
//     month: 'short',
//     day: 'numeric',
//   }).format(date);
// };

// export const transformMessagesToSections = (
//   messages: MessageThread[],
// ): ChatSection[] => {
//   const map = new Map<string, MessageThread[]>();

//   messages.forEach(msg => {
//     const sectionTitle = formatSectionTitle(msg.created_at);

//     if (!map.has(sectionTitle)) {
//       map.set(sectionTitle, []);
//     }

//     map.get(sectionTitle)!.push(msg);
//   });

//   return Array.from(map.entries()).map(([title, data]) => ({
//     title,
//     data,
//   }));
// };

// export const upsertMessage = (
//   prevChats: MessageThread[],
//   incoming: MessageThread,
// ): MessageThread[] => {
//   console.log('incoming------', incoming);
//   const index = prevChats.findIndex(
//     chat => chat.message_group_uuid === incoming?.message_group_uuid,
//   );

//   // 🔹 Update existing
//   if (index !== -1) {
//     const updated = [...prevChats];

//     updated[index] = {
//       ...updated[index],
//       ...incoming,
//       message_status: incoming?.message_status,
//     };

//     return updated;
//   }

//   // 🔹 New message MUST have created_at
//   if (!incoming.created_at) {
//     console.warn('Incoming message missing created_at', incoming);
//     return prevChats; // ❌ ignore broken message
//   }

//   return [incoming as MessageThread, ...prevChats];
// };

// export const upsertDeleteMessage = (
//   prevChats: MessageThread[],
//   deleteMessage: DeleteMessage,
// ): MessageThread[] => {
//   console.log('deleteMessage------', deleteMessage);
//   const messageGroupUuid = deleteMessage?.message_group_uuids?.[0];
//   const deletedMessage = deleteMessage?.deleted_messages?.[messageGroupUuid];

//   const index = prevChats.findIndex(
//     chat => chat.message_group_uuid === messageGroupUuid,
//   );

//   if (index !== -1) {
//     const updated = [...prevChats];

//     updated[index] = {
//       ...updated[index],
//       deletion_action: deletedMessage?.deletion_action,
//       deletion_message: deletedMessage?.deletion_message,
//     };

//     return updated;
//   }

//   return [...prevChats];
// };

// export const upsertPinMessage = (
//   prevChats: MessageThread[],
//   message_group_uuid: string,
//   is_pinned: boolean,
// ): MessageThread[] => {
//   const index = prevChats.findIndex(
//     chat => chat?.message_group_uuid === message_group_uuid,
//   );

//   if (index !== -1) {
//     const updated = [...prevChats];
//     updated[index] = {
//       ...updated[index],
//       is_pinned,
//     };
//     return updated;
//   }
//   return [...prevChats];
// };

// export const getNameParts = (fullName: string) => {
//   const nameParts = fullName.trim().split(' ');

//   const firstName = nameParts[0];

//   const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';

//   const middleName =
//     nameParts.length > 2 ? nameParts.slice(1, -1).join(' ') : '';

//   return {
//     firstName,
//     middleName,
//     lastName,
//   };
// };

// export const replaceCountryCode = (number: string) => {
//   for (let i = 0; i < Countries.length; i++) {
//     if (number.startsWith(Countries[i].dial_code)) {
//       number = number.replace(Countries[i].dial_code, '');
//       return number;
//     }
//   }
//   return number;
// };

// export const getCountryCode = (number: string) => {
//   for (let i = 0; i < Countries.length; i++) {
//     if (number?.startsWith(Countries[i]?.dial_code)) {
//       return Countries[i].dial_code;
//     }
//   }
//   return '';
// };

// export const getUpdatedThreadActions = (
//   threadItem: TeamChatTread | Conversation,
//   chatType: string = 'other',
// ) => {
//   return ThreadActionMenu.filter(itm => {
//     if (
//       threadItem?.type === ChatType.GROUP &&
//       itm.id === GroupThreadActionStringType.CONTACT_DETAIL
//     ) {
//       return false;
//     } else if (
//       threadItem?.type === ChatType.INDIVIDUAL &&
//       itm.id === GroupThreadActionStringType.GROUP_DETAIL
//     ) {
//       return false;
//     } else if (
//       chatType !== 'WebChat' &&
//       itm.id === GroupThreadActionStringType.LEFT_GROUP
//     ) {
//       return false;
//     }
//     return true;
//   }).map(itm => {
//     switch (itm.id) {
//       case GroupThreadActionStringType.ARCHIVE:
//         return {
//           id: threadItem.is_archived
//             ? GroupThreadActionStringType.UNARCHIVE
//             : GroupThreadActionStringType.ARCHIVE,
//           title: threadItem.is_archived
//             ? GroupThreadActionTypeLabel.UNARCHIVE
//             : GroupThreadActionTypeLabel.ARCHIVE,
//         };

//       case GroupThreadActionStringType.FAVORITE:
//         return {
//           id: threadItem.is_favorite
//             ? GroupThreadActionStringType.UNFAVORITE
//             : GroupThreadActionStringType.FAVORITE,
//           title: threadItem.is_favorite
//             ? GroupThreadActionTypeLabel.UNFAVORITE
//             : GroupThreadActionTypeLabel.FAVORITE,
//         };

//       case GroupThreadActionStringType.MUTE:
//         return {
//           id: threadItem.is_muted
//             ? GroupThreadActionStringType.UNMUTE
//             : GroupThreadActionStringType.MUTE,
//           title: threadItem.is_muted
//             ? GroupThreadActionTypeLabel.UNMUTE
//             : GroupThreadActionTypeLabel.MUTE,
//         };

//       case GroupThreadActionStringType.PIN:
//         return {
//           id: threadItem.is_pinned
//             ? GroupThreadActionStringType.UNPIN
//             : GroupThreadActionStringType.PIN,
//           title: threadItem.is_pinned
//             ? GroupThreadActionTypeLabel.UNPIN
//             : GroupThreadActionTypeLabel.PIN,
//         };

//       default:
//         return itm;
//     }
//   });
// };

export const openUrl = async (url: string) => {
  const normalized = url.toLowerCase().startsWith('http')
    ? url
    : `https://${url}`;

  if (!/^https?:\/\//i.test(normalized)) {
    Alert.alert('Invalid URL');
    return;
  }

  try {
    await Linking.openURL(normalized);
  } catch {
    Alert.alert('Cannot open this link');
  }
};

// export const downloadAttachmentFile = async (url: string, type: string) => {
//   const dirs = ReactNativeBlobUtil.fs.dirs.DownloadDir;
//   const filePath = `${dirs}/${uuid.v4()}.${type}`;

//   try {
//     console.log('ReactNativeBlobUtil---filePath---', filePath);
//     const resp = await ReactNativeBlobUtil.config({
//       fileCache: true,
//       path: filePath,
//     }).fetch('GET', url);
//     console.log('File downloaded:', resp);
//     ToastMessage('Message', 'File downloaded successfully');
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const getMessageStatusIcon = (status: MessageStatus) => {
//   switch (status) {
//     case MessageStatus.DELIVERED:
//       return Icons.deliveredIcon;
//     case MessageStatus.SENT:
//       return Icons.deliveredIcon;
//     case MessageStatus.READ:
//       return Icons.deliveredIcon;
//     case MessageStatus.PENDING:
//       return Icons.pendingIcon;
//     case MessageStatus.FAILED:
//     case MessageStatus.CANCELED:
//     case MessageStatus.RETRYING:
//     case MessageStatus.RECEIVED:
//       return Icons.undeliveredIcon;
//     default:
//       return null;
//   }
// };

// export const getMessageStatusColor = (
//   status: MessageStatus,
//   colors: ThemeColors,
// ) => {
//   switch (status) {
//     case MessageStatus.PENDING:
//       return colors.icon_color;
//     case MessageStatus.DELIVERED:
//       return colors.blue;
//     case MessageStatus.SENT:
//       return colors.icon_color;
//     case MessageStatus.READ:
//       return colors.blue;
//     case MessageStatus.FAILED:
//       return colors.red;
//     case MessageStatus.CANCELED:
//       return colors.red;
//     case MessageStatus.RETRYING:
//       return colors.red;
//     case MessageStatus.RECEIVED:
//       return colors.blue;
//     default:
//       return colors.red;
//   }
// };

// export const cleanMessage = (message: string) =>
//   message
//     ?.trim()
//     ?.replace(/\n+/g, ' ')
//     ?.replace(/\s{2,}/g, ' ')
//     ?.replace(/^\s+/g, '')
//     ?.replace(/\s+$/g, '');

// export const getLastMessage = (sections: ChatSection[]) => {
//   const lastSection = sections[sections.length - 1];
//   return lastSection?.data[lastSection?.data.length - 1];
// };

// export const getFirstMessage = (sections: ChatSection[]) => {
//   const firstSection = sections[0];
//   return firstSection?.data[0];
// };

// export const getFilteredMessageActions = (
//   selectedMessage: MessageThread,
//   userProfile: any,
//   role: number,
// ) => {
//   console.log('selectedMessage=======', selectedMessage);
//   const from = selectedMessage?.from ?? 'other';

//   let actions = [...MessageActions];

//   if (
//     from != 'teamchat' ||
//     (from == 'teamchat' && selectedMessage?.direction != 2)
//   ) {
//     actions = actions.filter(
//       item => item?.id !== GroupMessageActionType.MESSAGE_INFO,
//     );
//   }

//   if (selectedMessage?.message_type == MessageType.NOTE) {
//     actions = actions.filter(
//       item => item?.id !== GroupMessageActionType.REPLY_MESSAGE,
//     );
//   }

//   // actions = actions.filter(
//   //   item => item?.id !== GroupMessageActionType.DELETE_FOR_ALL,
//   // );

//   if (selectedMessage?.is_pinned) {
//     actions = actions.filter(
//       item => item?.id !== GroupMessageActionType.PIN_MESSAGE,
//     );
//   } else {
//     actions = actions.filter(
//       item => item?.id !== GroupMessageActionType.UNPIN_MESSAGE,
//     );
//   }

//   return actions;
// };

// export const isDeletedMessageAction = (message: MessageThread) => {
//   return (
//     message?.deletion_action === MessageThreadActionType.DELETED ||
//     message?.deletion_action === MessageThreadActionType.DELETE_FOR_ALL ||
//     message?.deletion_action === MessageThreadActionType.DELETE_BY_ADMIN
//   );
// };

// export const formatTime = (date: Date) => {
//   return date.toLocaleTimeString([], {
//     hour: '2-digit',
//     minute: '2-digit',
//   });
// };

// export const convertToMinutes = ({
//   days = 0,
//   hours = 0,
//   minutes = 0,
// }: {
//   days?: number;
//   hours?: number;
//   minutes?: number;
// }) => {
//   return days * 24 * 60 + hours * 60 + minutes;
// };

// export const convertToDays = (totalMinutes: number) => {
//   const days = Math.floor(totalMinutes / (24 * 60));
//   const remainingAfterDays = totalMinutes % (24 * 60);

//   const hours = Math.floor(remainingAfterDays / 60);
//   const minutes = remainingAfterDays % 60;

//   return {
//     days,
//     hours,
//     minutes,
//   };
// };

// export const isWithin24Hours = (dateString: string) => {
//   const messageDate = new Date(dateString).getTime();
//   const now = Date.now();

//   const diffInMs = now - messageDate;
//   const diffInHours = diffInMs / (1000 * 60 * 60);

//   return diffInHours <= 24;
// };

// export const handleUserInactivity = (active: boolean) => {
//   const authToken = SecureStorage.getString('authToken');
//   // if (socketService?.isConnected) {
//   socketService.emit('update-employee-status', {
//     token: authToken,
//     presence_status: active ? employeeStatus[0].value : employeeStatus[4].value,
//   });
//   // }
// };

// export const messageAction = async (action: number, item: MessageThread) => {
//   const authToken = SecureStorage.getString('authToken');
//   const payload = {
//     token: authToken,
//     group_type: GroupType.TEAM_CHAT,
//     action,
//     message_group_uuids: [item.message_group_uuid],
//   };
//   console.log('payload---messageAction---', payload);
//   socketService.emit('message-action', payload);
// };

// export const copyToClipboard = (str: string) => {
//   Clipboard?.setString(str);
//   Toast.show('Copied to clipboard', Toast.SHORT);
// };

// export type TemplateButtonActionPayload = {
//   type?: string;
//   url?: string;
//   code?: string;
//   phone?: string;
//   payload?: string;
//   title?: string;
// };

// export const handleTemplateButtonAction = async (
//   button?: TemplateButtonActionPayload,
//   options?: { onQuickReply?: (payload?: string) => void },
// ) => {
//   if (!button) {
//     return;
//   }

//   const normalizedType = button.type?.toLowerCase?.() || '';

//   if (normalizedType === 'copy_code' || normalizedType === 'coupon_code') {
//     if (button.code) {
//       copyToClipboard(button.code);
//       ToastMessage('Copied', 'Code copied to clipboard');
//     }
//     return;
//   }

//   if (normalizedType === 'phone_number' || normalizedType === 'voice_call') {
//     if (!button.phone) {
//       return;
//     }
//     const dialUrl = `tel:${button.phone}`;
//     try {
//       const supported = await Linking.canOpenURL(dialUrl);
//       if (supported) {
//         await Linking.openURL(dialUrl);
//       } else {
//         Alert.alert('Unable to initiate a call right now.');
//       }
//     } catch {
//       Alert.alert('Unable to initiate a call right now.');
//     }
//     return;
//   }

//   if (normalizedType === 'quick_reply') {
//     options?.onQuickReply?.(button.payload ?? button.title ?? '');
//     return;
//   }

//   if (button.url) {
//     await openUrl(button.url);
//   }
// };

// export const renderSubTitle = (
//   item: Conversation | TeamChatTread,
//   from: string = 'other',
// ) => {
//   if (from != 'other') {
//     const key = `${from}_${item.id}`;
//     const draft = useSelector((state: RootState) => state.drafts.drafts[key]);
//     if (draft?.message) {
//       let subTitle = `Draft: ${draft?.message}`;
//       return subTitle.length > 18
//         ? subTitle?.substring(0, 18) + '...'
//         : subTitle;
//     }
//   }
//   if (item?.last_message?.message_type === MessageType.MEDIA) {
//     return 'Attachment';
//   } else {
//     const message = cleanMessage(item?.last_message?.message);
//     return item?.last_message?.message?.length > 18
//       ? message?.substring(0, 18) + '...'
//       : message;
//   }
// };

// export const extractVariables = (text?: string) => {
//   if (!text) return [];

//   const regex = /{{\s*([^{}]+)\s*}}/g;
//   const output: string[] = [];

//   let match: RegExpExecArray | null;
//   while ((match = regex.exec(text)) !== null) {
//     output.push(match[1].trim());
//   }

//   return output;
// };

// type TemplateValueMap =
//   | Record<string, string | number>
//   | Array<string | number>;

// export const buildFinalMessage = (text: string, values?: TemplateValueMap) => {
//   if (!text) return '';

//   if (!values) return text;

//   const isArray = Array.isArray(values);

//   return text.replace(/{{\s*([^{}]+)\s*}}/g, (_, placeholder: string) => {
//     const key = placeholder.trim();

//     if (!key) {
//       return '';
//     }

//     if (!isArray) {
//       const objectValue = (values as Record<string, string | number>)[key];
//       if (objectValue !== undefined && objectValue !== null) {
//         return String(objectValue);
//       }
//     } else {
//       const index = Number(key) - 1;
//       if (!Number.isNaN(index)) {
//         const arrayValue = (values as Array<string | number>)[index];
//         if (arrayValue !== undefined && arrayValue !== null) {
//           return String(arrayValue);
//         }
//       }
//     }

//     return '';
//   });
// };

// export const generateUUID = () => {
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
//     const r = (Math.random() * 16) | 0;
//     const v = c === 'x' ? r : (r & 0x3) | 0x8;
//     return v.toString(16);
//   });
// };

// export const buildLocationData = (location: any) => ({
//   latitude: String(location?.address?.latitude ?? ''),
//   longitude: String(location?.address?.longitude ?? ''),
//   name: String(location?.location_name ?? ''),
//   address: String(location?.address?.complete_address ?? ''),
// });

// export const buildLocationMessage = (
//   location: any,
//   senderName: string = '',
// ) => {
//   const recipientDetails = [
//     location?.recipient_name,
//     location?.recipient_email,
//     location?.recipient_mobile_number,
//   ]
//     .filter(value => String(value ?? '').trim().length > 0)
//     .join(' | ');
//   const locationData = buildLocationData(location);
//   const lines: string[] = [];

//   if (locationData.name) {
//     lines.push(`Location: ${locationData.name}`);
//   }
//   if (recipientDetails) {
//     lines.push(`Recipient: ${recipientDetails}`);
//   }
//   if (locationData.address) {
//     lines.push(`Address: ${locationData.address}`);
//   }
//   if (String(location?.location_url ?? '').trim()) {
//     lines.push(`Url: ${String(location.location_url).trim()}`);
//   }
//   if (String(location?.address?.google_maps_url ?? '').trim()) {
//     lines.push(`Map: ${String(location.address.google_maps_url).trim()}`);
//   }
//   // if (senderName.trim()) {
//   //   lines.push('', senderName.trim());
//   // }

//   return lines.join('\n').trim();
// };

// export const parseLocationMessage = (message: string = '') => {
//   const parsed = {
//     name: '',
//     recipient: '',
//     address: '',
//     url: '',
//     map: '',
//     senderName: '',
//     raw: message,
//   };
//   const lines = message
//     .split(/\r?\n/)
//     .map(line => line.trim())
//     .filter(Boolean);

//   lines.forEach(line => {
//     if (/^Location:\s*/i.test(line)) {
//       parsed.name = line.replace(/^Location:\s*/i, '').trim();
//       return;
//     }
//     if (/^Recipient:\s*/i.test(line)) {
//       parsed.recipient = line.replace(/^Recipient:\s*/i, '').trim();
//       return;
//     }
//     if (/^Address:\s*/i.test(line)) {
//       parsed.address = line.replace(/^Address:\s*/i, '').trim();
//       return;
//     }
//     if (/^Url:\s*/i.test(line)) {
//       parsed.url = line.replace(/^Url:\s*/i, '').trim();
//       return;
//     }
//     if (/^Map:\s*/i.test(line)) {
//       parsed.map = line.replace(/^Map:\s*/i, '').trim();
//       return;
//     }
//     if (!parsed.senderName) {
//       parsed.senderName = line;
//     }
//   });

//   return parsed;
// };

// export const getLocationMessagePreview = (message: string = '') => {
//   const parsed = parseLocationMessage(message);

//   if (parsed.name) {
//     return `Location: ${parsed.name}`;
//   }
//   if (parsed.address) {
//     return `Location: ${parsed.address}`;
//   }
//   return 'Location';
// };

// export const openSettings = () => {
//   triggerAlert({
//     title: 'Alert',
//     message: 'Do you want to go to settings?',
//     buttonText: 'Go to Settings',
//     onPress: handleOpenSettings,
//   });
// };

// export const handleOpenSettings = () => {
//   if (Platform.OS === 'ios') {
//     Linking.openURL('app-settings:');
//   } else {
//     Linking.openSettings();
//   }
// };

// export const validateUrls = (input: string | string[]) => {
//   if (Array.isArray(input)) {
//     return input.every(item => urlRegex.test(item));
//   }

//   return urlRegex.test(input);
// };

// export const formatDateToUTC = (isoDate?: string | number | Date) => {
//   if (!isoDate) return null;

//   const date = new Date(isoDate);

//   return (
//     date.getUTCFullYear() +
//     '-' +
//     String(date.getUTCMonth() + 1).padStart(2, '0') +
//     '-' +
//     String(date.getUTCDate()).padStart(2, '0') +
//     ' ' +
//     String(date.getUTCHours()).padStart(2, '0') +
//     ':' +
//     String(date.getUTCMinutes()).padStart(2, '0') +
//     ':' +
//     String(date.getUTCSeconds()).padStart(2, '0')
//   );
// };

// export const formatSeconds = (totalSeconds: number) => {
//   if (!totalSeconds) {
//     return '00:00';
//   }

//   const minutes = Math.floor(totalSeconds / 60);
//   const seconds = totalSeconds % 60;

//   return (
//     String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0')
//   );
// };

// //remove special characters from phone number (123)456-7890 -> 1234567890
// export const normalizePhone = (phone: string) => {
//   if (!phone) return '';
//   const hasPlus = phone.trim().startsWith('+');
//   const digits = phone.replace(/\D/g, '');
//   return hasPlus ? `+${digits}` : digits;
// };

export const isValidUrl = (url: string) => {
  if (!url) return false;

  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol?.toLocaleLowerCase());
  } catch {
    return false;
  }
};

// export const startsWithAlphabet = (value: any): boolean => {
//   if (!value?.trim()) {
//     return false;
//   }

//   return /^[a-zA-Z]/.test(value.trim());
// };

// export const formatLabel = (value: string): string => {
//   return value
//     .replace(/_/g, ' ')
//     .replace(/([a-z])([A-Z])/g, '$1 $2')
//     .split(' ')
//     .filter(Boolean)
//     .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//     .join(' ');
// };

// export const parseMessageSummary = (body: string) => {
//   let messagesWaiting = false;
//   let newMessages = 0;
//   let oldMessages = 0;

//   const lines = body.split(/\r?\n/);
//   for (const line of lines) {
//     if (line.startsWith("Messages-Waiting:")) {
//       messagesWaiting = line.toLowerCase().includes("yes");
//     } else if (line.startsWith("Voice-Message:")) {
//       // Voice-Message: 1/0 (0/0)
//       const match = line.match(/Voice-Message:\s*(\d+)\/(\d+)/);
//       if (match) {
//         newMessages = parseInt(match[1] ?? "0");
//         oldMessages = parseInt(match[2] ?? "0");
//       }
//     }
//   }

//   return { messagesWaiting, newMessages, oldMessages };
// };
