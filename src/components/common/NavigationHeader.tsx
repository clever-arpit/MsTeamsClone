import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppSelector } from '../../redux/hooks';
import { useTheme } from '../../hooks/ThemeContext';
import { useProfileDrawer } from '../../hooks/ProfileDrawerContext';
import { SPACING, TYPOGRAPHY } from '../../styles';
import Icons from '../../utils/Icons';
import CustomIcon from '../CustomIcon';
import CustomText from '../CustomText';
import Avatar from './Avatar';

type HeaderVariant = 'stack' | 'tabs';

interface NavigationHeaderProps {
  navigation: any;
  routeName?: string;
  subtitle?: string;
  title?: string;
  variant?: HeaderVariant;
}

const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  navigation,
  routeName,
  subtitle,
  title,
  variant = 'stack',
}) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const user = useAppSelector(state => state.auth.user);
  const profile = useAppSelector(state => state.user.profile);
  const initials =
    `${(user?.firstName ?? profile?.firstName ?? 'L')[0]}${(user?.lastName ?? profile?.lastName ?? 'I')[0]}`.toUpperCase();
  const rootNavigation = navigation.getParent?.() ?? navigation;

  const { openDrawer } = useProfileDrawer();

  const openProfile = () => {
    if (openDrawer) {
      openDrawer();
      return;
    }
    rootNavigation.navigate('Profile');
  };

  const renderAction = (icon: any, onPress?: () => void) => (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={styles.actionButton}
    >
      <CustomIcon icon={icon} color={colors.header_icon_color ?? colors.text} size={24} />
    </Pressable>
  );

  const renderTabActions = () => {
    switch (routeName) {
      case 'CallsTab':
        return (
          <>
            {renderAction(Icons.voiceMailIcon)}
            {renderAction(Icons.searchIcon, () => rootNavigation.navigate('Search'))}
          </>
        );
      case 'ChatTab':
        return (
          <>
            {renderAction(Icons.aiIcon)}
            {renderAction(Icons.searchIcon, () => rootNavigation.navigate('Search'))}
            {renderAction(Icons.verticalDotsIcon)}
          </>
        );
      case 'CalendarTab':
        return (
          <>
            {renderAction(Icons.searchIcon, () => rootNavigation.navigate('Search'))}
            {renderAction(Icons.cameraIcon)}
          </>
        );
      case 'ActivityTab':
        return (
          <>
            {renderAction(Icons.searchIcon, () => rootNavigation.navigate('Search'))}
            {renderAction(Icons.verticalDotsIcon)}
          </>
        );
      default:
        return (
          <>
            {renderAction(Icons.searchIcon, () => rootNavigation.navigate('Search'))}
            {renderAction(Icons.verticalDotsIcon)}
          </>
        );
    }
  };

  return (
    <View
      style={[
        styles.safeArea,
        {
          backgroundColor: colors.background,
          borderBottomColor: colors.divider_color,
          paddingTop: insets.top,
        },
      ]}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {variant === 'tabs' ? (
          <>
            <Pressable
              accessibilityRole="button"
              onPress={openProfile}
              style={styles.profileButton}
            >
              <Avatar initials={initials} size="small" />
            </Pressable>
            <CustomText
              text={title}
              numberOfLines={1}
              color={colors.text}
              customStyle={styles.tabTitle}
            />
            <View style={styles.actions}>{renderTabActions()}</View>
          </>
        ) : (
          <View style={styles.stackLeft}>
            <Pressable
              accessibilityRole="button"
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <CustomIcon
                icon={Icons.backIcon}
                color={colors.header_icon_color ?? colors.text}
                size={26}
              />
            </Pressable>
            <View style={styles.stackTitleBlock}>
              <CustomText
                text={title}
                numberOfLines={1}
                color={colors.text}
                customStyle={styles.title}
              />
              {subtitle ? (
                <CustomText
                  text={subtitle}
                  numberOfLines={1}
                  color={colors.sub_title}
                  customStyle={styles.subtitle}
                />
              ) : null}
            </View>
            {routeName === 'Messages' ? (
              <View style={styles.actions}>
                {renderAction(Icons.cameraIcon)}
                {renderAction(Icons.callsIcon)}
                {renderAction(Icons.infoIcon)}
              </View>
            ) : null}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    marginLeft: -8,
    width: 40,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 64,
    paddingHorizontal: SPACING.M,
  },
  actionButton: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACING.S,
    marginLeft: 'auto',
  },
  profileButton: {
    borderRadius: 20,
    marginRight: SPACING.M,
  },
  safeArea: {
    borderBottomWidth: 1,
  },
  stackLeft: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  stackTitleBlock: {
    flex: 1,
    marginLeft: SPACING.S,
  },
  subtitle: {
    ...TYPOGRAPHY.BODY2,
    marginTop: 2,
  },
  tabTitle: {
    ...TYPOGRAPHY.H2,
    flex: 1,
  },
  title: {
    ...TYPOGRAPHY.SUBTITLE1,
  },
});

export default NavigationHeader;
