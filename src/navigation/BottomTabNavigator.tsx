
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { House, Pill, Heartbeat, Files, User } from 'phosphor-react-native';

// Import Types
import { BottomTabParamList } from '../types/navigation';
import { COLORS } from '../constants/theme';

// Import Screens (We will create these next)
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import MedicineScreen from '../screens/medicine/MedicineScreen';
import WellnessScreen from '../screens/wellness/WellnessScreen';
import ReportsScreen from '../screens/records/ReportsScreen'; // Using Reports as the main "Records" tab
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary, // Your Medical Blue
        tabBarInactiveTintColor: COLORS.textLight, // Grey for inactive
        tabBarStyle: {
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        // Dynamic Icon Logic
        tabBarIcon: ({ color, size, focused }) => {
          const weight = focused ? 'fill' : 'regular';
          
          switch (route.name) {
            case 'Dashboard':
              return <House size={size} color={color} weight={weight} />;
            case 'Medicine':
              return <Pill size={size} color={color} weight={weight} />;
            case 'Wellness':
              return <Heartbeat size={size} color={color} weight={weight} />;
            case 'Records':
              return <Files size={size} color={color} weight={weight} />;
            case 'Profile':
              return <User size={size} color={color} weight={weight} />;
            default:
              return <House size={size} color={color} weight={weight} />;
          }
        },
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen 
        name="Medicine" 
        component={MedicineScreen} 
        options={{ tabBarLabel: 'Meds' }}
      />
      <Tab.Screen 
        name="Wellness" 
        component={WellnessScreen} 
        options={{ tabBarLabel: 'Wellness' }}
      />
      <Tab.Screen 
        name="Records" 
        component={ReportsScreen} 
        options={{ tabBarLabel: 'Records' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;