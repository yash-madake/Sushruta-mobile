import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native';
import { CheckCircle, Circle, Pill, Sun, Moon, CloudSun, Plus } from 'phosphor-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';

// Define the structure of a Medicine
interface Medicine {
  id: number;
  name: string;
  dosage: string;
  time: string; // e.g., "08:00 AM"
  period: 'Morning' | 'Afternoon' | 'Night';
  taken: boolean;
}

const MedicineScreen = () => {
  const insets = useSafeAreaInsets();
  
  // Mock Data (In a real app, this comes from your database)
  const [medicines, setMedicines] = useState<Medicine[]>([
    { id: 1, name: 'Metformin', dosage: '500mg', time: '08:00 AM', period: 'Morning', taken: true },
    { id: 2, name: 'Vitamin D', dosage: '1 Tab', time: '09:00 AM', period: 'Morning', taken: false },
    { id: 3, name: 'Amlodipine', dosage: '5mg', time: '02:00 PM', period: 'Afternoon', taken: false },
    { id: 4, name: 'Atorvastatin', dosage: '10mg', time: '09:00 PM', period: 'Night', taken: false },
  ]);

  // Toggle "Taken" Status
  const toggleMedicine = (id: number) => {
    setMedicines(prev => prev.map(med => 
      med.id === id ? { ...med, taken: !med.taken } : med
    ));
  };

  const handleAddMedicine = () => {
    Alert.alert("Add Medicine", "This feature would open a form to add a new prescription.");
  };

  // Helper to render a section (Morning/Afternoon/Night)
  const renderSection = (title: string, icon: React.ReactNode, period: string) => {
    const periodMeds = medicines.filter(m => m.period === period);
    
    if (periodMeds.length === 0) return null;

    return (
      <View className="mb-6">
        <View className="flex-row items-center mb-3 px-2">
          {icon}
          <Text className="text-lg font-bold text-slate-700 ml-2">{title}</Text>
        </View>
        
        {periodMeds.map((med) => (
          <TouchableOpacity 
            key={med.id}
            onPress={() => toggleMedicine(med.id)}
            className={`flex-row items-center justify-between p-4 mb-3 rounded-2xl border ${
              med.taken 
                ? 'bg-emerald-50 border-emerald-100' 
                : 'bg-white border-slate-100 shadow-sm'
            }`}
          >
            <View className="flex-row items-center">
              <View className={`w-12 h-12 rounded-xl items-center justify-center mr-4 ${
                med.taken ? 'bg-emerald-200' : 'bg-blue-100'
              }`}>
                <Pill size={24} color={med.taken ? '#065F46' : COLORS.primary} weight="fill" />
              </View>
              <View>
                <Text className={`text-lg font-bold ${med.taken ? 'text-emerald-900 line-through opacity-60' : 'text-slate-800'}`}>
                  {med.name}
                </Text>
                <Text className="text-slate-500 text-sm">
                  {med.dosage} • {med.time}
                </Text>
              </View>
            </View>

            {/* Checkbox Icon */}
            {med.taken ? (
              <CheckCircle size={32} color={COLORS.success} weight="fill" />
            ) : (
              <Circle size={32} color={COLORS.textLight} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View className="flex-1 bg-slate-50" style={{ paddingTop: insets.top }}>
      
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-100 flex-row justify-between items-center shadow-sm z-10">
        <View>
          <Text className="text-2xl font-bold text-slate-800">Medicines</Text>
          <Text className="text-slate-500">Track your daily dose</Text>
        </View>
        <TouchableOpacity 
          onPress={handleAddMedicine}
          className="bg-blue-900 w-10 h-10 rounded-full items-center justify-center shadow-lg shadow-blue-200"
        >
          <Plus size={20} color="white" weight="bold" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-4 pt-6" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Progress Card */}
        <View className="bg-blue-600 rounded-3xl p-6 mb-8 shadow-xl shadow-blue-200">
          <Text className="text-blue-100 font-bold uppercase text-xs mb-1">Daily Progress</Text>
          <View className="flex-row items-end justify-between">
            <Text className="text-white text-3xl font-bold">
              {medicines.filter(m => m.taken).length} <Text className="text-lg text-blue-200 font-medium">/ {medicines.length} taken</Text>
            </Text>
            <View className="bg-white/20 px-3 py-1 rounded-lg">
              <Text className="text-white font-bold text-xs">KEEP IT UP</Text>
            </View>
          </View>
          {/* Simple Progress Bar */}
          <View className="h-2 bg-blue-900/30 rounded-full mt-4 overflow-hidden">
            <View 
              className="h-full bg-white rounded-full" 
              style={{ width: `${(medicines.filter(m => m.taken).length / medicines.length) * 100}%` }} 
            />
          </View>
        </View>

        {renderSection("Morning", <Sun size={24} color="#F59E0B" weight="fill" />, "Morning")}
        {renderSection("Afternoon", <CloudSun size={24} color="#3B82F6" weight="fill" />, "Afternoon")}
        {renderSection("Night", <Moon size={24} color="#8B5CF6" weight="fill" />, "Night")}

        {medicines.length === 0 && (
          <View className="items-center justify-center py-10 opacity-50">
            <Pill size={64} color={COLORS.textLight} />
            <Text className="text-slate-400 mt-4 text-center">No medicines added yet.</Text>
          </View>
        )}

      </ScrollView>
    </View>
  );
};

export default MedicineScreen;