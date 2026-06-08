import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector } from '../redux/hooks';
import { useTheme } from '../hooks/ThemeContext';
import { AppHeader, BottomTabIcon } from '../components/common';
import JobsScreen from '../screens/jobs/JobsScreen';
import FeedScreen from '../screens/feed/FeedScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SplashScreen from '../screens/auth/SplashScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import SearchScreen from '../screens/search/SearchScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import CreatePostScreen from '../screens/feed/CreatePostScreen';
import MessagesScreen from '../screens/messages/MessagesScreen';
import ConnectionsScreen from '../screens/connections/ConnectionsScreen';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';
import Icons from '../utils/Icons';
import CustomIcon from '../components/CustomIcon';

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
      screenOptions={({ navigation }) => ({
        tabBarActiveTintColor: colors.linkedin_blue,
        tabBarInactiveTintColor: '#8A8D91',
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
          paddingBottom:  0,
          paddingTop: 7,
          shadowColor: '#000000',
          shadowOpacity: 0.08,
          shadowRadius: 8,
        },
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
        name="FeedTab"
        component={FeedScreen}
        options={{
          title: 'Feed',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <CustomIcon icon={Icons.homeIcon} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ConnectionsTab"
        component={ConnectionsScreen}
        options={{
          title: 'My Network',
          tabBarLabel: 'Network',
          tabBarIcon: ({ color, focused }) => (
            <CustomIcon icon={Icons.networkIcon} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CreatePostTab"
        component={CreatePostScreen}
        options={{
          title: 'Post',
          tabBarLabel: 'Post',
          tabBarIcon: ({ color, focused }) => (
            <CustomIcon icon={Icons.plusIcon} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="NotificationsTab"
        component={NotificationsScreen}
        options={{
          title: 'Notifications',
          tabBarLabel: 'Notifications',
          tabBarBadge: unreadNotifications || undefined,
          tabBarIcon: ({ color, focused }) => (
            <CustomIcon icon={Icons.bellIcon} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="JobsTab"
        component={JobsScreen}
        options={{
          title: 'Jobs',
          tabBarLabel: 'Jobs',
          tabBarIcon: ({ color, focused }) => (
            <CustomIcon icon={Icons.jobsIcon} color={color} />
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
              component={MessagesScreen}
              options={{
                headerShown: true,
                headerTitle: 'Messaging',
                headerStyle: styles.stackHeader,
                headerTitleStyle: styles.stackHeaderTitle,
              }}
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
