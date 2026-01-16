import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { COLORS } from '../../constants/theme';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'white';
}

const Loader = ({ size = "md", color = "white" }: LoaderProps) => {
  // Map size props to React Native sizes
  const sizeMap: Record<string, number | 'small' | 'large'> = {
    sm: 'small',
    md: 'small', // specific numeric size is not supported by default indicator, 'small' is approx 20px
    lg: 'large'
  };

  // Map color strings to Theme colors
  const colorHex = color === 'blue' ? COLORS.primary : COLORS.surface;

  return (
    <View className="items-center justify-center">
      <ActivityIndicator 
        size={sizeMap[size]} 
        color={colorHex} 
      />
    </View>
  );
};

export default Loader;