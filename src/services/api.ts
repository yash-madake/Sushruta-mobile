import AsyncStorage from '@react-native-async-storage/async-storage';

// ⚠️ IMPORTANT: Replace with your PC's IP Address if running on a real phone (e.g., 'http://192.168.1.5:5000/api')
// For Android Emulator, use 'http://10.0.2.2:5000/api'
const API_URL = 'http://10.0.2.2:5000/api'; 

// Helper to get headers
const getAuthHeaders = async () => {
  const userJson = await AsyncStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;
  return user && user.token 
    ? { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json' } 
    : { 'Content-Type': 'application/json' };
};

// --- AUTHENTICATION ---

export const login = async (phone: string, pin: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password: pin }), // Mapping pin to password
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');
    
    await AsyncStorage.setItem('user', JSON.stringify(data));
    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Network request failed');
  }
};

export const signup = async (userData: any) => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Signup failed');
  
  await AsyncStorage.setItem('user', JSON.stringify(data));
  return data;
};

export const logout = async () => {
  await AsyncStorage.removeItem('user');
  // Navigation to login is handled by the RootNavigator listening to auth state
};

// --- MEDICINES ---

export const fetchMedicines = async () => {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_URL}/meds`, { headers });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const addMedicine = async (medData: any) => {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_URL}/meds`, {
    method: 'POST',
    headers,
    body: JSON.stringify(medData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

// --- APPOINTMENTS ---

export const fetchAppointments = async () => {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_URL}/appointments`, { headers });
  return await response.json();
};

export const bookAppointment = async (apptData: any) => {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_URL}/appointments`, {
    method: 'POST',
    headers,
    body: JSON.stringify(apptData),
  });
  return await response.json();
};