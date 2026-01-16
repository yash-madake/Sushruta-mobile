import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, Alert, Switch } from 'react-native';
import * as Speech from 'expo-speech';
import * as ImagePicker from 'expo-image-picker';
import { UserCircle, Camera, IdentificationCard, BellRinging, Ambulance, Heartbeat, UserPlus } from 'phosphor-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const [editMode, setEditMode] = useState(false);
  const [connectId, setConnectId] = useState('');

  // Mock User Data
  const [formData, setFormData] = useState({
    name: "Rajesh Kumar",
    age: 68,
    phone: "9876543210",
    dob: "1955-08-15",
    language: "Hindi",
    address: "Flat 402, Krishna Heights, Pune",
    photo: null as string | null,
    hospitalPref: "Apollo Hospital",
    allergies: "Peanuts, Penicillin",
    chronicConditions: "Hypertension, Type 2 Diabetes",
    surgeries: "Cataract (2018)",
    treatments: "Metformin 500mg",
    sushrutaId: "SNR-8921"
  });

  // Voice Feedback
  const speak = (text: string) => {
    Speech.speak(text, { language: 'en-IN' });
  };

  const toggleEdit = () => {
    if (editMode) {
      speak("Saving changes to your secure profile.");
      Alert.alert("Profile Updated!");
    } else {
      speak("Edit mode active");
    }
    setEditMode(!editMode);
  };

  const pickImage = async () => {
    if (!editMode) return;
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setFormData({ ...formData, photo: result.assets[0].uri });
    }
  };

  return (
    <View className="flex-1 bg-slate-50" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-100 flex-row justify-between items-center">
        <View className="flex-row items-center space-x-3">
          <View className="w-10 h-10 bg-teal-100 rounded-xl items-center justify-center">
            <UserCircle size={24} color={COLORS.secondaryDark} weight="fill" />
          </View>
          <Text className="text-xl font-bold text-slate-800">My Profile</Text>
        </View>
        <TouchableOpacity 
          onPress={toggleEdit}
          className={`px-4 py-2 rounded-lg ${editMode ? 'bg-blue-600' : 'bg-slate-200'}`}
        >
          <Text className={`font-bold ${editMode ? 'text-white' : 'text-slate-600'}`}>
            {editMode ? 'Save' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* 1. Basic Details */}
        <View className="bg-white p-6 rounded-2xl border-l-4 border-l-teal-500 shadow-sm mb-6">
          <View className="flex-row items-center mb-6 pb-4 border-b border-slate-100">
            <IdentificationCard size={24} color={COLORS.secondaryDark} weight="fill" />
            <Text className="text-lg font-bold text-teal-800 ml-2">Basic Details</Text>
          </View>

          <View className="items-center mb-6">
            <TouchableOpacity onPress={pickImage} className="relative mb-4">
              <Image 
                source={{ uri: formData.photo || `https://ui-avatars.com/api/?name=${formData.name}&background=0D8ABC&color=fff` }} 
                className="w-32 h-32 rounded-full border-4 border-teal-50"
              />
              {editMode && (
                <View className="absolute inset-0 bg-black/40 rounded-full items-center justify-center">
                  <Camera size={24} color="white" />
                </View>
              )}
            </TouchableOpacity>
            
            <View className="bg-slate-100 px-3 py-1 rounded-lg border border-slate-200 mb-2">
              <Text className="text-xs font-bold text-slate-500">ID: <Text className="text-teal-700">{formData.sushrutaId}</Text></Text>
            </View>
            <Text className="text-2xl font-bold text-slate-800">{formData.name}</Text>
          </View>

          <View className="space-y-4">
            <InputLabel label="Phone" value={formData.phone} onChange={t => setFormData({...formData, phone: t})} editable={editMode} />
            <InputLabel label="Date of Birth" value={formData.dob} onChange={t => setFormData({...formData, dob: t})} editable={editMode} />
            <InputLabel label="Language" value={formData.language} onChange={t => setFormData({...formData, language: t})} editable={editMode} />
            <InputLabel label="Address" value={formData.address} onChange={t => setFormData({...formData, address: t})} editable={editMode} multiline />
          </View>
        </View>

        {/* 2. Emergency Details */}
        <View className="bg-white p-6 rounded-2xl border-l-4 border-l-red-500 shadow-sm mb-6">
          <View className="flex-row items-center mb-6 pb-4 border-b border-slate-100">
            <Ambulance size={24} color="#B91C1C" weight="fill" />
            <Text className="text-lg font-bold text-red-800 ml-2">Emergency Details</Text>
          </View>

          <View className="bg-red-50 p-4 rounded-xl border border-red-100 mb-4">
            <Text className="text-xs font-bold text-red-700 uppercase mb-2">Primary Contact</Text>
            <TextInput 
              value="Son (Rahul)" 
              editable={editMode}
              className="bg-white border border-red-200 rounded-lg p-3 text-slate-800 font-medium mb-2"
            />
            <TextInput 
              value="+91 9890098900" 
              editable={editMode}
              className="bg-white border border-red-200 rounded-lg p-3 text-slate-800 font-medium"
            />
          </View>

          <InputLabel label="Hospital Preference" value={formData.hospitalPref} onChange={t => setFormData({...formData, hospitalPref: t})} editable={editMode} />
          <View className="mt-4">
            <Text className="text-xs font-bold text-slate-500 uppercase mb-1">Allergies</Text>
            <TextInput 
              value={formData.allergies}
              editable={editMode}
              className="bg-red-50 border border-red-100 text-red-700 font-bold p-3 rounded-xl"
            />
          </View>
        </View>

        {/* 3. Medical History */}
        <View className="bg-white p-6 rounded-2xl border-l-4 border-l-blue-500 shadow-sm mb-6">
          <View className="flex-row items-center mb-6 pb-4 border-b border-slate-100">
            <Heartbeat size={24} color="#1D4ED8" weight="fill" />
            <Text className="text-lg font-bold text-blue-800 ml-2">Medical History</Text>
          </View>

          <View className="space-y-4">
            <InputLabel label="Chronic Conditions" value={formData.chronicConditions} onChange={t => setFormData({...formData, chronicConditions: t})} editable={editMode} multiline />
            <InputLabel label="Recent Surgeries" value={formData.surgeries} onChange={t => setFormData({...formData, surgeries: t})} editable={editMode} />
            <InputLabel label="Ongoing Treatments" value={formData.treatments} onChange={t => setFormData({...formData, treatments: t})} editable={editMode} />
          </View>
        </View>

        {/* Connection Tool */}
        <View className="bg-slate-900 p-6 rounded-2xl shadow-xl mb-6">
          <View className="flex-row items-center mb-2">
            <UserPlus size={20} color="#60A5FA" weight="fill" />
            <Text className="text-white font-bold text-lg ml-2">Add Connection</Text>
          </View>
          <Text className="text-slate-400 text-sm mb-4">Enter ID to share health records with Doctor/Caretaker.</Text>
          
          <View className="flex-row bg-white/10 p-1 rounded-xl border border-white/20">
            <TextInput 
              placeholder="Enter ID (e.g. DOC-123)"
              placeholderTextColor="#94A3B8"
              value={connectId}
              onChangeText={setConnectId}
              className="flex-1 px-4 py-2 text-white"
            />
            <TouchableOpacity 
              onPress={() => { speak(`Request sent to ${connectId}`); Alert.alert("Sent!"); setConnectId(""); }}
              className="bg-blue-600 px-4 py-2 rounded-lg justify-center"
            >
              <Text className="text-white font-bold">Send</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

// Helper Component for Inputs
const InputLabel = ({ label, value, onChange, editable, multiline }: any) => (
  <View>
    <Text className="text-xs font-bold text-slate-500 uppercase mb-1">{label}</Text>
    <TextInput 
      value={value}
      onChangeText={onChange}
      editable={editable}
      multiline={multiline}
      className={`p-3 rounded-xl border text-slate-800 font-medium ${editable ? 'bg-white border-blue-200' : 'bg-slate-50 border-slate-200 text-slate-600'}`}
    />
  </View>
);

export default ProfileScreen;