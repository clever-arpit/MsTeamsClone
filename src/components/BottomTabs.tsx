import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import CustomIcon from './CustomIcon';
import { COLORS } from '../styles';

const BottomTabs: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
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
        const color = focused ? COLORS.PRIMARY : COLORS.TEXT_TERTIARY;
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
            <View style={[styles.iconWrap, focused && styles.activeIconWrap]}>
              {typeof options.tabBarIcon === 'function'
                ? options.tabBarIcon({ focused, color, size: 22 })
                : null}
              {badge ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{String(badge)}</Text>
                </View>
              ) : null}
            </View>
            <Text style={[styles.label, { color }]} numberOfLines={1}>
              {String(label)}
            </Text>
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
  activeIconWrap: {
    backgroundColor: COLORS.PRIMARY_LIGHT,
  },
  badge: {
    alignItems: 'center',
    backgroundColor: COLORS.ERROR,
    borderRadius: 8,
    minWidth: 16,
    paddingHorizontal: 4,
    position: 'absolute',
    right: -2,
    top: -2,
  },
  badgeText: {
    color: COLORS.TEXT_INVERSE,
    fontSize: 10,
    fontWeight: '700',
  },
  container: {
    backgroundColor: COLORS.BACKGROUND,
    borderTopColor: '#DCDCE8',
    borderTopWidth: 1,
    flexDirection: 'row',
    minHeight: 64,
    paddingBottom: 4,
    paddingTop: 6,
  },
  iconWrap: {
    alignItems: 'center',
    borderRadius: 8,
    height: 30,
    justifyContent: 'center',
    width: 44,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    minWidth: 0,
  },
});

export default BottomTabs;
