import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Animated,
  Pressable,
  Switch,
  Dimensions,
} from 'react-native';
import { useProfileDrawer } from '../../hooks/ProfileDrawerContext';
import { useTheme } from '../../hooks/ThemeContext';
import { useAppSelector } from '../../redux/hooks';
import CustomText from '../CustomText';
import Avatar from './Avatar';
import CustomIcon from '../CustomIcon';
import Icons from '../../utils/Icons';

const { width } = Dimensions.get('window');

const ProfileDrawer: React.FC = () => {
  const { isOpen, closeDrawer } = useProfileDrawer();
  const { colors, mode, toggleTheme } = useTheme();
  const profile = useAppSelector(s => s.user.profile);
  const user = useAppSelector(s => s.auth.user);

  const translateX = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    if (isOpen) {
      Animated.timing(translateX, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateX, {
        toValue: width,
        duration: 220,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen, translateX]);

  const items = [
    'Account',
    'Chat Settings',
    'Privacy & Security',
    'Notifications',
    'Data and Storage',
    'Chat Folders',
    'Devices',
    'Power Saving',
  ];

  return (
    <Modal visible={isOpen} transparent animationType="none">
      <Pressable style={[styles.overlay, { backgroundColor: colors.overlay }]} onPress={closeDrawer} />
      <Animated.View
        style={[
          styles.drawer,
          { backgroundColor: colors.surface, transform: [{ translateX }] },
        ]}
      >
        <View style={styles.header}>
          <Avatar
            source={
              profile?.profileImage ? { uri: profile.profileImage } : undefined
            }
            initials={
              `${(user?.firstName ?? profile?.firstName ?? 'A')[0]}${(user?.lastName ?? profile?.lastName ?? '')[0] ?? ''}`.toUpperCase()
            }
            size="large"
          />
          <View style={styles.headerText}>
            <CustomText text={`${user?.firstName ?? profile?.firstName ?? ''} ${user?.lastName ?? profile?.lastName ?? ''}`} customStyle={styles.name} />
            <CustomText text={user?.phone ?? profile?.phone ?? ''} customStyle={styles.sub} />
          </View>
        </View>

        <View style={styles.list}>
          {items.map(i => (
            <Pressable key={i} style={styles.item} onPress={() => {}}>
              <CustomText text={i} customStyle={styles.itemText} />
              <CustomIcon icon={Icons.rightArrow} color={colors.text} size={18} />
            </Pressable>
          ))}

          <View style={styles.themeRow}>
            <CustomText text="Dark Mode" customStyle={styles.itemText} />
            <Switch
              value={mode === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={mode === 'dark' ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: Math.min(420, width * 0.9),
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    paddingTop: 40,
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerText: {
    marginLeft: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
  },
  sub: {
    fontSize: 13,
    marginTop: 4,
  },
  list: {
    marginTop: 24,
    paddingHorizontal: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  itemText: {
    fontSize: 16,
  },
  themeRow: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default ProfileDrawer;
