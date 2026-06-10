import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useAppSelector } from '../../redux/hooks';
import Avatar from './Avatar';
import CustomIcon from '../CustomIcon';
import Icons from '../../utils/Icons';
import { useTheme } from '../../hooks/ThemeContext';
import CustomText from '../CustomText';
import SearchInput from '../SearchInput';

interface AppHeaderProps {
  navigation: any;
}

const AppHeader: React.FC<AppHeaderProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const user = useAppSelector(state => state.auth.user);
  const profile = useAppSelector(state => state.user.profile);
  const unreadMessages = useAppSelector(state =>
    state.message.conversations.reduce(
      (count, conversation) => count + conversation.unreadCount,
      0,
    ),
  );
  const initials =
    `${(user?.firstName ?? profile?.firstName ?? 'L')[0]}${(user?.lastName ?? profile?.lastName ?? 'I')[0]}`.toUpperCase();
  const rootNavigation = navigation.getParent?.();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => rootNavigation?.navigate('Profile')}
        style={styles.avatarButton}
      >
        <Avatar initials={initials} size="small" />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <SearchInput
          value=""
          onChangeText={() => {}}
          onSubmitEditing={() => rootNavigation?.navigate('Search')}
          onFocus={() => rootNavigation?.navigate('Search')}
          placeholder="Search Teams"
        />
      </View>
      <TouchableOpacity
        onPress={() => rootNavigation?.navigate('Messages')}
        style={styles.messageButton}
      >
        <CustomIcon icon={Icons.messageIcon} size={17} color={colors.primary} />
        {unreadMessages > 0 ? (
          <View style={styles.badge}>
            <CustomText text={unreadMessages?.toString()} fontSize={11} />
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  avatarButton: {
    borderRadius: 18,
  },
  messageButton: {
    alignItems: 'center',
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  badge: {
    alignItems: 'center',
    backgroundColor: '#CC1016',
    borderRadius: 8,
    height: 16,
    justifyContent: 'center',
    minWidth: 16,
    position: 'absolute',
    right: 1,
    top: 1,
  },
});

export default AppHeader;
