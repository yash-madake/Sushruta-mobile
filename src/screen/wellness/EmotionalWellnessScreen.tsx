import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Animated } from 'react-native';
import { Smiley, SmileySad, SmileyMeh, SmileyBlank, Heart, Wind, ArrowLeft } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';

const EmotionalWellnessScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    Alert.alert("Mood Recorded", `You are feeling ${mood} today. We have logged this in your health report.`);
  };

  return (
    <View className="flex-1 bg-indigo-50" style={{ paddingTop: insets.top }}>
      
      {/* Custom Header */}
      <View className="px-6 py-4 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()} className="bg-white/50 p-2 rounded-full mr-4">
          <ArrowLeft size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-indigo-900">Emotional Wellness</Text>
      </View>

      <ScrollView className="flex-1 px-6">
        
        {/* 1. Mood Tracker */}
        <View className="bg-white p-6 rounded-3xl shadow-sm mb-8 mt-4">
          <Text className="text-center text-lg font-bold text-slate-800 mb-6">How are you feeling today?</Text>
          
          <View className="flex-row justify-between px-2">
            <MoodButton 
              label="Happy" 
              icon={<Smiley size={40} color="#059669" weight={selectedMood === 'Happy' ? 'fill' : 'regular'} />} 
              selected={selectedMood === 'Happy'}
              onPress={() => handleMoodSelect('Happy')}
            />
            <MoodButton 
              label="Neutral" 
              icon={<SmileyMeh size={40} color="#D97706" weight={selectedMood === 'Neutral' ? 'fill' : 'regular'} />} 
              selected={selectedMood === 'Neutral'}
              onPress={() => handleMoodSelect('Neutral')}
            />
            <MoodButton 
              label="Sad" 
              icon={<SmileySad size={40} color="#DC2626" weight={selectedMood === 'Sad' ? 'fill' : 'regular'} />} 
              selected={selectedMood === 'Sad'}
              onPress={() => handleMoodSelect('Sad')}
            />
            <MoodButton 
              label="Tired" 
              icon={<SmileyBlank size={40} color="#64748B" weight={selectedMood === 'Tired' ? 'fill' : 'regular'} />} 
              selected={selectedMood === 'Tired'}
              onPress={() => handleMoodSelect('Tired')}
            />
          </View>
        </View>

        {/* 2. Breathing Exercise */}
        <View className="bg-indigo-600 p-8 rounded-3xl shadow-xl mb-8 relative overflow-hidden">
          <View className="relative z-10">
            <View className="flex-row items-center mb-4">
              <Wind size={24} color="white" />
              <Text className="text-white font-bold text-xl ml-2">Breathing Exercise</Text>
            </View>
            <Text className="text-indigo-100 mb-8 leading-6">
              Feeling anxious? Take a moment to breathe. Follow the circle below.
            </Text>
            
            <View className="items-center justify-center">
              <View className="w-32 h-32 bg-white/20 rounded-full items-center justify-center animate-pulse">
                <View className="w-24 h-24 bg-white rounded-full items-center justify-center shadow-lg">
                  <Text className="text-indigo-600 font-bold text-lg">Inhale</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Background decoration */}
          <View className="absolute -right-10 -bottom-10 opacity-10">
            <Wind size={200} color="white" weight="fill" />
          </View>
        </View>

        {/* 3. Gratitude Journal */}
        <View className="bg-white p-6 rounded-3xl shadow-sm mb-20">
          <View className="flex-row items-center mb-4">
            <Heart size={24} color="#DB2777" weight="fill" />
            <Text className="text-lg font-bold text-slate-800 ml-2">Gratitude Journal</Text>
          </View>
          <Text className="text-slate-500 mb-4">Write one thing you are grateful for today.</Text>
          <View className="h-24 bg-pink-50 rounded-xl border border-pink-100 p-4">
            <Text className="text-pink-300 italic">Tap to type...</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

const MoodButton = ({ label, icon, selected, onPress }: any) => (
  <TouchableOpacity onPress={onPress} className="items-center">
    <View className={`w-16 h-16 rounded-2xl items-center justify-center mb-2 transition-all ${selected ? 'bg-slate-100 scale-110 border-2 border-slate-200' : ''}`}>
      {icon}
    </View>
    <Text className={`text-xs font-bold ${selected ? 'text-slate-800' : 'text-slate-400'}`}>{label}</Text>
  </TouchableOpacity>
);

export default EmotionalWellnessScreen;