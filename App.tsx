import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      
      <NavigationContainer>
        {/*Navbar root directroy*/}
        <RootNavigator />
        
        {/* Controls the status bar text color (Time, Battery level, etc.) */}
        <StatusBar style="dark" /> 
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
