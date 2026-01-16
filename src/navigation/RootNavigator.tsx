import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

// Import Navigators
import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';

// Import Feature Screens
import AiAssistantScreen from '../screens/assistant/AiAssistantScreen';
import GpsTrackerScreen from '../screens/gps/GPSTrackerScreen';
import AppointmentsScreen from '../screens/connect/AppointmentsScreen';
import ReportsScreen from '../screens/records/ReportsScreen';
import InsuranceScreen from '../screens/records/InsuranceScreen';
import SchemesScreen from '../screens/resources/SchemesScreen';
import EmotionalWellnessScreen from '../screens/wellness/EmotionalWellnessScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  // TODO: Replace this with real auth logic from your authService
  const [isAuthenticated, setIsAuthenticated] = useState(true); 

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        // IF LOGGED IN: Show Main App + Features
        <Stack.Group>
          {/* The Bottom Tabs (Home, Meds, Wellness...) */}
          <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
          
          {/* Individual Feature Screens (Pushed on top of tabs) */}
          <Stack.Screen 
            name="AiAssistant" 
            component={AiAssistantScreen} 
            options={{ presentation: 'modal' }} // Opens like a popup
          />
          <Stack.Screen name="GpsTracker" component={GpsTrackerScreen} />
          <Stack.Screen name="Appointments" component={AppointmentsScreen} />
          <Stack.Screen name="Reports" component={ReportsScreen} />
          <Stack.Screen name="Insurance" component={InsuranceScreen} />
          <Stack.Screen name="Schemes" component={SchemesScreen} />
          <Stack.Screen name="EmotionalWellness" component={EmotionalWellnessScreen} />
        </Stack.Group>
      ) : (
        // IF NOT LOGGED IN: Show Auth Flow
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;