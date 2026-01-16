import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Linking, Image } from 'react-native';
import { Bank, ShieldCheck, Wheelchair, MagnifyingGlass, ArrowUpRight, CheckCircle } from 'phosphor-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';

const SchemesScreen = () => {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  // Mock Schemes Data
  const schemes = [
    {
      id: 1,
      title: "Ayushman Bharat (PM-JAY)",
      category: "Health",
      desc: "Free health coverage up to ₹5 Lakhs per family per year.",
      link: "https://pmjay.gov.in/",
      color: "amber"
    },
    {
      id: 2,
      title: "Pradhan Mantri Vaya Vandana",
      category: "Pension",
      desc: "Guaranteed pension scheme for senior citizens (8% return).",
      link: "https://licindia.in/",
      color: "blue"
    },
    {
      id: 3,
      title: "Rashtriya Vayoshri Yojana",
      category: "Support",
      desc: "Free physical aids & assisted-living devices for seniors.",
      link: "https://socialjustice.gov.in/",
      color: "green"
    }
  ];

  const filteredSchemes = schemes.filter(s => s.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <View className="flex-1 bg-slate-50" style={{ paddingTop: insets.top }}>
      
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-100">
        <Text className="text-2xl font-bold text-slate-800">Govt. Schemes</Text>
        <Text className="text-slate-500">Benefits & subsidies for you</Text>
      </View>

      {/* Search Bar */}
      <View className="p-4">
        <View className="bg-white border border-slate-200 rounded-xl flex-row items-center px-4 py-3 shadow-sm">
          <MagnifyingGlass size={20} color={COLORS.textLight} />
          <TextInput 
            placeholder="Search schemes..."
            value={search}
            onChangeText={setSearch}
            className="flex-1 ml-3 text-slate-800 font-medium"
          />
        </View>
      </View>

      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 100 }}>
        {filteredSchemes.map((scheme) => (
          <TouchableOpacity 
            key={scheme.id}
            onPress={() => Linking.openURL(scheme.link)}
            className="bg-white p-5 rounded-2xl mb-4 shadow-sm border border-slate-100 active:scale-[0.98]"
          >
            {/* Category Badge */}
            <View className="flex-row justify-between items-start mb-2">
              <View className={`px-3 py-1 rounded-lg bg-${scheme.color}-50 border border-${scheme.color}-100`}>
                <Text className={`text-xs font-bold uppercase text-${scheme.color}-700`}>{scheme.category}</Text>
              </View>
              <ArrowUpRight size={18} color={COLORS.textLight} />
            </View>

            <Text className="text-lg font-bold text-slate-800 mb-2">{scheme.title}</Text>
            <Text className="text-slate-500 text-sm mb-4 leading-5">{scheme.desc}</Text>

            {/* Action Footer */}
            <View className="flex-row items-center space-x-4 pt-4 border-t border-slate-50">
              <View className="flex-row items-center">
                <CheckCircle size={16} color={COLORS.success} weight="fill" />
                <Text className="text-xs font-bold text-slate-600 ml-1">Eligibility Check</Text>
              </View>
              <View className="flex-row items-center">
                <ShieldCheck size={16} color={COLORS.primary} weight="fill" />
                <Text className="text-xs font-bold text-slate-600 ml-1">Official Portal</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {filteredSchemes.length === 0 && (
          <View className="items-center justify-center py-10">
            <Text className="text-slate-400">No schemes found matching "{search}"</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default SchemesScreen;