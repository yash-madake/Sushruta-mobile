import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { PaperPlaneRight, Robot, User } from 'phosphor-react-native';
import { COLORS } from '../../constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Message {
  id: number;
  sender: 'bot' | 'user';
  text: string;
}

const AiAssistantScreen = () => {
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'bot', text: 'Namaste! I am your health assistant. How are you feeling today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Auto-scroll when messages change
  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI Response
    setTimeout(() => {
      let responseText = "I see. It's best to consult your doctor for persistent symptoms.";
      const lower = userMsg.text.toLowerCase();

      if (lower.includes('headache') || lower.includes('head hurts')) {
        responseText = "For a headache, try drinking a glass of water and resting in a quiet, dark room. Check your blood pressure if possible.";
      } else if (lower.includes('chest pain')) {
        responseText = "⚠️ Chest pain can be serious. Please use the SOS button immediately or call emergency services if it persists.";
      } else if (lower.includes('dizzy')) {
        responseText = "Sit down slowly to avoid falling. Drink water. If you are diabetic, check your sugar levels.";
      } else if (lower.includes('thank')) {
        responseText = "You are welcome! Take care.";
      } else if (lower.includes('hi') || lower.includes('hello')) {
        responseText = "Hello! How can I help you with your health today?";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: responseText }]);
      setIsTyping(false);
    }, 1500);
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isUser = item.sender === 'user';
    return (
      <View className={`flex-row mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
        {!isUser && (
          <View className="w-8 h-8 rounded-full bg-blue-100 items-center justify-center mr-2">
            <Robot size={18} color={COLORS.primary} weight="fill" />
          </View>
        )}
        
        <View 
          className={`max-w-[80%] p-4 rounded-2xl ${
            isUser 
              ? 'bg-blue-900 rounded-br-none' 
              : 'bg-white border border-slate-200 rounded-bl-none'
          }`}
        >
          <Text className={`text-base ${isUser ? 'text-white' : 'text-slate-800'}`}>
            {item.text}
          </Text>
        </View>

        {isUser && (
          <View className="w-8 h-8 rounded-full bg-slate-200 items-center justify-center ml-2">
            <User size={18} color={COLORS.textSecondary} weight="fill" />
          </View>
        )}
      </View>
    );
  };

  return (
    <View className="flex-1 bg-slate-50" style={{ paddingTop: insets.top }}>
      
      {/* Header */}
      <View className="bg-white p-4 border-b border-slate-100 flex-row items-center space-x-3 shadow-sm z-10">
        <View className="w-10 h-10 bg-blue-600 rounded-full items-center justify-center">
          <Robot size={24} color="white" weight="fill" />
        </View>
        <View>
          <Text className="font-bold text-lg text-slate-800">Sushruta Assistant</Text>
          <View className="flex-row items-center">
            <View className="w-2 h-2 bg-green-500 rounded-full mr-1" />
            <Text className="text-xs text-slate-500">Online</Text>
          </View>
        </View>
      </View>

      {/* Chat Area */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
          ListFooterComponent={
            isTyping ? (
              <View className="flex-row items-center ml-10 mb-4">
                <View className="bg-white p-3 rounded-2xl rounded-bl-none border border-slate-200">
                  <ActivityIndicator size="small" color={COLORS.primary} />
                </View>
              </View>
            ) : null
          }
        />

        {/* Input Area */}
        <View className="p-4 bg-white border-t border-slate-100">
          <View className="flex-row items-center space-x-2">
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Type your symptoms..."
              className="flex-1 bg-slate-100 p-4 rounded-xl text-base text-slate-800"
              placeholderTextColor={COLORS.textLight}
            />
            <TouchableOpacity 
              onPress={handleSend}
              className="bg-blue-600 p-4 rounded-xl items-center justify-center shadow-md"
            >
              <PaperPlaneRight size={24} color="white" weight="bold" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AiAssistantScreen;