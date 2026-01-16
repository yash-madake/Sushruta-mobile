import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SneakerMove, Heartbeat, Drop, MoonStars, PlusCircle } from 'phosphor-react-native';
import { COLORS } from '../../../constants/theme';

interface VitalsCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle: string;
  icon: string;
  color: 'teal' | 'red' | 'blue' | 'purple';
  progress?: number;
  onClick: () => void;
  onAddClick: () => void;
  isDoctor: boolean;
}

const VitalsCard = ({ title, value, unit, subtitle, icon, color, progress, onClick, onAddClick, isDoctor }: VitalsCardProps) => {
  
  // Map Phosphor Icons based on string name
  const IconComponent = () => {
    const props = { size: 24, weight: "fill" as const };
    switch (icon) {
      case 'ph-sneaker-move': return <SneakerMove {...props} color={theme.textHex} />;
      case 'ph-heartbeat': return <Heartbeat {...props} color={theme.textHex} />;
      case 'ph-drop': return <Drop {...props} color={theme.textHex} />;
      case 'ph-moon-stars': return <MoonStars {...props} color={theme.textHex} />;
      default: return <Heartbeat {...props} color={theme.textHex} />;
    }
  };

  // Color mappings
  const colorMap = {
    teal:   { bg: 'bg-teal-50',   textHex: '#0D9488', bar: 'bg-teal-500' },
    red:    { bg: 'bg-red-50',    textHex: '#DC2626', bar: 'bg-red-500' },
    blue:   { bg: 'bg-blue-50',   textHex: '#2563EB', bar: 'bg-blue-500' },
    purple: { bg: 'bg-purple-50', textHex: '#9333EA', bar: 'bg-purple-500' },
  };

  const theme = colorMap[color] || colorMap.blue;

  return (
    <TouchableOpacity 
      onPress={onClick}
      className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-4"
    >
      {/* Quick Add Button (Hidden for Doctors) */}
      {!isDoctor && (
        <TouchableOpacity 
          onPress={(e) => { e.stopPropagation(); onAddClick(); }} 
          className="absolute top-4 right-4 z-10 p-1"
        >
          <PlusCircle size={24} color={COLORS.textLight} weight="bold" />
        </TouchableOpacity>
      )}
      
      {/* Icon Header */}
      <View className={`self-start p-3 rounded-xl mb-4 ${theme.bg}`}>
        <IconComponent />
      </View>
      
      {/* Main Value */}
      <View className="flex-row items-baseline">
        <Text className="text-3xl font-bold text-slate-800">{value}</Text>
        {unit && <Text className="text-sm text-slate-400 font-medium ml-1">{unit}</Text>}
      </View>
      <Text className="text-sm font-medium text-slate-500 mt-1">{subtitle}</Text>
      
      {/* Progress Bar (Optional) */}
      {progress !== undefined && (
        <View className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
          <View 
            className={`h-full rounded-full ${theme.bar}`} 
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default VitalsCard;