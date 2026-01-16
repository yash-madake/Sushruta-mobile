import React from 'react';
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Alarm, Check } from 'phosphor-react-native';
import { COLORS } from '../../constants/theme';

interface Reminder {
  text: string;
  time: string;
}

interface NotificationAlertProps {
  reminder: Reminder | null;
  onComplete: () => void;
  onClose: () => void;
}

const NotificationAlert = ({ reminder, onComplete, onClose }: NotificationAlertProps) => {
  // If no reminder, do not render
  if (!reminder) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={!!reminder}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/60 justify-center items-center p-4">
          <TouchableWithoutFeedback>
            <View className="bg-white rounded-3xl w-full max-w-sm p-6 border-t-8 border-blue-500 shadow-2xl items-center">
              
              {/* Icon */}
              <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-4">
                <Alarm size={32} color={COLORS.primary} weight="fill" />
              </View>

              {/* Text Content */}
              <Text className="text-2xl font-bold text-slate-800 mb-1 text-center">
                Time for {reminder.text}!
              </Text>
              <Text className="text-slate-500 mb-6 text-center">
                It's {reminder.time}. Have you completed this task?
              </Text>

              {/* Action Buttons */}
              <View className="w-full space-y-3">
                <TouchableOpacity 
                  onPress={onComplete}
                  className="w-full py-4 bg-blue-600 rounded-xl flex-row items-center justify-center space-x-2 shadow-lg shadow-blue-200"
                >
                  <Check size={20} color="white" weight="bold" />
                  <Text className="text-white font-bold text-base ml-2">Yes, Mark Complete</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={onClose}
                  className="w-full py-4 items-center"
                >
                  <Text className="text-slate-500 font-bold text-base">Snooze / Close</Text>
                </TouchableOpacity>
              </View>

            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default NotificationAlert;