import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LockKeyOpen } from 'phosphor-react-native';

const OtpVerificationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // @ts-ignore
  const { phoneNumber } = route.params || { phoneNumber: '' };
  
  const [otp, setOtp] = useState('');

  const handleVerify = () => {
    // Mock Verification Logic
    if (otp.length === 4) {
      Alert.alert('Success', 'Registration Successful!', [
        { text: 'OK', onPress: () => navigation.navigate('Login' as any) }
      ]);
    } else {
      Alert.alert('Invalid OTP', 'Please enter a 4-digit code.');
    }
  };

  return (
    <View className="flex-1 bg-white items-center justify-center p-6">
      
      <View className="w-20 h-20 bg-blue-100 rounded-full items-center justify-center mb-6">
        <LockKeyOpen size={40} color="#1E3A8A" weight="fill" />
      </View>

      <Text className="text-2xl font-bold text-slate-800 mb-2">Verify Mobile</Text>
      <Text className="text-slate-500 mb-8 text-center">
        Enter the code sent to {phoneNumber ? `+91 ${phoneNumber}` : 'your mobile'}
      </Text>

      <TextInput
        autoFocus
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        maxLength={4}
        placeholder="0000"
        className="w-full p-4 text-center text-4xl font-bold tracking-[10px] border-2 border-blue-200 rounded-xl mb-8 text-blue-900"
      />

      <TouchableOpacity 
        onPress={handleVerify}
        className="w-full bg-blue-900 py-4 rounded-xl shadow-lg shadow-blue-200 items-center"
      >
        <Text className="text-white font-bold text-lg">Confirm Registration</Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default OtpVerificationScreen;