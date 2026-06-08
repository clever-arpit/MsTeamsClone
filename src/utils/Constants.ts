// import {
//   GroupMemberRole,
//   GroupMemberHistory,
//   PinMessageStringType,
//   GroupMessageActionType,
//   GroupThreadActionStringType,
//   FeedbackType,
// } from '../types/EnumType';
// import {
//   TypeMenu,
//   MenuAction,
//   GroupPermissionSection,
//   KeyValue,
// } from '../types/DataType';
// import Icons from './Icons';

// export const employeeStatus: TypeMenu[] = [
//   { value: 1, icon: Icons.availableIcon, label: 'Available' },
//   { value: 2, icon: Icons.busyIcon, label: 'Busy' },
//   { value: 3, icon: Icons.dndIcon, label: 'Do not disturb' },
//   { value: 4, icon: Icons.rightBackIcon, label: 'Be right back' },
//   { value: 5, icon: Icons.awayIcon, label: 'Appear Away' },
//   { value: 6, icon: Icons.offlineIcon, label: 'Appear Offline' },
//   { value: 7, icon: Icons.onBreakIcon, label: 'On break' },
//   { value: 8, icon: Icons.InMeetingIcon, label: 'In a meeting' },
//   { value: 9, icon: Icons.outOfficeIcon, label: 'Out of office' },
//   { value: 10, icon: Icons.onVacationIcon, label: 'On vacation' },
// ];

// export const ThreadActionMenu: MenuAction[] = [
//   {
//     id: GroupThreadActionStringType.LEFT_GROUP,
//     title: 'Close Chat',
//   },
//   {
//     id: GroupThreadActionStringType.GROUP_DETAIL,
//     title: 'Group details',
//   },
//   {
//     id: GroupThreadActionStringType.CONTACT_DETAIL,
//     title: 'Contact details',
//   },
//   {
//     id: GroupThreadActionStringType.ARCHIVE,
//     title: 'Archive chat',
//   },
//   {
//     id: GroupThreadActionStringType.FAVORITE,
//     title: 'Mark as favorite',
//   },
//   {
//     id: GroupThreadActionStringType.PIN,
//     title: 'Pin chat',
//   },
//   {
//     id: GroupThreadActionStringType.MUTE,
//     title: 'Mute chat',
//   },
//   {
//     id: GroupThreadActionStringType.CLEAR_HISTORY,
//     title: 'Clear chat',
//   },
//   {
//     id: GroupThreadActionStringType.MARK_READ,
//     title: 'Mark as read',
//   },
// ];

// export const ThreadActionSelectedMenu: MenuAction[] = [
//   {
//     id: GroupThreadActionStringType.ARCHIVE,
//     title: 'Archive chat',
//   },
//   {
//     id: GroupThreadActionStringType.FAVORITE,
//     title: 'Mark as favorite',
//   },
//   {
//     id: GroupThreadActionStringType.UNFAVORITE,
//     title: 'Mark as unfavorite',
//   },
//   {
//     id: GroupThreadActionStringType.PIN,
//     title: 'Pin chat',
//   },
//   {
//     id: GroupThreadActionStringType.UNPIN,
//     title: 'Unpin chat',
//   },
//   {
//     id: GroupThreadActionStringType.MUTE,
//     title: 'Mute chat',
//   },
//   {
//     id: GroupThreadActionStringType.UNMUTE,
//     title: 'Unmute chat',
//   },
//   {
//     id: GroupThreadActionStringType.CLEAR_HISTORY,
//     title: 'Clear chat',
//   },
//   {
//     id: GroupThreadActionStringType.MARK_READ,
//     title: 'Mark as read',
//   },
// ];

// export const ThreadMessageActionMenu: MenuAction[] = [
//   {
//     id: GroupThreadActionStringType.FAVORITE,
//     title: 'Mark as favorite',
//   },
//   { id: GroupThreadActionStringType.PIN, title: 'Pin chat' },
//   {
//     id: GroupThreadActionStringType.ARCHIVE,
//     title: 'Archive chat',
//   },
//   { id: GroupThreadActionStringType.MUTE, title: 'Mute chat' },
//   { id: GroupThreadActionStringType.CLEAR_HISTORY, title: 'Clear chat' },
// ];

