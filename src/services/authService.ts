import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSION_KEY = 'activeUser';

export const AuthService = {
  // Get currently logged in user
  getCurrentUser: async () => {
    try {
      const session = await AsyncStorage.getItem(SESSION_KEY);
      return session ? JSON.parse(session) : null;
    } catch (e) {
      return null;
    }
  },

  // Log in user
  login: async (user: any) => {
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
  },

  // Log out user
  logout: async () => {
    await AsyncStorage.removeItem(SESSION_KEY);
  },

  // Check if user is authenticated
  isAuthenticated: async () => {
    const session = await AsyncStorage.getItem(SESSION_KEY);
    return !!session;
  }
};