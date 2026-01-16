import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { User, Phone, LockKey, CaretRight, WarningCircle } from 'phosphor-react-native';
import { COLORS } from '../../constants/theme';
import { signup } from '../../services/authService';

const SignupScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Get role passed from previous screen, default to 'senior'
  // @ts-ignore
  const { role } = route.params || { role: 'senior' };

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    // Basic Validation
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (formData.password.length < 4) {
      Alert.alert('Error', 'PIN must be at least 4 digits');
      return;
    }

    setLoading(true);
    try {
      const userPayload = {
        name: formData.name,
        phone: formData.phone,
        password: formData.password,
        role: role
      };

      // Call API
      await signup(userPayload);
      
      // On success, go to OTP or Login
      // For now, let's assume we verify OTP next
      // @ts-ignore
      navigation.navigate('OtpVerification', { phoneNumber: formData.phone });

    } catch (err: any) {
      Alert.alert('Signup Failed', err.message || 'Could not create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 24, paddingTop: 40 }}>
      
      {/* Header */}
      <View className="items-center mb-8">
        <Text className="text-2xl font-bold text-slate-800">Create Account</Text>
        <Text className="text-slate-500">Join Sushruta as a <Text className="font-bold text-blue-600 capitalize">{role}</Text></Text>
      </View>

      {/* Form Fields */}
      <View className="space-y-4">
        
        {/* Name */}
        <InputWrapper icon={<User size={20} color={COLORS.textLight} />}>
          <TextInput
            placeholder="Full Name"
            value={formData.name}
            onChangeText={(t) => handleChange('name', t)}
            className="flex-1 text-slate-900 text-base"
          />
        </InputWrapper>

        {/* Phone */}
        <InputWrapper icon={<Phone size={20} color={COLORS.textLight} />}>
          <TextInput
            placeholder="Mobile Number"
            value={formData.phone}
            onChangeText={(t) => handleChange('phone', t)}
            keyboardType="phone-pad"
            className="flex-1 text-slate-900 text-base"
          />
        </InputWrapper>

        {/* Password */}
        <InputWrapper icon={<LockKey size={20} color={COLORS.textLight} />}>
          <TextInput
            placeholder="Create PIN (4 digits)"
            value={formData.password}
            onChangeText={(t) => handleChange('password', t)}
            keyboardType="numeric"
            secureTextEntry
            maxLength={4}
            className="flex-1 text-slate-900 text-base"
          />
        </InputWrapper>

        {/* Confirm Password */}
        <InputWrapper icon={<LockKey size={20} color={COLORS.textLight} />}>
          <TextInput
            placeholder="Confirm PIN"
            value={formData.confirmPassword}
            onChangeText={(t) => handleChange('confirmPassword', t)}
            keyboardType="numeric"
            secureTextEntry
            maxLength={4}
            className="flex-1 text-slate-900 text-base"
          />
        </InputWrapper>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading}
          className="bg-blue-600 py-4 rounded-xl flex-row justify-center items-center mt-4 shadow-lg shadow-blue-200"
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Text className="text-white font-bold text-lg mr-2">Sign Up</Text>
              <CaretRight size={20} color="white" weight="bold" />
            </>
          )}
        </TouchableOpacity>

      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Login' as any)} className="mt-6 items-center">
        <Text className="text-slate-500">
          Already have an account? <Text className="text-blue-600 font-bold">Log in</Text>
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

// Helper for Inputs
const InputWrapper = ({ icon, children }: any) => (
  <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4">
    <View className="mr-3">{icon}</View>
    {children}
  </View>
);

export default SignupScreen;