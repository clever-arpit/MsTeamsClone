// import React, { FC, useState } from 'react';
// import { View, Platform, StyleSheet } from 'react-native';
// import Config from 'react-native-config';
// import NitroSound from 'react-native-nitro-sound';
// import Icons from '../../utils/Icons';
// import { useTheme } from '../../hooks/ThemeContext';
// import CustomText from '../CustomText';
// import IconButton from '../IconButton';
// import CustomModal from '../CustomModal';

// interface VoiceRecorderProps {
//   visible: boolean;
//   onClose: () => void;
// }

// const VoiceRecorder: FC<VoiceRecorderProps> = ({ visible, onClose }) => {
//   const recorder = NitroSound;

//   const { colors } = useTheme();
//   const [recordingPath, setRecordingPath] = useState('');
//   const [isRecording, setIsRecording] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [timer, setTimer] = useState(0);

//   const startRecording = async () => {
//     try {
//       const path = Platform.select({
//         ios: 'recording.m4a',
//         android: 'recording.mp4',
//       });

//       const result = await recorder.startRecorder(path);
//       setRecordingPath(result);

//       setIsRecording(true);
//       setIsPaused(false);
//       setTimer(0);

//       recorder.addRecordBackListener(e => {
//         const seconds = Math.floor(e.currentPosition / 1000);
//         setTimer(seconds);
//       });
//     } catch (e) {
//       console.log('Start error:', e);
//     }
//   };

//   const pauseRecording = async () => {
//     try {
//       await recorder.pauseRecorder();
//       setIsPaused(true);
//     } catch (e) {
//       console.log('Pause error:', e);
//     }
//   };

//   const resumeRecording = async () => {
//     try {
//       await recorder.resumeRecorder();
//       setIsPaused(false);
//     } catch (e) {
//       console.log('Resume error:', e);
//     }
//   };

//   const stopRecording = async () => {
//     try {
//       const result = await recorder.stopRecorder();
//       recorder.removeRecordBackListener();

//       setIsRecording(false);
//       setIsPaused(false);

//       console.log('Saved at:', result);
//     } catch (e) {
//       console.log('Stop error:', e);
//     }
//   };

//   const togglePlay = async () => {
//     try {
//       if (!recordingPath) return;

//       if (!isPlaying) {
//         await recorder.startPlayer(recordingPath);
//         setIsPlaying(true);

//         recorder.addPlayBackListener(e => {
//           if (e.currentPosition >= e.duration) {
//             recorder.stopPlayer();
//             recorder.removePlayBackListener();
//             setIsPlaying(false);
//           }
//         });
//       } else {
//         await recorder.pausePlayer();
//         setIsPlaying(false);
//       }
//     } catch (e) {
//       console.log('Play error:', e);
//     }
//   };

//   const deleteRecording = async () => {
//     try {
//       await recorder.stopRecorder();
//       await recorder.stopPlayer();
//       recorder.removeRecordBackListener();
//       recorder.removePlayBackListener();

//       setRecordingPath('');
//       setIsRecording(false);
//       setIsPaused(false);
//       setIsPlaying(false);
//       setTimer(0);
//     } catch (e) {
//       console.log('Delete error:', e);
//     }
//   };

//   const formatTime = (sec: number) => {
//     const m = Math.floor(sec / 60);
//     const s = sec % 60;
//     return `${m}:${s < 10 ? '0' : ''}${s}`;
//   };

//   return (
//     <CustomModal
//       back
//       title="Voice Recording"
//       visible={visible}
//       overlayClose={false}
//       onClose={onClose}
//       modalContentStyle={{ flex: 1, gap: 15 }}
//       modalContainerStyle={styles.modalContainerStyle}
//     >
//       <View style={styles.recordTimeWrapper}>
//         <CustomText
//           text="1:22:54"
//           fontSize={25}
//           fontFamily={Config.FONT_FAMILY_SEMI}
//         />
//       </View>
//       <View style={styles.recordButtonWrapper}>
//         <IconButton
//           onPress={togglePlay}
//           icon={Icons.playIcon}
//           iconColor={colors.icon_color}
//           size={24}
//         />
//         <IconButton
//           onPress={isRecording ? stopRecording : startRecording}
//           icon={isRecording ? Icons.recordDoneIcon : Icons.recordIcon}
//           iconColor={colors.dark_red}
//           size={50}
//           customBtnStyle={{ marginBottom: 10 }}
//         />
//         <IconButton
//           onPress={deleteRecording}
//           icon={Icons.deleteIcon}
//           iconColor={colors.icon_color}
//           size={26}
//         />
//       </View>
//     </CustomModal>
//   );
// };

// export default VoiceRecorder;
// const styles = StyleSheet.create({
//   modalContainerStyle: {
//     flex: 1,
//     width: '100%',
//     borderRadius: 0,
//     paddingHorizontal: 14,
//   },
//   recordTimeWrapper: {
//     flex: 1,
//     alignItems: 'center',
//     paddingTop: '25%',
//   },
//   recordButtonWrapper: {
//     marginBottom: '10%',
//     alignItems: 'flex-end',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
// });


import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const VoiceRecorder = () => {
  return (
    <View>
      <Text>VoiceRecorder</Text>
    </View>
  )
}

export default VoiceRecorder

const styles = StyleSheet.create({})