import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomIcon from './CustomIcon';
import CustomText from './CustomText';
import { useTheme } from '../hooks/ThemeContext';

const BottomTabs: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.tab_background,
          borderTopColor: colors.tab_border_color,
          paddingBottom: Math.max(insets.bottom, 10),
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const descriptor = descriptors[route.key];
        const options = descriptor.options;
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const focused = state.index === index;
        const color = focused
          ? colors.teams_purple ?? colors.tab_icon_focus
          : colors.tab_icon;
        const badge = options.tabBarBadge;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={focused ? { selected: true } : {}}
            onPress={onPress}
            style={styles.tab}
          >
            <View style={styles.iconWrap}>
              {typeof options.tabBarIcon === 'function'
                ? options.tabBarIcon({ focused, color, size: 22 })
                : null}
              {badge ? (
                <View style={styles.badge}>
                  <CustomText
                    text={String(badge)}
                    color={colors.white}
                    customStyle={styles.badgeText}
                  />
                </View>
              ) : null}
            </View>
            <CustomText
              text={String(label)}
              color={color}
              numberOfLines={1}
              customStyle={styles.label}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

export const TabIcon = ({ icon, color }: { icon: any; color: string }) => (
  <CustomIcon icon={icon} color={color} size={21} />
);

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    backgroundColor: '#E85D56',
    borderRadius: 8,
    minWidth: 16,
    paddingHorizontal: 4,
    position: 'absolute',
    right: -2,
    top: -2,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  container: {
    borderTopWidth: 1,
    flexDirection: 'row',
    minHeight: 74,
    paddingTop: 9,
  },
  iconWrap: {
    alignItems: 'center',
    height: 28,
    justifyContent: 'center',
    width: 42,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    minWidth: 0,
  },
});

export default BottomTabs;
