import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ShieldCheck, Siren } from 'phosphor-react-native';

interface SosButtonProps {
  isCareTeam: boolean;
  sosStep: number;
  handleSOS: () => void;
  userName: string;
}

const SosButton = ({ isCareTeam, sosStep, handleSOS, userName }: SosButtonProps) => {
  // 1. Caretaker/Doctor View: Show Green Status Card
  if (isCareTeam) {
    return (
      <View className="p-6 rounded-2xl flex-row items-center justify-between shadow-sm border border-slate-200 bg-white mb-6">
        <View className="flex-row items-center flex-1 mr-4">
          <View className="bg-emerald-50 p-3 rounded-full mr-4">
            <ShieldCheck size={32} color="#059669" weight="fill" />
          </View>
          <View className="flex-1">
            <Text className="font-bold text-lg text-slate-800">Patient Safety Status</Text>
            <Text className="text-slate-500 text-xs flex-wrap">
              Monitoring <Text className="font-bold text-slate-700">{userName}</Text>. No alerts.
            </Text>
          </View>
        </View>
        <View className="bg-slate-100 px-3 py-1 rounded-lg">
           <Text className="text-slate-500 text-[10px] font-bold uppercase">Active</Text>
        </View>
      </View>
    );
  }

  // 2. Senior View: Red Panic Button
  return (
    <View className={`p-6 rounded-2xl shadow-lg mb-6 ${sosStep === 1 ? 'bg-red-700' : 'bg-red-600'}`}>
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center flex-1">
          <View className="bg-white p-3 rounded-full mr-4 shadow-md">
            <Siren size={32} color="#DC2626" weight="fill" />
          </View>
          <View className="flex-1">
            <Text className="font-bold text-lg text-white">
              {sosStep === 1 ? 'CONFIRM EMERGENCY?' : 'SOS EMERGENCY'}
            </Text>
            <Text className="text-white/80 text-xs">
              {sosStep === 1 ? 'Tap again to alert contacts' : 'Press for immediate help'}
            </Text>
          </View>
        </View>
      </View>
      
      <TouchableOpacity 
        onPress={handleSOS} 
        className={`w-full py-4 rounded-full items-center shadow-md ${sosStep === 1 ? 'bg-white' : 'bg-white'}`}
      >
        <Text className={`font-bold text-base tracking-widest ${sosStep === 1 ? 'text-red-700' : 'text-red-600'}`}>
          {sosStep === 1 ? 'YES, ALERT!' : 'ALERT'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SosButton;