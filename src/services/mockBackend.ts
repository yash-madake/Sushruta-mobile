import AsyncStorage from '@react-native-async-storage/async-storage';

export const MockBackend = {
  DB_KEY: 'sushruta_db_v_final_reset', 

  // Initialize DB with Seed Data
  initDB: async () => {
      try {
          const now = new Date();
          const todayStr = now.toDateString(); 
          let data: any = null;

          // 1. Try to load existing data
          try {
              const raw = await AsyncStorage.getItem(MockBackend.DB_KEY);
              if (raw) data = JSON.parse(raw);
          } catch (e) {
              await AsyncStorage.removeItem(MockBackend.DB_KEY);
          }

          // 2. If no data exists, create Seed Data
          if (!data) {
              data = {
                  lastLogin: todayStr,
                  user: { 
                      name: 'Rajesh', phone: '9876543210', pin: '1234', dob: '', gender: '', address: '', language: '', photo: '', 
                      emergencyPrimary: { name: '', contact: '', relation: 'Guardian' }, 
                      hospitalPref: '', bloodGroup: 'O+', allergies: 'None', chronicConditions: 'Hypertension'
                  },
                  meds: [
                      { id: 1, name: "Metformin", type: "Tablet", category: "Daily Routine", dose: "500mg", qty: "1 Tab", schedule: "Morning", instructions: "After Breakfast", taken: false },
                      { id: 2, name: "Amlodipine", type: "Tablet", category: "Daily Routine", dose: "5mg", qty: "1 Tab", schedule: "Night", instructions: "Before Sleep", taken: false },
                  ],
                  vitals: { steps: 120, target: 5000, bp: "120/80", heartRate: 72, sleep: "6.5", exercise: false }, 
                  history: {
                      steps: [3200, 4500, 2800, 5100, 4200, 3800], 
                      heart: [72, 75, 68, 74, 71, 70],
                      bp: [122, 118, 125, 120, 119, 121],
                      sleep: [6.5, 7.0, 5.5, 8.0, 6.2, 7.1],
                  },
                  reports: [], 
                  reminders: [],
                  appointments: [],
                  wellnessLogs: [],
              };
              
              // Water Reminders
              const start = 7; const end = 23;
              for (let h = start; h <= end; h++) {
                  const ampm = h >= 12 ? 'PM' : 'AM';
                  const hour = h % 12 || 12;
                  const timeStr = `${hour.toString().padStart(2, '0')}:00 ${ampm}`;
                  data.reminders.push({ id: `water-${h}-${Date.now()}`, text: "Drink Water", time: timeStr, day: now.getDate(), completed: false });
              }
              
              await AsyncStorage.setItem(MockBackend.DB_KEY, JSON.stringify(data));
          } 
          else {
              // Daily Reset Logic
              if (data.lastLogin !== todayStr) {
                  // Shift history
                  data.history.steps = [...data.history.steps.slice(1), data.vitals.steps || 0];
                  
                  // Reset Daily Counters
                  data.vitals.steps = 0; 
                  data.meds = data.meds.map((m: any) => ({...m, taken: false}));
                  data.lastLogin = todayStr;
                  
                  await MockBackend.updateData(data);
              }
          }
      } catch (err) {
          console.error("InitDB Error:", err);
      }
  },

  // Get Data Helper
  getData: async () => {
      try { 
        const json = await AsyncStorage.getItem(MockBackend.DB_KEY);
        return json ? JSON.parse(json) : null; 
      } catch (e) { return null; }
  },

  // Main Update Function
  updateData: async (newData: any) => {
      try {
          await AsyncStorage.setItem(MockBackend.DB_KEY, JSON.stringify(newData));
          return true;
      } catch (e) {
          console.error("Update Failed", e);
          return false;
      }
  },
};

// You should call this in App.tsx or a splash screen
// MockBackend.initDB();