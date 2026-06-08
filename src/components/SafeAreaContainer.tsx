import React, { ReactNode } from 'react';
import {
  StatusBar,
  View,
  ViewStyle,
  StatusBarStyle,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/ThemeContext';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface SafeAreaContainerProps {
  children: ReactNode;
  customStyle?: ViewStyle | ViewStyle[];
  scrollable?: boolean;
  background?: string;
  statusBarBackground?: ViewStyle['backgroundColor'];
  headerBgColor?: ViewStyle['backgroundColor'];
}

const SafeAreaContainer: React.FC<SafeAreaContainerProps> = ({
  children,
  background,
  customStyle,
  headerBgColor,
  scrollable = false,
  statusBarBackground,
}) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const isOnCall = useSelector((state: RootState) => state.callRecord.isOnCall);

  const statusBarStyle: StatusBarStyle =
    colors.status_bar_style as StatusBarStyle;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: background ?? colors.background,
      }}
    >
      <View
        style={{
          height: isOnCall ? 10 : insets.top,
          backgroundColor: headerBgColor,
        }}
      />
      <StatusBar
        backgroundColor={statusBarBackground ?? colors.background}
        animated={true}
        barStyle={statusBarStyle}
        translucent
      />
      {scrollable ? (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={[
            {
              flex: 1,
              paddingLeft: insets.left,
              paddingRight: insets.right,
            },
            customStyle,
          ]}
        >
          {children}
        </ScrollView>
      ) : (
        <View
          style={[
            {
              flex: 1,
              paddingLeft: insets.left,
              paddingRight: insets.right,
            },
            customStyle,
          ]}
        >
          {children}
        </View>
      )}
    </View>
  );
};

export default SafeAreaContainer;
