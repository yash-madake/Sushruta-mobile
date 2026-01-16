import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { FileLock, UploadSimple, ShieldCheck, ArrowUpRight, Files } from 'phosphor-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';

const InsuranceScreen = () => {
  const insets = useSafeAreaInsets();

  const openLink = (url: string) => Linking.openURL(url);

  return (
    <View className="flex-1 bg-slate-50" style={{ paddingTop: insets.top }}>
      
      {/* Header */}
      <View className="px-6 py-4 flex-row items-center space-x-3 bg-white">
        <View className="w-12 h-12 bg-indigo-100 rounded-xl items-center justify-center">
          <FileLock size={24} color="#4F46E5" weight="fill" />
        </View>
        <View>
          <Text className="text-xl font-bold text-slate-800">Insurance Vault</Text>
          <Text className="text-slate-500 text-xs">Secure policies & benefits</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Upload Section */}
        <View className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <View className="flex-row items-center space-x-2">
              <Files size={20} color="#6366F1" weight="fill" />
              <Text className="font-bold text-slate-700">My Policies</Text>
            </View>
            <TouchableOpacity className="bg-indigo-600 px-3 py-2 rounded-lg flex-row items-center">
              <UploadSimple size={16} color="white" weight="bold" />
              <Text className="text-white text-xs font-bold ml-1">Upload</Text>
            </TouchableOpacity>
          </View>

          {/* Empty State */}
          <View className="border-2 border-dashed border-slate-200 rounded-2xl p-6 items-center bg-slate-50">
            <FileLock size={32} color={COLORS.textLight} />
            <Text className="text-slate-400 text-xs text-center mt-2">
              No policies uploaded yet.{'\n'}Keep your documents safe here.
            </Text>
          </View>
        </View>

        {/* PMJAY Card */}
        <TouchableOpacity 
          onPress={() => openLink('https://pmjay.gov.in/')}
          className="bg-amber-100 p-1 rounded-3xl mb-6 shadow-md"
        >
          <View className="bg-white/60 p-5 rounded-[20px] backdrop-blur-sm">
            <View className="bg-amber-200 self-start px-2 py-1 rounded-md mb-2">
              <Text className="text-[10px] font-bold text-amber-900 uppercase">Govt. Scheme</Text>
            </View>
            <Text className="text-2xl font-extrabold text-slate-800 mb-1">Ayushman Bharat</Text>
            <Text className="text-slate-600 text-sm mb-4 font-medium">
              Free treatment up to <Text className="font-bold text-amber-700">₹5 Lakhs</Text>
            </Text>
            
            <View className="flex-row items-center justify-between">
              <View className="bg-slate-900 px-4 py-2 rounded-xl flex-row items-center">
                <Text className="text-white font-bold text-xs mr-1">Check Eligibility</Text>
                <ArrowUpRight size={14} color="white" weight="bold" />
              </View>
              <View className="w-12 h-12 bg-amber-400 rounded-full items-center justify-center border-4 border-white shadow-sm">
                 <Text className="text-[10px] font-bold text-amber-900">₹5L</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Providers */}
        <Text className="font-bold text-slate-700 text-lg mb-4 ml-1">Trusted Partners</Text>
        <View className="flex-row flex-wrap justify-between">
          <ProviderCard name="Star Health" color="blue" url="https://www.starhealth.in/" />
          <ProviderCard name="HDFC Ergo" color="red" url="https://www.hdfcergo.com/" />
          <ProviderCard name="Niva Bupa" color="green" url="https://www.nivabupa.com/" />
          <ProviderCard name="ICICI Lombard" color="purple" url="https://www.icicilombard.com/" />
        </View>

      </ScrollView>
    </View>
  );
};

const ProviderCard = ({ name, color, url }: any) => (
  <TouchableOpacity 
    onPress={() => Linking.openURL(url)}
    className={`w-[48%] bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-3 h-32 justify-between active:scale-95`}
  >
    <View className={`w-10 h-10 rounded-xl bg-${color}-50 items-center justify-center`}>
      <ShieldCheck size={20} color={COLORS.textSecondary} weight="fill" />
    </View>
    <View>
      <Text className="font-bold text-slate-800">{name}</Text>
      <View className="flex-row items-center mt-1">
        <Text className="text-[10px] text-slate-400">Official Portal</Text>
        <ArrowUpRight size={10} color="#94A3B8" weight="bold" style={{marginLeft: 2}} />
      </View>
    </View>
  </TouchableOpacity>
);

export default InsuranceScreen;