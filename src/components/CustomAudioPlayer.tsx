import React, { useState, useEffect, useRef, FC } from 'react';
import { View, Alert, Image, TouchableOpacity, ViewStyle } from 'react-native';
import Sound from 'react-native-sound';
import Slider from '@react-native-community/slider';
import Icons from '../utils/Icons';
import CustomText from './CustomText';
import { useTheme } from '../hooks/ThemeContext';

interface AudioPlayerProps {
  uri: string;
  sliderWidth?: ViewStyle['width'];
}

const CustomAudioPlayer: FC<AudioPlayerProps> = ({
  uri,
  sliderWidth = '50%',
}) => {
  const { colors } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [newDuration, setNewDuration] = useState(0);
  const [loadError, setLoadError] = useState<any>(null);
  const soundRef = useRef<Sound | null>(null);

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.release();
      setIsPlaying(false);
      setCurrentTime(0);
    }
    setLoadError(null);
    setCurrentTime(0);
    setNewDuration(0);

    const isValidUri = typeof uri === 'string' && uri.trim().length > 0;
    if (!isValidUri) {
      setLoadError({ message: 'Invalid audio source' });
      return;
    }

    const newSound = new Sound(uri, '', error => {
      if (error) {
        console.log('Error loading sound:', error);
        setLoadError(error);
        return;
      }

      const duration = newSound.getDuration();
      setNewDuration(duration);
      soundRef.current = newSound;
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
        soundRef.current.release();
      }
    };
  }, [uri]);

  const updateCurrentTime = () => {
    if (soundRef.current && isPlaying) {
      soundRef.current.getCurrentTime(current => {
        setCurrentTime(current);
      });
    }
  };

  useEffect(() => {
    const progressInterval = setInterval(updateCurrentTime, 1000);
    return () => {
      clearInterval(progressInterval);
    };
  }, [isPlaying]);

  const playPause = () => {
    if (loadError) {
      Alert.alert('Audio', 'Unable to load this audio file.');
      return;
    }

    const playSound = () => {
      if (soundRef.current) {
        if (isPlaying) {
          soundRef.current.pause();
        } else {
          soundRef.current.play(() => {
            setIsPlaying(false);
            setCurrentTime(0);
          });
        }
        setIsPlaying(!isPlaying);
      }
    };

    if (!soundRef.current) {
      const newSound = new Sound(uri, '', error => {
        if (error) {
          console.log('Error loading sound:', error);
          setLoadError(error);
          return;
        }

        const duration = newSound.getDuration();
        setNewDuration(duration);
        soundRef.current = newSound;
        playSound();
      });
    } else {
      playSound();
    }
  };

  const handleSliderChange = (value: number) => {
    if (loadError) {
      return;
    }
    if (soundRef.current) {
      soundRef.current.setCurrentTime(value);
      setCurrentTime(value);
    }
  };

  const formattedDuration = secondsToMinutesAndSeconds(newDuration);
  const formattedCurrentTime = secondsToMinutesAndSeconds(currentTime);

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.media_background,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 7,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 15,
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.blue,
            borderRadius: 50,
            gap: 2,
          }}
        >
          <Image
            source={Icons.headphoneIcon}
            style={{ width: 22, height: 22, tintColor: colors.white }}
          />
          <CustomText
            text={isPlaying ? formattedCurrentTime : formattedDuration}
            fontSize={9}
            color={colors.white}
          />
        </View>
        <TouchableOpacity onPress={playPause}>
          <Image
            source={isPlaying ? Icons.pauseIcon : Icons.playIcon}
            style={{ width: 23, height: 23, tintColor: colors.icon_color }}
          />
        </TouchableOpacity>
      </View>
      <Slider
        value={currentTime}
        minimumValue={0}
        maximumValue={newDuration}
        style={{ width: sliderWidth, height: 35, marginLeft: 15 }}
        thumbTintColor={colors.blue}
        minimumTrackTintColor={colors.blue}
        onValueChange={handleSliderChange}
        onSlidingStart={() => setCurrentTime(currentTime)}
        onSlidingComplete={value => {
          if (soundRef.current) {
            soundRef.current.setCurrentTime(value);
            setCurrentTime(value);
          }
        }}
        disabled={!!loadError || (!isPlaying && currentTime === 0)}
      />
    </View>
  );
};

function secondsToMinutesAndSeconds(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60).toString();
  return `${minutes < 10 ? '0' : ''}${minutes}:${
    remainingSeconds.length < 2 ? '0' : ''
  }${remainingSeconds}`;
}

export default CustomAudioPlayer;
