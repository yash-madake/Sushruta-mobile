import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, TextInput, Alert, Modal, Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { CloudArrowUp, FilePdf, Image as ImageIcon, Eye, Trash, MagnifyingGlass, X } from 'phosphor-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';

const ReportsScreen = () => {
  const insets = useSafeAreaInsets();
  const [reports, setReports] = useState([
    { id: '1', name: 'Blood Test Report', doctor: 'Dr. Verma', date: '24 Oct 2025', type: 'pdf' },
    { id: '2', name: 'X-Ray Knee', doctor: 'Dr. Gupta', date: '12 Sep 2025', type: 'image' },
  ]);
  const [uploading, setUploading] = useState(false);
  const [previewItem, setPreviewItem] = useState<any>(null);

  // Stats
  const stats = [
    { label: 'AVG STEPS', value: '4,250', color: 'blue' },
    { label: 'AVG HEART', value: '72 bpm', color: 'red' },
    { label: 'SLEEP', value: '7.5 hrs', color: 'purple' },
    { label: 'ADHERENCE', value: '85%', color: 'emerald' },
  ];

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        copyToCacheDirectory: true
      });

      if (result.canceled) return;

      setUploading(true);
      // Simulate Upload
      setTimeout(() => {
        const newDoc = {
          id: Date.now().toString(),
          name: result.assets[0].name,
          doctor: 'Self Upload',
          date: new Date().toLocaleDateString(),
          type: result.assets[0].mimeType?.includes('pdf') ? 'pdf' : 'image'
        };
        setReports([newDoc, ...reports]);
        setUploading(false);
        Alert.alert("Success", "File Added Successfully!");
      }, 1500);

    } catch (err) {
      Alert.alert("Error", "Failed to pick file");
    }
  };

  return (
    <View className="flex-1 bg-slate-50" style={{ paddingTop: insets.top }}>
      
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-100">
        <Text className="text-2xl font-bold text-slate-800">Medical Archives</Text>
        <Text className="text-slate-500">Manage your health records</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Analytics Grid */}
        <View className="flex-row flex-wrap justify-between mb-6">
          {stats.map((stat, i) => (
            <View key={i} className={`w-[48%] bg-white p-4 rounded-2xl border mb-3 shadow-sm border-${stat.color}-100`}>
              <Text className={`text-xs font-bold text-${stat.color}-500 mb-1`}>{stat.label}</Text>
              <Text className="text-xl font-extrabold text-slate-800">{stat.value}</Text>
              <View className={`w-full h-1.5 bg-${stat.color}-100 rounded-full mt-2`}>
                <View className={`h-full bg-${stat.color}-500 rounded-full`} style={{ width: '70%' }} />
              </View>
            </View>
          ))}
        </View>

        {/* Upload Button */}
        <TouchableOpacity 
          onPress={handleUpload}
          className="bg-white border border-dashed border-blue-300 rounded-2xl p-6 items-center justify-center mb-8"
        >
          <View className="w-12 h-12 bg-blue-50 rounded-full items-center justify-center mb-2">
            <CloudArrowUp size={24} color={COLORS.primary} weight="fill" />
          </View>
          <Text className="font-bold text-slate-700">
            {uploading ? 'Uploading...' : 'Upload New Record'}
          </Text>
          <Text className="text-xs text-slate-400 mt-1">Supports PDF & JPG</Text>
        </TouchableOpacity>

        {/* Reports List */}
        <View className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <View className="p-4 bg-slate-50 border-b border-slate-200 flex-row items-center">
            <MagnifyingGlass size={16} color={COLORS.textLight} />
            <Text className="font-bold text-slate-500 ml-2 text-xs uppercase">Recent Documents</Text>
          </View>

          {reports.map((item) => (
            <TouchableOpacity 
              key={item.id}
              onPress={() => setPreviewItem(item)}
              className="p-4 border-b border-slate-50 flex-row items-center justify-between active:bg-slate-50"
            >
              <View className="flex-row items-center flex-1">
                <View className={`w-10 h-10 rounded-xl items-center justify-center mr-3 ${
                  item.type === 'pdf' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  {item.type === 'pdf' ? (
                    <FilePdf size={20} color="#DC2626" weight="fill" />
                  ) : (
                    <ImageIcon size={20} color="#2563EB" weight="fill" />
                  )}
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-slate-800 text-sm" numberOfLines={1}>{item.name}</Text>
                  <Text className="text-xs text-slate-400">Dr. {item.doctor} • {item.date}</Text>
                </View>
              </View>
              
              <View className="flex-row items-center space-x-2 ml-2">
                <Eye size={20} color={COLORS.primary} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Simple Preview Modal */}
      <Modal visible={!!previewItem} transparent={true} animationType="fade">
        <View className="flex-1 bg-black/90 justify-center items-center p-4">
          <TouchableOpacity 
            onPress={() => setPreviewItem(null)}
            className="absolute top-12 right-4 z-10 p-2 bg-white/20 rounded-full"
          >
            <X size={24} color="white" />
          </TouchableOpacity>
          
          <View className="bg-white p-6 rounded-2xl w-full items-center">
            <Text className="text-lg font-bold mb-4">{previewItem?.name}</Text>
             {previewItem?.type === 'image' ? (
               <View className="w-full h-64 bg-slate-200 items-center justify-center rounded-xl">
                 <Text className="text-slate-500">Image Preview Placeholder</Text>
               </View>
             ) : (
               <View className="w-full h-64 bg-red-50 items-center justify-center rounded-xl border border-red-100">
                 <FilePdf size={48} color="#DC2626" />
                 <Text className="text-red-800 font-bold mt-2">PDF Document</Text>
               </View>
             )}
          </View>
        </View>
      </Modal>

    </View>
  );
};

export default ReportsScreen;