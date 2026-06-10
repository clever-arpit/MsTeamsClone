import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector } from '../redux/hooks';
import { useTheme } from '../hooks/ThemeContext';
import { AppHeader } from '../components/common';
import ActivityScreen from '../screens/activity/ActivityScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SplashScreen from '../screens/auth/SplashScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import ConversationsScreen from '../screens/messages/ConversationsScreen';
import ChatScreen from '../screens/messages/ChatScreen';
import CallsScreen from '../screens/calls/CallsScreen';
import FilesScreen from '../screens/files/FilesScreen';
import CalendarScreen from '../screens/calendar/CalendarScreen';
import MoreScreen from '../screens/more/MoreScreen';
import Icons from '../utils/Icons';
import SearchScreen from '../screens/search/SearchScreen';
import CallDetailScreen from '../screens/calls/CallDetailScreen';
import BottomTabs, { TabIcon } from '../components/BottomTabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

const AppTabs = () => {
  const { colors } = useTheme();
  const unreadNotifications = useAppSelector(
    state => state.notification.unreadCount,
  );

  return (
    <Tab.Navigator
      tabBar={props => <BottomTabs {...props} />}
      screenOptions={({ navigation }) => ({
        tabBarActiveTintColor: colors.teams_purple,
        tabBarInactiveTintColor: '#8A8D91',
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          paddingTop: 2,
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#D0CACE',
          borderTopWidth: 1,
          elevation: 8,
          paddingBottom: 0,
          paddingTop: 7,
          shadowColor: '#000000',
          shadowOpacity: 0.08,
          shadowRadius: 8,
        },
        keyboardHidesTabBar: false,
        tabBarBadgeStyle: {
          backgroundColor: '#CC1016',
          color: '#FFFFFF',
          fontSize: 10,
          fontWeight: '700',
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: '#FFFFFF',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitle: () => <AppHeader navigation={navigation} />,
        headerTitleAlign: 'center',
        headerLeft: () => null,
        headerRight: () => null,
      })}
    >
      <Tab.Screen
        name="ActivityTab"
        component={ActivityScreen}
        options={{
          title: 'Activity',
          tabBarLabel: 'Activity',
          tabBarBadge: unreadNotifications > 0 ? unreadNotifications : undefined,
          tabBarIcon: ({ color }) => (
            <TabIcon icon={Icons.activityIcon} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ChatTab"
        component={ConversationsScreen}
        options={{
          title: 'Chat',
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color }) => (
            <TabIcon icon={Icons.teamChatIcon} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CallsTab"
        component={CallsScreen}
        options={{
          title: 'Calls',
          tabBarLabel: 'Calls',
          tabBarIcon: ({ color }) => (
            <TabIcon icon={Icons.callsIcon} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="FilesTab"
        component={FilesScreen}
        options={{
          title: 'Files',
          tabBarLabel: 'Files',
          tabBarIcon: ({ color }) => (
            <TabIcon icon={Icons.fileIcon} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CalendarTab"
        component={CalendarScreen}
        options={{
          title: 'Calendar',
          tabBarLabel: 'Calendar',
          tabBarIcon: ({ color }) => (
            <TabIcon icon={Icons.calendarIcon} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MoreTab"
        component={MoreScreen}
        options={{
          title: 'More',
          tabBarLabel: 'More',
          tabBarIcon: ({ color }) => (
            <TabIcon icon={Icons.verticalDotsIcon} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const RootNavigator = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          <>
            <Stack.Screen name="App" component={AppTabs} />
            <Stack.Screen
              name="Messages"
              component={ChatScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CallDetail"
              component={CallDetailScreen}
              options={{ headerShown: true, headerTitle: 'Call details' }}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{
                headerShown: true,
                headerTitle: 'Search',
                headerStyle: styles.stackHeader,
                headerTitleStyle: styles.stackHeaderTitle,
              }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                headerShown: true,
                headerTitle: 'Profile',
                headerStyle: styles.stackHeader,
                headerTitleStyle: styles.stackHeaderTitle,
              }}
            />
          </>
        )}
        <Stack.Screen name="Splash" component={SplashScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({
  stackHeader: {
    backgroundColor: '#FFFFFF',
  },
  stackHeaderTitle: {
    color: '#000000',
    fontWeight: '700',
  },
});
