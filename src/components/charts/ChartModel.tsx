import React, { useMemo } from 'react';
import { View, Text, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { X } from 'phosphor-react-native';
import { COLORS } from '../../constants/theme';

interface ChartModalProps {
  type: string;
  history: (number | string)[];
  currentVal: number | string;
  close: () => void;
  visible: boolean; // Added visible prop for standard React Native Modal control
}

const ChartModal = ({ type, history, currentVal, close, visible }: ChartModalProps) => {
  const screenWidth = Dimensions.get('window').width;

  // Prepare Data (Logic adapted from your Web version)
  const chartData = useMemo(() => {
    const labels = [];
    // Generate last 7 days labels
    for (let i = 6; i > 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      labels.push(d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })); // e.g. "12 Oct"
    }
    labels.push("Today");

    // Clean data
    const cleanHistory = history.map(h => Number(h) || 0);
    const finalVal = Number(currentVal) || 0;
    const dataPoints = [...cleanHistory, finalVal];

    // Ensure we don't have too many labels for mobile screen
    // We strictly take the last 7 points to match labels
    const displayData = dataPoints.slice(-7); 

    return {
      labels: labels, // You might want to slice labels too if they overflow
      datasets: [
        {
          data: displayData.length > 0 ? displayData : [0],
          color: (opacity = 1) => 
            type.includes('Heart') ? `rgba(239, 68, 68, ${opacity})` : 
            type.includes('Sleep') ? `rgba(139, 92, 246, ${opacity})` : 
            `rgba(15, 118, 110, ${opacity})`, // Matches your web colors
          strokeWidth: 3, 
        },
      ],
    };
  }, [type, history, currentVal]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={close}
    >
      <View className="flex-1 justify-center items-center bg-black/50 p-4">
        <View className="bg-white rounded-2xl w-full p-6 shadow-2xl">
          
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold text-slate-800">{type} History</Text>
            <TouchableOpacity onPress={close} className="p-2">
              <X size={24} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>

          {/* Chart */}
          <LineChart
            data={chartData}
            width={screenWidth - 64} // Width of card minus padding
            height={220}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0, 
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`, // slate-500
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "5",
                strokeWidth: "2",
                stroke: "#fff"
              }
            }}
            bezier // Makes the line curved like your web chart
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />

        </View>
      </View>
    </Modal>
  );
};

export default ChartModal;