import React from 'react';
import { FlatList, View } from 'react-native';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';
import { useTheme } from '../hooks/ThemeContext';

const RenderItem = ({ isRight = false }) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: isRight ? 'flex-end' : 'flex-start',
        marginVertical: 8,
      }}
    >
      {/* Left avatar only */}
      {!isRight && (
        <ContentLoader
          speed={2}
          width={40}
          height={40}
          viewBox="0 0 40 40"
          backgroundColor={colors.skeleton_background}
          foregroundColor={colors.skeleton_foreground}
        >
          <Circle cx="20" cy="20" r="20" />
        </ContentLoader>
      )}

      {/* Message bubble */}
      <ContentLoader
        speed={2}
        width="60%"
        height={60}
        viewBox="0 0 260 60"
        backgroundColor={colors.skeleton_background}
        foregroundColor={colors.skeleton_foreground}
        style={{
          alignSelf: isRight ? 'flex-end' : 'flex-start',
          marginRight: isRight ? 15 : 0,
          marginLeft: isRight ? 0 : 15,
        }}
      >
        <Rect x="0" y="8" rx="10" ry="10" width="100%" height="14" />
        <Rect x="0" y="30" rx="10" ry="10" width="80%" height="12" />
      </ContentLoader>

      {/* Right avatar only */}
      {isRight && (
        <ContentLoader
          speed={2}
          width={40}
          height={40}
          viewBox="0 0 40 40"
          backgroundColor={colors.skeleton_background}
          foregroundColor={colors.skeleton_foreground}
        >
          <Circle cx="20" cy="20" r="20" />
        </ContentLoader>
      )}
    </View>
  );
};

const ChatSkeleton = () => {
  return (
    <FlatList
      data={Array.from({ length: 15 }, (_, index) => index + 1)}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => <RenderItem isRight={index % 2 === 0} />}
      contentContainerStyle={{ paddingHorizontal: 15 }}
    />
  );
};

export default ChatSkeleton;
