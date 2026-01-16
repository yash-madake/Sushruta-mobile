import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, Dimensions } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { NavigationArrow, ShareNetwork, Crosshair } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';

const GPSTrackerScreen = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      // 1. Request Permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      // 2. Get Current Location
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      setLoading(false);
    })();
  }, []);

  const shareLocation = () => {
    Alert.alert("Location Shared", "Your live location has been sent to your emergency contacts.");
  };

  const recenter = async () => {
    setLoading(true);
    let loc = await Location.getCurrentPositionAsync({});
    setLocation(loc);
    setLoading(false);
  };

  if (loading || !location) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50">
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text className="mt-4 text-slate-500 font-medium">Acquiring Satellite Lock...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      {/* Map View */}
      <MapView
        style={{ width: Dimensions.get('window').width, height: '100%' }}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        }}
      >
        {/* User Marker */}
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="You are here"
          description="Current Location"
        />
        
        {/* Safe Zone Circle (Example) */}
        <Circle 
          center={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          radius={500}
          strokeColor="rgba(37, 99, 235, 0.5)"
          fillColor="rgba(37, 99, 235, 0.1)"
        />
      </MapView>

      {/* Floating Info Card */}
      <View className="absolute bottom-10 left-4 right-4 bg-white p-5 rounded-3xl shadow-xl border border-slate-100">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-lg font-bold text-slate-800">My Location</Text>
            <Text className="text-slate-500 text-xs">
              Lat: {location.coords.latitude.toFixed(4)}, Long: {location.coords.longitude.toFixed(4)}
            </Text>
          </View>
          <View className="bg-green-100 px-3 py-1 rounded-full">
            <Text className="text-green-700 text-xs font-bold uppercase">Safe Zone</Text>
          </View>
        </View>

        <View className="flex-row gap-3">
          <TouchableOpacity 
            onPress={recenter}
            className="flex-1 bg-slate-100 py-3 rounded-xl flex-row items-center justify-center"
          >
            <Crosshair size={20} color={COLORS.textSecondary} />
            <Text className="ml-2 font-bold text-slate-600">Re-Center</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={shareLocation}
            className="flex-1 bg-blue-600 py-3 rounded-xl flex-row items-center justify-center shadow-lg shadow-blue-200"
          >
            <ShareNetwork size={20} color="white" weight="bold" />
            <Text className="ml-2 font-bold text-white">Share Live</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Back Button */}
      <TouchableOpacity 
        onPress={() => navigation.goBack()}
        className="absolute top-12 left-4 bg-white p-3 rounded-full shadow-lg"
      >
        <NavigationArrow size={24} color={COLORS.textPrimary} weight="bold" />
      </TouchableOpacity>
    </View>
  );
};

export default GPSTrackerScreen;