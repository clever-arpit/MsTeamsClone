import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector } from '../redux/hooks';
import { NavigationHeader } from '../components/common';
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
  const unreadNotifications = useAppSelector(
    state => state.notification.unreadCount,
  );

  return (
    <Tab.Navigator
      tabBar={props => <BottomTabs {...props} />}
      screenOptions={({ navigation }) => ({
        tabBarActiveTintColor: '#7E84FF',
        tabBarInactiveTintColor: '#E8E8E8',
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          paddingTop: 2,
        },
        tabBarStyle: {
          backgroundColor: '#171717',
          borderTopColor: '#2B2B2B',
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
        header: ({ route, options }) => (
          <NavigationHeader
            navigation={navigation}
            routeName={route.name}
            title={typeof options.title === 'string' ? options.title : route.name}
            variant="tabs"
          />
        ),
      })}
    >
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
        name="CalendarTab"
        component={CalendarScreen}
        options={{
          title: 'June',
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
      <Stack.Navigator
        screenOptions={{
          header: ({ navigation, route, options }) => (
            <NavigationHeader
              navigation={navigation}
              routeName={route.name}
              subtitle={
                (route.params as { subtitle?: string } | undefined)?.subtitle
              }
              title={
                typeof options.title === 'string' ? options.title : route.name
              }
            />
          ),
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="App"
              component={AppTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Messages"
              component={ChatScreen}
              options={({ route }) => ({
                title:
                  (route.params as { title?: string } | undefined)?.title ??
                  'Chat',
              })}
            />
            <Stack.Screen
              name="CallDetail"
              component={CallDetailScreen}
              options={{ title: 'Call details' }}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{ title: 'Search' }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ title: 'Profile' }}
            />
          </>
        )}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
