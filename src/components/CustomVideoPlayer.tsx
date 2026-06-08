import React, { useState, useEffect, FC, useRef } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Video from 'react-native-video';
import Icons from '../utils/Icons';
import { ThreadMessageActionMenu } from '../utils/Constants';
import { useTheme } from '../hooks/ThemeContext';
import { MessageThread } from '../types/DataType';
import CustomMenu from './CustomMenu';
import CustomText from './CustomText';
import CustomModal from './CustomModal';
import CustomHeader from './CustomHeader';

interface CustomVideoPlayerProps {
  uri: string;
  title: string;
  style?: ViewStyle;
  playVisible?: boolean;
}

const CustomVideoPlayer: FC<CustomVideoPlayerProps> = ({
  uri,
  title,
  style,
  playVisible = true,
}) => {
  const { colors } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [maximize, setMaximize] = useState<boolean>(false);
  const [isEnded, setIsEnded] = useState(false);
  const videoRef = useRef<any>(null);

  useEffect(() => {
    setLoadError(null);
    setIsEnded(false);
  }, [uri]);

  const handleError = (error: any) => {
    console.log('Video Error: ', error);
    setLoadError('Unable to load video.');
  };

  const handleEnd = () => {
    setIsPlaying(false);
    setIsEnded(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.seek(0);
    }
    setIsPlaying(true);
    setIsEnded(false);
  };

  return (
    <View>
      {!maximize && (
        <View style={[styles.videoContainer]}>
          <Video
            ref={videoRef}
            source={{ uri }}
            poster={uri}
            paused={!isPlaying}
            onError={handleError}
            onEnd={handleEnd}
            style={[styles.video, style]}
            resizeMode="stretch"
          />
          {loadError && (
            <CustomText text={loadError} fontSize={12} color={colors.red} />
          )}
          {playVisible && (
            <TouchableOpacity
              style={styles.playPauseButton}
              onPress={handlePlayPause}
            >
              <Image
                source={isPlaying ? Icons.pauseIcon : Icons.playIcon}
                style={[styles.icon, { tintColor: colors.white }]}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.maximizeButton}
            onPress={() => setMaximize(true)}
          >
            <Image
              source={Icons.maximizeIcon}
              style={{ tintColor: colors.white, width: 16, height: 16 }}
            />
          </TouchableOpacity>
        </View>
      )}

      <CustomModal
        visible={maximize}
        onClose={() => setMaximize(false)}
        modalContainerStyle={{
          flex: 1,
          width: '100%',
          borderRadius: 0,
          padding: 0,
        }}
        modalContentStyle={{ marginTop: 0 }}
        overlayClose={false}
        headerShown={false}
      >
        <CustomHeader
          title={title}
          onBackPress={() => setMaximize(false)}
          rightIcon1={Icons.replyIcon}
          iconColor={colors.icon_color}
          iconSize={22}
          customRight={
            <CustomMenu
              actions={ThreadMessageActionMenu}
              onPressAction={eventId => {}}
            />
          }
        />
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Video
            ref={videoRef}
            source={{ uri }}
            poster={uri}
            paused={!isPlaying}
            onError={handleError}
            onEnd={handleEnd}
            style={{ height: '92%', width: '100%' }}
            resizeMode="contain"
          />
          {loadError ? (
            <CustomText text={loadError} fontSize={12} color={colors.red} />
          ) : (
            <TouchableOpacity
              style={styles.playPauseButton}
              onPress={handlePlayPause}
            >
              <Image
                source={isPlaying ? Icons.pauseIcon : Icons.playIcon}
                style={{ tintColor: colors.white, width: 30, height: 30 }}
              />
            </TouchableOpacity>
          )}

          {isEnded && (
            <TouchableOpacity
              style={styles.playPauseButton}
              onPress={handleReplay}
            >
              <Image
                source={isPlaying ? Icons.pauseIcon : Icons.playIcon}
                style={{ tintColor: colors.white, width: 30, height: 30 }}
              />
            </TouchableOpacity>
          )}
        </View>
      </CustomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: 120,
    height: 120,
  },
  playPauseButton: {
    position: 'absolute',
    zIndex: 1,
  },
  maximizeButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 1,
  },
  icon: {
    width: 22,
    height: 22,
  },
});

export default CustomVideoPlayer;
