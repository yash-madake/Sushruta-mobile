import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Text as SvgText } from 'react-native-svg';
import { COLORS } from '../../constants/theme';

interface HealthScoreRingProps {
  score: number;
  size?: number;
}

const HealthScoreRing = ({ score, size = 160 }: HealthScoreRingProps) => {
  // Determine color based on score thresholds (Logic copied from web)
  const strokeColor = score < 50 ? COLORS.danger : score < 80 ? COLORS.warning : COLORS.success;

  // SVG Configuration
  const strokeWidth = 2.5;
  const radius = 15.9155; 
  const center = 18; 
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <View className="items-center justify-center" style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 36 36">
        {/* Background Circle (Grey Ring) */}
        <Path
          stroke={COLORS.border}
          strokeWidth={strokeWidth}
          fill="none"
          d={`M${center} 2.0845 a ${radius} ${radius} 0 0 1 0 ${radius * 2} a ${radius} ${radius} 0 0 1 0 -${radius * 2}`}
        />

        {/* Progress Circle (Colored Ring) */}
        <Path
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          d={`M${center} 2.0845 a ${radius} ${radius} 0 0 1 0 ${radius * 2} a ${radius} ${radius} 0 0 1 0 -${radius * 2}`}
          // Note: Standard SVG rotation is needed because circles start at 3 o'clock usually, 
          // but your path data seems to start from top. If rotation is needed: transform="rotate(-90 18 18)"
        />

        {/* Center Text: Score */}
        <SvgText
          x="18"
          y="19"
          fill={COLORS.primaryDark}
          fontSize="8"
          fontWeight="bold"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {score}
        </SvgText>

        {/* Center Text: Label */}
        <SvgText
          x="18"
          y="25"
          fill={COLORS.textLight}
          fontSize="3"
          fontWeight="medium"
          textAnchor="middle"
        >
          / 100
        </SvgText>
      </Svg>
    </View>
  );
};

export default HealthScoreRing;