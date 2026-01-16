import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal as RNModal, TouchableWithoutFeedback } from 'react-native';
import { X, SneakerMove, Heartbeat, Drop, MoonStars } from 'phosphor-react-native';
import { COLORS } from '../../constants/theme';

interface ManualEntryModalProps {
  metric: string;
  onClose: () => void;
  onSave: (data: any) => void;
  visible: boolean; // Added visible prop for standard control
}

const ManualEntryModal = ({ metric, onClose, onSave, visible }: ManualEntryModalProps) => {
  // State
  const [val, setVal] = useState('');
  const [sys, setSys] = useState('');
  const [dia, setDia] = useState('');
  const [hrs, setHrs] = useState('');
  const [mins, setMins] = useState('');

  // Determine type
  const isBP = metric.includes('Blood Pressure') || metric === 'BP';
  const isSleep = metric.includes('Sleep');
  const isSteps = metric.includes('Steps');
  const isHeart = metric.includes('Heart');

  // Handle Save Logic
  const handleSave = () => {
    if (isBP) {
      if (sys && dia) onSave(`${sys}/${dia}`);
    } else if (isSleep) {
      if (hrs && mins) {
        onSave({ 
          display: `${hrs}h ${mins}m`, 
          value: parseFloat(hrs) + parseFloat(mins) / 60 
        });
      }
    } else {
      onSave(val);
    }
    // Clear inputs after save
    setVal(''); setSys(''); setDia(''); setHrs(''); setMins('');
  };

  // Helper to render the correct icon
  const renderIcon = () => {
    const props = { size: 32, weight: "fill" as const, color: COLORS.primary };
    if (isSteps) return <SneakerMove {...props} />;
    if (isHeart) return <Heartbeat {...props} />;
    if (isBP) return <Drop {...props} />;
    return <MoonStars {...props} />;
  };

  return (
    <RNModal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/60 justify-center items-center p-4">
          <TouchableWithoutFeedback>
            <View className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl">
              
              {/* Close Button */}
              <TouchableOpacity onPress={onClose} className="absolute top-4 right-4 z-10 p-2">
                <X size={20} color={COLORS.textLight} weight="bold" />
              </TouchableOpacity>

              {/* Header */}
              <View className="items-center mb-6">
                <View className="w-16 h-16 bg-blue-50 rounded-full items-center justify-center mb-3">
                  {renderIcon()}
                </View>
                <Text className="text-xl font-bold text-slate-800">Update {metric}</Text>
                <Text className="text-slate-400 text-sm">Enter your latest reading</Text>
              </View>

              {/* Inputs */}
              <View className="mb-6">
                {isBP ? (
                  // Blood Pressure (Row)
                  <View className="flex-row items-center justify-center space-x-2">
                    <View>
                      <TextInput
                        value={sys}
                        onChangeText={setSys}
                        placeholder="120"
                        keyboardType="numeric"
                        className="w-20 p-4 text-center text-xl font-bold bg-slate-50 rounded-xl text-slate-800"
                      />
                      <Text className="text-center text-xs text-slate-400 mt-1">SYS</Text>
                    </View>
                    <Text className="text-2xl text-slate-300">/</Text>
                    <View>
                      <TextInput
                        value={dia}
                        onChangeText={setDia}
                        placeholder="80"
                        keyboardType="numeric"
                        className="w-20 p-4 text-center text-xl font-bold bg-slate-50 rounded-xl text-slate-800"
                      />
                      <Text className="text-center text-xs text-slate-400 mt-1">DIA</Text>
                    </View>
                  </View>
                ) : isSleep ? (
                  // Sleep (Row)
                  <View className="flex-row items-center justify-center space-x-3">
                    <View className="relative">
                      <TextInput
                        value={hrs}
                        onChangeText={setHrs}
                        placeholder="7"
                        keyboardType="numeric"
                        className="w-20 p-4 text-center text-xl font-bold bg-slate-50 rounded-xl text-slate-800"
                      />
                      <Text className="absolute top-2 right-2 text-xs text-slate-400 font-bold">hr</Text>
                    </View>
                    <View className="relative">
                      <TextInput
                        value={mins}
                        onChangeText={setMins}
                        placeholder="30"
                        keyboardType="numeric"
                        className="w-20 p-4 text-center text-xl font-bold bg-slate-50 rounded-xl text-slate-800"
                      />
                      <Text className="absolute top-2 right-2 text-xs text-slate-400 font-bold">min</Text>
                    </View>
                  </View>
                ) : (
                  // Standard Input (Steps/Heart)
                  <View className="relative">
                    <TextInput
                      value={val}
                      onChangeText={setVal}
                      placeholder="0"
                      keyboardType="numeric"
                      autoFocus={true}
                      className="w-full p-4 text-center text-2xl font-bold bg-slate-50 rounded-xl text-slate-800"
                    />
                    <Text className="absolute top-5 right-4 text-sm font-bold text-slate-400 uppercase">
                      {isSteps ? 'steps' : 'bpm'}
                    </Text>
                  </View>
                )}
              </View>

              {/* Save Button */}
              <TouchableOpacity 
                onPress={handleSave}
                className="w-full py-4 bg-blue-900 rounded-xl items-center shadow-lg shadow-blue-200"
              >
                <Text className="text-white font-bold text-lg">Update Data</Text>
              </TouchableOpacity>

            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

export default ManualEntryModal;