// export const MessageActions: TypeMenu[] = [
//   {
//     id: GroupMessageActionType.MESSAGE_INFO,
//     icon: Icons.infoIcon,
//     label: 'Message Info',
//     value: 'Message Info',
//   },
//   {
//     id: GroupMessageActionType.COPY_MESSAGE,
//     icon: Icons.copyIcon,
//     label: 'Copy',
//     value: 'Copy',
//   },
//   {
//     id: GroupMessageActionType.REPLY_MESSAGE,
//     icon: Icons.replyIcon,
//     label: 'Reply',
//     value: 'Reply',
//   },
//   {
//     id: GroupMessageActionType.PIN_MESSAGE,
//     icon: Icons.pinIcon,
//     label: 'Pin',
//     value: 'Pin',
//   },
//   {
//     id: GroupMessageActionType.UNPIN_MESSAGE,
//     icon: Icons.pinIcon,
//     label: 'Unpin message',
//     value: 'Unpin message',
//   },
//   {
//     id: GroupMessageActionType.DELETE_FOR_ME,
//     icon: Icons.deleteIcon,
//     label: 'Delete for me',
//     value: 'Delete for me',
//   },
//   {
//     id: GroupMessageActionType.DELETE_FOR_ALL,
//     icon: Icons.deleteIcon,
//     label: 'Delete for all',
//     value: 'Delete for all',
//   },
// ];

// export const QuickMessages: TypeMenu[] = [
//   { value: '/hello', label: 'Hello, how can I assist you today?' },
//   { value: '/thankyou', label: 'Thank you for your value!' },
//   { value: '/goodbye', label: 'Goodbye! Have a great day!' },
//   { value: '/help', label: 'How can I help you? Please let me know!' },
//   {
//     value: '/info',
//     label: 'Please provide more details about your query.',
//   },
//   {
//     value: '/sorry',
//     label: 'Sorry for the inconvenience, we are here to assist.',
//   },
//   {
//     value: '/urgent',
//     label: "This is an urgent request. We'll prioritize it.",
//   },
// ];

// export const PinMessageActionMenu: MenuAction[] = [
//   {
//     id: PinMessageStringType.VIEW,
//     title: 'View in Chat',
//   },
//   {
//     id: PinMessageStringType.VIEW_ALL,
//     title: 'View All',
//   },
//   {
//     id: PinMessageStringType.UNPIN,
//     title: 'Unpin Message',
//   },
// ];

// export const groupPermissionInfo: GroupPermissionSection[] = [
//   {
//     title: 'Admin',
//     data: [
//       'Manage group and members',
//       'Send and read messages',
//       'Delete any message',
//       'Update group details',
//     ],
//   },
//   {
//     title: 'Member',
//     data: ['Send and read messages', 'Cannot delete messages'],
//   },
//   {
//     title: 'Read Only',
//     data: ['Read messages only', 'Cannot send messages or interact'],
//   },
// ];

// export const memberRoles = [
//   { label: 'Admin', value: 'Admin', id: GroupMemberRole.ADMIN },
//   { label: 'Member', value: 'Member', id: GroupMemberRole.MEMBER },
//   { label: 'Read Only', value: 'Read Only', id: GroupMemberRole.READ_ONLY },
// ];

// export const memberHistory = [
//   {
//     label: 'None',
//     value: 'None',
//     id: GroupMemberHistory.NONE,
//   },
//   {
//     label: 'Past Days',
//     value: 'Past Days',
//     id: GroupMemberHistory.PAST_DAYS,
//   },
//   { label: 'All', value: 'All', id: GroupMemberHistory.ALL },
// ];

// export const chatBehaviorOptions: TypeMenu[] = [
//   { value: 'typing_indicator', label: 'Typing Indicator' },
//   { value: 'read_receipts', label: 'Read Receipts' },
//   { value: 'show_online_status', label: 'Show Online Status' },
//   { value: 'show_agent_name', label: 'Show Agent Name' },
//   { value: 'show_agent_image', label: 'Show Agent Image' },
// ];

// export const dialPadKeys = [
//   { number: '1', letter: '' },
//   { number: '2', letter: 'ABC' },
//   { number: '3', letter: 'DEF' },
//   { number: '4', letter: 'GHI' },
//   { number: '5', letter: 'JKL' },
//   { number: '6', letter: 'MNO' },
//   { number: '7', letter: 'PQRS' },
//   { number: '8', letter: 'TUV' },
//   { number: '9', letter: 'WXYZ' },
//   { number: '*', letter: '*' },
//   { number: '0', letter: '+' },
//   { number: '#', letter: '#' },
// ];

// export const feedbackType: TypeMenu[] = [
//   { value: FeedbackType.BUG, label: 'Bug' },
//   { value: FeedbackType.QUESTION, label: 'Question' },
//   { value: FeedbackType.SUGGESTION, label: 'Suggestion' },
//   { value: FeedbackType.FEATURE_REQUEST, label: 'Feature request' },
//   { value: FeedbackType.IMPROVEMENT, label: 'Improvement' },
//   { value: FeedbackType.COMPLAINT, label: 'Complaint' },
//   { value: FeedbackType.OTHER, label: 'Other' },
// ];
