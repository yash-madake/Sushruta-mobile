import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Smiley, PersonSimpleTaiChi, BowlFood, Drop, MoonStars } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';

const WellnessScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-slate-50" style={{ paddingTop: insets.top }}>
      
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-100 flex-row justify-between items-center">
        <View>
          <Text className="text-2xl font-bold text-slate-800">Wellness Hub</Text>
          <Text className="text-slate-500">Mind, Body & Spirit</Text>
        </View>
        <View className="w-10 h-10 bg-emerald-100 rounded-full items-center justify-center">
          <PersonSimpleTaiChi size={24} color="#059669" weight="fill" />
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* 1. Emotional Wellness Card (Featured) */}
        <TouchableOpacity 
          // @ts-ignore
          onPress={() => navigation.navigate('EmotionalWellness')}
          className="bg-indigo-600 rounded-3xl p-6 mb-8 shadow-xl shadow-indigo-200 overflow-hidden relative"
        >
          <View className="relative z-10">
            <View className="bg-white/20 self-start px-3 py-1 rounded-full mb-3">
              <Text className="text-white text-xs font-bold uppercase">Mental Health</Text>
            </View>
            <Text className="text-2xl font-bold text-white mb-2">How are you feeling?</Text>
            <Text className="text-indigo-100 mb-6">Track your mood and practice mindfulness.</Text>
            
            <View className="bg-white px-5 py-3 rounded-xl self-start flex-row items-center">
              <Text className="text-indigo-700 font-bold mr-2">Check In Now</Text>
              <Smiley size={20} color={COLORS.primaryDark} weight="fill" />
            </View>
          </View>
          
          {/* Decorative Icon Background */}
          <View className="absolute -right-4 -bottom-4 opacity-20">
             <Smiley size={140} color="white" weight="fill" />
          </View>
        </TouchableOpacity>

        {/* 2. Wellness Grid */}
        <Text className="text-lg font-bold text-slate-800 mb-4 px-2">Daily Activities</Text>
        <View className="flex-row flex-wrap justify-between">
          
          {/* Yoga Card */}
          <ActivityCard 
            title="Yoga" 
            subtitle="15 mins" 
            icon={<PersonSimpleTaiChi size={32} color="#D97706" weight="fill" />} 
            color="amber"
          />

          {/* Diet Card */}
          <ActivityCard 
            title="Diet Plan" 
            subtitle="Low Sugar" 
            icon={<BowlFood size={32} color="#059669" weight="fill" />} 
            color="emerald"
          />

          {/* Water Card */}
          <ActivityCard 
            title="Hydration" 
            subtitle="4/8 Glasses" 
            icon={<Drop size={32} color="#2563EB" weight="fill" />} 
            color="blue"
          />

          {/* Sleep Card */}
          <ActivityCard 
            title="Sleep" 
            subtitle="7h 30m" 
            icon={<MoonStars size={32} color="#7C3AED" weight="fill" />} 
            color="purple"
          />
        </View>

        {/* 3. Daily Quote */}
        <View className="mt-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm items-center">
          <Text className="text-slate-400 text-3xl font-serif italic mb-2">"</Text>
          <Text className="text-center text-slate-700 font-medium text-lg italic">
            Healing is a matter of time, but it is sometimes also a matter of opportunity.
          </Text>
          <Text className="text-slate-400 text-xs font-bold uppercase mt-4">- Hippocrates</Text>
        </View>

      </ScrollView>
    </View>
  );
};

// Helper Component
const ActivityCard = ({ title, subtitle, icon, color }: any) => (
  <TouchableOpacity className={`w-[48%] bg-white p-4 rounded-2xl mb-4 border border-slate-100 shadow-sm items-center justify-center h-40`}>
    <View className={`w-16 h-16 bg-${color}-50 rounded-full items-center justify-center mb-3`}>
      {icon}
    </View>
    <Text className="font-bold text-slate-800 text-lg">{title}</Text>
    <Text className="text-slate-500 text-xs">{subtitle}</Text>
  </TouchableOpacity>
);

export default WellnessScreen;