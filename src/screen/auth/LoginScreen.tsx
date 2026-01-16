import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Phone, LockKey } from 'phosphor-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigation';
import { COLORS } from '../../constants/theme';
import { login } from '../../services/authService'; // Ensure this path matches your service

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert('Error', 'Please enter both phone and password');
      return;
    }

    setLoading(true);
    try {
      // Call your existing API logic
      await login(phone, password); 
      // Note: In a real app, you'd update a global Context/Redux state here to switch RootNavigator to "MainTabs"
      console.log('Login Success');
    } catch (err: any) {
      Alert.alert('Login Failed', err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <View className="animate-fade-in w-full max-w-sm mx-auto">
        <Text className="text-3xl font-bold text-blue-900 mb-2">Welcome Back</Text>
        <Text className="text-slate-500 mb-8">Access your health dashboard</Text>
        
        {/* Phone Input */}
        <View className="relative mb-4">
          <View className="absolute left-4 top-4 z-10">
            <Phone size={20} color={COLORS.textLight} weight="bold" />
          </View>
          <TextInput
            placeholder="Mobile Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            className="w-full pl-12 p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
            placeholderTextColor={COLORS.textLight}
          />
        </View>

        {/* Password Input */}
        <View className="relative mb-6">
          <View className="absolute left-4 top-4 z-10">
            <LockKey size={20} color={COLORS.textLight} weight="bold" />
          </View>
          <TextInput
            placeholder="4-Digit PIN"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            keyboardType="numeric"
            maxLength={4}
            className="w-full pl-12 p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
            placeholderTextColor={COLORS.textLight}
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity 
          onPress={handleLogin}
          disabled={loading}
          className="w-full bg-blue-900 py-4 rounded-xl shadow-lg shadow-blue-200 items-center justify-center"
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Login</Text>
          )}
        </TouchableOpacity>

        {/* Switch to Signup */}
        <View className="flex-row justify-center mt-6">
          <Text className="text-slate-500">New to Sushruta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('RoleSelection')}>
            <Text className="text-blue-900 font-bold">Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;