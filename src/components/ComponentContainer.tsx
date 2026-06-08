import React, { ReactNode } from 'react';
import { ScrollView, ScrollViewProps, View, ViewStyle } from 'react-native';

interface ComponentContainerProps {
  children: ReactNode;
  customStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  scrollable?: boolean;
  ref?: ScrollViewProps['scrollViewRef'];
}

const ComponentContainer: React.FC<ComponentContainerProps> = ({
  children,
  customStyle,
  contentContainerStyle,
  scrollable = false,
  ref,
}) => {
  return scrollable ? (
    <ScrollView
      ref={ref}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={[
        {
          flex: 1,
          paddingHorizontal: 12,
        },
        customStyle,
      ]}
      contentContainerStyle={contentContainerStyle}
    >
      {children}
    </ScrollView>
  ) : (
    <View
      style={[
        {
          flex: 1,
          paddingHorizontal: 12,
        },
        customStyle,
      ]}
    >
      {children}
    </View>
  );
};

export default ComponentContainer;
