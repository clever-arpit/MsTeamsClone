import React, { useEffect, useState } from 'react';
import { useTheme } from '../hooks/ThemeContext';
import CustomText from './CustomText';
import { View } from 'react-native';

export const ExpireTimer = React.memo(
  ({ expireTime }: { expireTime: string }) => {
    const [timeLeft, setTimeLeft] = useState('');
    const { colors } = useTheme();

    const getRemainingTime = (time: string) => {
      const now = Date.now();
      const expire = new Date(time).getTime();

      const diff = expire - now;

      if (diff <= 0) {
        return 'Expired';
      }

      const minutes = Math.floor(diff / 1000 / 60);
      const seconds = Math.floor((diff / 1000) % 60);

      return `${minutes}m ${seconds}s`;
    };

    useEffect(() => {
      setTimeLeft(getRemainingTime(expireTime));

      const interval = setInterval(() => {
        setTimeLeft(getRemainingTime(expireTime));
      }, 1000);

      return () => clearInterval(interval);
    }, [expireTime]);

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {timeLeft === 'Expired' && (
          <CustomText text="Expired" fontSize={12} color={colors.dark_red} />
        )}
        {timeLeft !== 'Expired' && (
          <CustomText text="Expires in " fontSize={12} />
        )}
        {timeLeft !== 'Expired' && (
          <CustomText text={timeLeft} fontSize={12} color={colors.dark_red} />
        )}
      </View>
    );
  },
);
