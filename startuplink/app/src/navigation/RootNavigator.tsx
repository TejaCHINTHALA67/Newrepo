import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import HomeFeedScreen from '../screens/HomeFeedScreen';
import BrowseScreen from '../screens/BrowseScreen';
import CreateStartupScreen from '../screens/CreateStartupScreen';
import GroupsScreen from '../screens/GroupsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import StartupProfileScreen from '../screens/StartupProfileScreen';
import UpdatesScreen from '../screens/UpdatesScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#0B0F14', borderTopColor: '#1b2430' },
        tabBarActiveTintColor: '#6C63FF',
        tabBarInactiveTintColor: '#9aa4b2',
        tabBarIcon: ({ focused, color, size }) => {
          const name = route.name === 'Home' ? 'home' :
            route.name === 'Browse' ? 'grid' :
            route.name === 'Create' ? 'add-circle' :
            route.name === 'Groups' ? 'chatbubbles' : 'person';
          return <Ionicons name={focused ? (name + '') : (name + '-outline') as any} size={size} color={color} />
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeFeedScreen} />
      <Tab.Screen name="Browse" component={BrowseScreen} />
      <Tab.Screen name="Create" component={CreateStartupScreen} />
      <Tab.Screen name="Groups" component={GroupsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={Tabs} options={{ headerShown: false }} />
      <Stack.Screen name="StartupProfile" component={StartupProfileScreen} options={{ title: 'Startup' }} />
      <Stack.Screen name="Updates" component={UpdatesScreen} />
      <Stack.Screen name="Analytics" component={AnalyticsScreen} />
    </Stack.Navigator>
  );
}