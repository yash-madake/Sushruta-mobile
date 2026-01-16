import React from 'react';
import { Modal as RNModal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { X } from 'phosphor-react-native';
import { COLORS } from '../../constants/theme';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  return (
    <RNModal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
      {/* 1. Overlay: Closes modal when clicked outside */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/60 justify-center items-center p-4">
          
          {/* Stop click propagation so clicking the card doesn't close it */}
          <TouchableWithoutFeedback>
            <View className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-xl">
              
              {/* Header */}
              <View className="flex-row justify-between items-center mb-4">
                {title ? (
                  <Text className="text-xl font-bold text-slate-800">{title}</Text>
                ) : (
                  <View /> // Spacer
                )}
                
                <TouchableOpacity 
                  onPress={onClose}
                  className="w-8 h-8 items-center justify-center rounded-full bg-slate-100"
                >
                  <X size={20} color={COLORS.textSecondary} weight="bold" />
                </TouchableOpacity>
              </View>

              {/* Content */}
              <View>
                {children}
              </View>

            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

export default Modal;