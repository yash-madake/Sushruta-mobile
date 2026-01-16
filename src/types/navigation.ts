import { NavigatorScreenParams } from '@react-navigation/native';

/**
 * 1. Auth Stack
 * Screens for the login/signup flow.
 */
export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  OtpVerification: { phoneNumber: string }; // Example: Passing phone number to OTP screen
  RoleSelection: undefined;
};

/**
 * 2. Bottom Tab Stack
 * The main 5 tabs visible at the bottom of the app.
 */
export type BottomTabParamList = {
  Dashboard: undefined;
  Medicine: undefined;
  Wellness: undefined;
  Records: undefined;
  Profile: undefined;
};

/**
 * 3. Root Stack
 * This combines everything. It holds the Auth flow, the Main Tabs,
 * and standalone feature screens (like GPS or AI Assistant) that get pushed on top.
 */
export type RootStackParamList = {
  // Navigator Wrappers
  Auth: NavigatorScreenParams<AuthStackParamList>;
  MainTabs: NavigatorScreenParams<BottomTabParamList>;

  // Individual Feature Screens (Accessed from Dashboard)
  AiAssistant: undefined;
  GpsTracker: undefined;
  Appointments: undefined;
  Reports: undefined;
  Insurance: undefined;
  Schemes: undefined; // Government Schemes
  EmotionalWellness: undefined;
};

/**
 * Helper Types
 * Use these in your screens to get type-checking for navigation.
 */
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';

// Type for a screen in the Root Stack (e.g., GPS, AI Assistant)
export type RootScreenProps<T extends keyof RootStackParamList> = 
  NativeStackScreenProps<RootStackParamList, T>;

// Type for a screen in the Auth Stack
export type AuthScreenProps<T extends keyof AuthStackParamList> = 
  NativeStackScreenProps<AuthStackParamList, T>;

// Type for a screen in the Bottom Tabs (Complex because it needs to know about Root too)
export type TabScreenProps<T extends keyof BottomTabParamList> = 
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;