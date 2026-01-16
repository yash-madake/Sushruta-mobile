import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Bluetooth, BluetoothConnected } from 'phosphor-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Components
import VitalsCard from './components/VitalsCard';
import SosButton from './components/SosButton';
import ManualEntryModal from '../../components/ui/ManualEntryModal';
import ChartModal from '../../components/charts/ChartModal';
import NotificationAlert from '../../components/ui/NotificationAlert';

const DashboardScreen = () => {
  const insets = useSafeAreaInsets();
  
  // Mock Data (Replace with your actual data store/context)
  const user = { name: "Rajesh Kumar", role: "senior" };
  const [data, setData] = useState({
    vitals: { steps: 3200, heartRate: 72, bp: '120/80', sleep: { display: '7h 30m', value: 7.5 }, target: 6000 },
    history: {
        steps: [2000, 3500, 4100, 2800, 3200, 5000, 3200],
        heart: [70, 72, 75, 71, 69, 74, 72],
        bp: [120, 118, 122, 119, 121, 120, 120],
        sleep: [7, 6.5, 8, 7.5, 7, 7.2, 7.5]
    }
  });

  // State
  const [connected, setConnected] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [sosStep, setSosStep] = useState(0);
  
  // Modal State
  const [editingMetric, setEditingMetric] = useState<string | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [activeAlert, setActiveAlert] = useState<{text: string, time: string} | null>(null);

  const isCareTeam = user.role === 'doctor' || user.role === 'caretaker';

  // Mock Alert Timer (Simulates a reminder popping up)
  useEffect(() => {
    const timer = setTimeout(() => {
        setActiveAlert({ text: "Take Metformin", time: "02:00 PM" });
    }, 5000); // Alert pops up after 5 seconds for demo
    return () => clearTimeout(timer);
  }, []);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => { 
        setConnected(true); 
        setSyncing(false); 
        Alert.alert("Synced", "Smartwatch data updated successfully.");
    }, 1500);
  };

  const handleSOS = () => {
    if (sosStep === 0) { 
        setSosStep(1); 
        setTimeout(() => setSosStep(0), 3000); // Reset if not confirmed
    } else { 
        Alert.alert("🚨 SOS SENT", "Emergency contacts have been notified with your GPS location.");
        setSosStep(0); 
    }
  };

  const handleSaveManual = (val: any) => {
    // In a real app, you would parse 'val' and update 'data' state here
    console.log(`Saving ${editingMetric}:`, val);
    setEditingMetric(null);
    Alert.alert("Updated", `${editingMetric} has been recorded.`);
  };

  const getHistory = (metric: string) => {
      if (metric === 'Steps') return data.history.steps;
      if (metric === 'Heart Rate') return data.history.heart;
      if (metric === 'BP') return data.history.bp;
      if (metric === 'Sleep') return data.history.sleep;
      return [];
  };

  return (
    <View className="flex-1 bg-slate-50" style={{ paddingTop: insets.top }}>
      
      {/* Modals */}
      <ManualEntryModal 
        metric={editingMetric || ''} 
        visible={!!editingMetric} 
        onClose={() => setEditingMetric(null)} 
        onSave={handleSaveManual} 
      />
      
      <ChartModal 
        type={selectedMetric || ''}
        history={selectedMetric ? getHistory(selectedMetric) : []}
        currentVal={0} // Pass live value here in real app
        visible={!!selectedMetric}
        close={() => setSelectedMetric(null)}
      />

      <NotificationAlert 
        reminder={activeAlert} 
        onComplete={() => setActiveAlert(null)} 
        onClose={() => setActiveAlert(null)} 
      />

      {/* Header */}
      <View className="px-6 py-4 flex-row justify-between items-center bg-white border-b border-slate-100">
        <View>
          <Text className="text-2xl font-bold text-slate-800">Namaste, {user.name.split(' ')[0]} 🙏</Text>
          <Text className="text-slate-500 text-xs">Here is your health summary.</Text>
        </View>
        
        {!isCareTeam && (
          <TouchableOpacity 
            onPress={handleSync}
            className={`flex-row items-center px-4 py-2 rounded-full border shadow-sm ${
              connected ? 'bg-emerald-50 border-emerald-200' : 'bg-blue-600 border-blue-600'
            }`}
          >
            {connected ? (
                <BluetoothConnected size={20} color="#059669" weight="fill" />
            ) : (
                <Bluetooth size={20} color="white" weight="bold" />
            )}
            <Text className={`font-bold text-xs ml-2 ${connected ? 'text-emerald-700' : 'text-white'}`}>
                {syncing ? '...' : connected ? 'Live' : 'Connect'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* SOS Button */}
        <SosButton 
            isCareTeam={isCareTeam} 
            sosStep={sosStep} 
            handleSOS={handleSOS} 
            userName={user.name} 
        />

        {/* Vitals Grid */}
        <View className="flex-row flex-wrap justify-between">
            <View className="w-[48%]">
                <VitalsCard 
                    title="Daily Steps" 
                    value={data.vitals.steps} 
                    subtitle="Goal: 6k" 
                    icon="ph-sneaker-move" 
                    color="teal" 
                    progress={(data.vitals.steps / data.vitals.target) * 100}
                    onClick={() => setSelectedMetric('Steps')}
                    onAddClick={() => setEditingMetric('Steps')}
                    isDoctor={isCareTeam}
                />
                <VitalsCard 
                    title="Blood Pressure" 
                    value={data.vitals.bp} 
                    subtitle="Normal" 
                    icon="ph-drop" 
                    color="blue"
                    onClick={() => setSelectedMetric('BP')}
                    onAddClick={() => setEditingMetric('Blood Pressure')}
                    isDoctor={isCareTeam}
                />
            </View>
            
            <View className="w-[48%]">
                <VitalsCard 
                    title="Heart Rate" 
                    value={data.vitals.heartRate} 
                    unit="bpm" 
                    subtitle="Avg: 72" 
                    icon="ph-heartbeat" 
                    color="red"
                    onClick={() => setSelectedMetric('Heart Rate')}
                    onAddClick={() => setEditingMetric('Heart Rate')}
                    isDoctor={isCareTeam}
                />
                <VitalsCard 
                    title="Sleep" 
                    value={data.vitals.sleep.display} 
                    subtitle="Deep Sleep: 2h" 
                    icon="ph-moon-stars" 
                    color="purple"
                    onClick={() => setSelectedMetric('Sleep')}
                    onAddClick={() => setEditingMetric('Sleep')}
                    isDoctor={isCareTeam}
                />
            </View>
        </View>

      </ScrollView>
    </View>
  );
};

export default DashboardScreen;