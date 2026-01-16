import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CheckCircle, WarningCircle } from 'phosphor-react-native';

interface ToastProps {
  msg: string;
  type: 'success' | 'error';
  onClose?: () => void;
}

const Toast = ({ msg, type, onClose }: ToastProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (msg) {
      setVisible(true);
      // Auto-hide after 3 seconds
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [msg, onClose]);

  if (!visible || !msg) return null;

  // Determine Colors
  const isError = type === 'error';
  const bgColor = isError ? 'bg-red-500' : 'bg-emerald-600';
  const Icon = isError ? WarningCircle : CheckCircle;

  return (
    <View 
      className={`absolute top-12 left-4 right-4 ${bgColor} p-4 rounded-xl flex-row items-center shadow-lg z-50`}
    >
      <Icon size={24} color="white" weight="bold" />
      <Text className="text-white font-medium ml-3 flex-1">
        {msg}
      </Text>
    </View>
  );
};

export default Toast;