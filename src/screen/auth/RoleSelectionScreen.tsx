import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, User, Heart, Stethoscope } from 'phosphor-react-native';
import { AuthStackParamList } from '../../types/navigation';
import { COLORS } from '../../constants/theme';

type RoleScreenNavProp = NativeStackNavigationProp<AuthStackParamList, 'RoleSelection'>;

const RoleSelectionScreen = () => {
  const navigation = useNavigation<RoleScreenNavProp>();

  const handleSelectRole = (role: string) => {
    // Navigate to Signup and pass the role
    // @ts-ignore - Ignoring strict typing for now to get you started faster
    navigation.navigate('Signup', { role }); 
  };

  return (
    <View className="flex-1 bg-white p-6 pt-12">
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        className="mb-6 flex-row items-center"
      >
        <ArrowLeft size={20} color={COLORS.textLight} weight="bold" />
        <Text className="text-slate-400 font-bold ml-2">Back</Text>
      </TouchableOpacity>
      
      <Text className="text-3xl font-bold text-blue-900 mb-8">Choose your Profile</Text>
      
      <View className="space-y-4">
        {/* Senior Button */}
        <RoleCard 
          title="Senior Citizen"
          subtitle="I want to manage my health & connect."
          icon={<User size={32} color={COLORS.primary} weight="fill" />}
          color="blue"
          onPress={() => handleSelectRole('senior')}
        />

        {/* Caretaker Button */}
        <RoleCard 
          title="Caretaker"
          subtitle="I am looking after a senior member."
          icon={<Heart size={32} color="#DC2626" weight="fill" />} // Red-600
          color="green"
          onPress={() => handleSelectRole('caretaker')}
        />

        {/* Doctor Button */}
        <RoleCard 
          title="Doctor"
          subtitle="I am a medical professional."
          icon={<Stethoscope size={32} color="#7C3AED" weight="fill" />} // Purple-600
          color="purple"
          onPress={() => handleSelectRole('doctor')}
        />
      </View>
    </View>
  );
};

// Helper Component for the Cards
const RoleCard = ({ title, subtitle, icon, color, onPress }: any) => {
  // Simple mapping for background colors
  const bgClass = color === 'green' ? 'bg-green-50 border-green-200' : 
                  color === 'purple' ? 'bg-purple-50 border-purple-200' : 
                  'bg-blue-50 border-blue-200';
                  
  const iconBg = color === 'green' ? 'bg-green-100' : 
                 color === 'purple' ? 'bg-purple-100' : 
                 'bg-blue-100';

  return (
    <TouchableOpacity 
      onPress={onPress}
      className={`flex-row items-center p-4 border rounded-2xl mb-4 ${bgClass}`}
    >
      <View className={`w-16 h-16 rounded-full items-center justify-center mr-4 ${iconBg}`}>
        {icon}
      </View>
      <View className="flex-1">
        <Text className="font-bold text-lg text-slate-800">{title}</Text>
        <Text className="text-sm text-slate-500 flex-wrap">{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RoleSelectionScreen;