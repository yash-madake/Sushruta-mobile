import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Linking, Image } from 'react-native';
import { Plus, CalendarBlank, Clock, MapPin, VideoCamera, CheckCircle, X, Stethoscope, CaretDown, CaretLeft } from 'phosphor-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';

// Mock Data
const MOCK_APPOINTMENTS = [
  { id: 1, doctor: 'Dr. Sharma', spec: 'Cardiologist', date: '2025-10-24', time: '10:00 AM', status: 'Confirmed' },
  { id: 2, doctor: 'Dr. Verma', spec: 'General Physician', date: '2025-10-28', time: '05:30 PM', status: 'Pending' },
];

const AppointmentsScreen = () => {
  const insets = useSafeAreaInsets();
  const [view, setView] = useState<'list' | 'book'>('list');
  const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS);

  // Form State
  const [formData, setFormData] = useState({
    doctorName: '',
    date: '',
    time: '',
    reason: ''
  });

  const handleBook = () => {
    if (!formData.doctorName || !formData.date || !formData.time) {
      Alert.alert("Missing Info", "Please fill in all fields.");
      return;
    }

    const newApp = {
      id: Date.now(),
      doctor: formData.doctorName,
      spec: 'Specialist',
      date: formData.date,
      time: formData.time,
      status: 'Pending'
    };

    setAppointments([...appointments, newApp]);
    setView('list');
    setFormData({ doctorName: '', date: '', time: '', reason: '' }); // Reset
    Alert.alert("Success", "Appointment Request Sent!");
  };

  const openESanjeevani = () => {
    Linking.openURL('https://esanjeevani.mohfw.gov.in/');
  };

  return (
    <View className="flex-1 bg-slate-50" style={{ paddingTop: insets.top }}>
      
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-100 flex-row justify-between items-center">
        <View>
          <Text className="text-2xl font-bold text-slate-800">Appointments</Text>
          <Text className="text-slate-500">Track doctor visits</Text>
        </View>
        {view === 'list' && (
          <TouchableOpacity 
            onPress={() => setView('book')}
            className="bg-blue-900 px-4 py-2 rounded-xl flex-row items-center shadow-lg shadow-blue-200"
          >
            <Plus size={18} color="white" weight="bold" />
            <Text className="text-white font-bold ml-2">Book New</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        
        {/* VIEW: LIST */}
        {view === 'list' ? (
          <>
            {/* List of Appointments */}
            <View className="space-y-4 mb-8">
              {appointments.length === 0 ? (
                <View className="p-8 bg-white rounded-2xl border border-dashed border-slate-300 items-center">
                  <CalendarBlank size={48} color={COLORS.textLight} />
                  <Text className="text-slate-400 mt-2">No appointments yet.</Text>
                </View>
              ) : (
                appointments.map((app) => (
                  <View key={app.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden mb-4">
                    {/* Status Strip */}
                    <View className={`absolute left-0 top-0 bottom-0 w-2 ${
                      app.status === 'Confirmed' ? 'bg-emerald-500' : 'bg-amber-400'
                    }`} />
                    
                    <View className="flex-row justify-between items-start pl-4">
                      <View>
                        <Text className="font-bold text-lg text-slate-800">{app.doctor}</Text>
                        <Text className="text-sm text-slate-500 mb-3">{app.spec}</Text>
                        
                        <View className="flex-row space-x-3">
                          <View className="bg-slate-100 px-2 py-1 rounded flex-row items-center">
                            <CalendarBlank size={14} color={COLORS.textSecondary} weight="bold" />
                            <Text className="text-xs font-bold text-slate-600 ml-1">{app.date}</Text>
                          </View>
                          <View className="bg-slate-100 px-2 py-1 rounded flex-row items-center">
                            <Clock size={14} color={COLORS.textSecondary} weight="bold" />
                            <Text className="text-xs font-bold text-slate-600 ml-1">{app.time}</Text>
                          </View>
                        </View>
                      </View>

                      <View className={`px-3 py-1 rounded-lg ${
                        app.status === 'Confirmed' ? 'bg-emerald-100' : 'bg-amber-100'
                      }`}>
                        <Text className={`text-xs font-bold uppercase ${
                          app.status === 'Confirmed' ? 'text-emerald-700' : 'text-amber-700'
                        }`}>{app.status}</Text>
                      </View>
                    </View>
                  </View>
                ))
              )}
            </View>

            {/* eSanjeevani Banner */}
            <TouchableOpacity 
              onPress={openESanjeevani}
              className="bg-indigo-900 rounded-3xl p-6 mb-10 shadow-xl border border-indigo-800"
            >
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <View className="bg-indigo-800 self-start px-3 py-1 rounded-full mb-3 border border-indigo-700">
                    <Text className="text-indigo-200 text-xs font-bold uppercase">Govt. of India</Text>
                  </View>
                  <Text className="text-white text-2xl font-bold mb-1">eSanjeevani OPD</Text>
                  <Text className="text-indigo-200 text-sm mb-4">Free video consultation with specialist doctors.</Text>
                  
                  <View className="bg-white self-start px-5 py-3 rounded-xl flex-row items-center">
                    <Text className="text-indigo-900 font-bold mr-2">Start Video Call</Text>
                    <VideoCamera size={18} color={COLORS.primaryDark} weight="fill" />
                  </View>
                </View>
                <VideoCamera size={64} color="white" weight="duotone" opacity={0.2} />
              </View>
            </TouchableOpacity>
          </>
        ) : (
          /* VIEW: BOOKING FORM */
          <View className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden mb-10">
            {/* Header */}
            <View className="bg-blue-900 p-6 flex-row justify-between items-center">
              <View>
                <Text className="text-white text-xl font-bold">Book Appointment</Text>
                <Text className="text-blue-200 text-sm">Fill details below</Text>
              </View>
              <TouchableOpacity onPress={() => setView('list')} className="bg-white/10 p-2 rounded-full">
                <X size={20} color="white" />
              </TouchableOpacity>
            </View>

            {/* Form */}
            <View className="p-6 space-y-4">
              {/* Doctor Name */}
              <View>
                <Text className="text-xs font-bold text-slate-500 uppercase mb-1">Doctor / Specialist</Text>
                <View className="bg-slate-50 border border-slate-200 rounded-xl flex-row items-center px-4">
                  <Stethoscope size={20} color={COLORS.primary} />
                  <TextInput 
                    placeholder="Dr. Sharma (Cardiologist)"
                    value={formData.doctorName}
                    onChangeText={t => setFormData({...formData, doctorName: t})}
                    className="flex-1 p-4 text-slate-800 font-medium"
                  />
                </View>
              </View>

              {/* Date */}
              <View>
                <Text className="text-xs font-bold text-slate-500 uppercase mb-1">Date (YYYY-MM-DD)</Text>
                <View className="bg-slate-50 border border-slate-200 rounded-xl flex-row items-center px-4">
                  <CalendarBlank size={20} color={COLORS.primary} />
                  <TextInput 
                    placeholder="2025-10-24"
                    value={formData.date}
                    onChangeText={t => setFormData({...formData, date: t})}
                    className="flex-1 p-4 text-slate-800 font-medium"
                  />
                </View>
              </View>

              {/* Time */}
              <View>
                <Text className="text-xs font-bold text-slate-500 uppercase mb-1">Time</Text>
                <View className="bg-slate-50 border border-slate-200 rounded-xl flex-row items-center px-4">
                  <Clock size={20} color={COLORS.primary} />
                  <TextInput 
                    placeholder="10:00 AM"
                    value={formData.time}
                    onChangeText={t => setFormData({...formData, time: t})}
                    className="flex-1 p-4 text-slate-800 font-medium"
                  />
                </View>
              </View>

              <TouchableOpacity 
                onPress={handleBook}
                className="bg-blue-600 py-4 rounded-xl flex-row justify-center items-center mt-4 shadow-lg shadow-blue-200"
              >
                <Text className="text-white font-bold text-lg mr-2">Confirm Booking</Text>
                <CheckCircle size={24} color="white" weight="bold" />
              </TouchableOpacity>
            </View>
          </View>
        )}

      </ScrollView>
    </View>
  );
};

export default AppointmentsScreen;