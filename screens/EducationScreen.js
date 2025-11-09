import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { GROQ_API_KEY } from '../config/api';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const SUGGESTIONS = [
  'How can I reduce my carbon footprint?',
  'What are simple ways to save water?',
  'Explain climate change in simple terms',
  'How does recycling help the environment?',
  'What are renewable energy sources?',
  'How can I make my home more eco-friendly?',
];

export default function EducationScreen() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your eco-friendly AI assistant. Ask me anything about climate change, sustainability, or how to help the environment! 🌱",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef(null);
  const inputRef = useRef(null);
  const conversationHistory = useRef([
    {
      role: 'system',
      content:
        'You are a friendly and knowledgeable eco-friendly AI assistant. Help users learn about climate change, sustainability, and environmental protection. Keep responses concise, engaging, and educational. Use emojis occasionally to make it fun. Focus on actionable advice.',
    },
  ]);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = async (messageText = null) => {
    const textToSend = messageText || inputText.trim();
    if (!textToSend || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: textToSend,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Add user message to conversation history
    conversationHistory.current.push({
      role: 'user',
      content: textToSend,
    });

    try {
      // Check if API key is configured
      if (!GROQ_API_KEY || GROQ_API_KEY === 'YOUR_GROQ_API_KEY_HERE') {
        throw new Error('API key not configured. Please add your Groq API key in config/api.js');
      }

      // Keep only last 10 messages for context (to avoid token limits)
      const messagesToSend = conversationHistory.current.slice(-11);

      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: messagesToSend,
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      const aiMessage = data.choices[0]?.message?.content || 'Sorry, I could not process that request.';

      // Add AI response to conversation history
      conversationHistory.current.push({
        role: 'assistant',
        content: aiMessage,
      });

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: aiMessage,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: `Sorry, I encountered an error: ${error.message}. Please try again.`,
          isUser: false,
          timestamp: new Date(),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionPress = (suggestion) => {
    setInputText(suggestion);
    inputRef.current?.focus();
    // Auto-send after a brief delay
    setTimeout(() => {
      sendMessage(suggestion);
    }, 100);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hi! I'm your eco-friendly AI assistant. Ask me anything about climate change, sustainability, or how to help the environment! 🌱",
        isUser: false,
        timestamp: new Date(),
      },
    ]);
    // Reset conversation history
    conversationHistory.current = [
      {
        role: 'system',
        content:
          'You are a friendly and knowledgeable eco-friendly AI assistant. Help users learn about climate change, sustainability, and environmental protection. Keep responses concise, engaging, and educational. Use emojis occasionally to make it fun. Focus on actionable advice.',
      },
    ];
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const showSuggestions = messages.length === 1 && !isLoading;

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <LinearGradient
          colors={['#4CAF50', '#45a049', '#3d8b40']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <View style={styles.headerIconContainer}>
                <Ionicons name="sparkles" size={22} color="#fff" />
              </View>
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerTitle}>Eco AI Assistant</Text>
                <Text style={styles.headerSubtitle}>Your climate change guide 🌱</Text>
              </View>
            </View>
            <View style={styles.headerRight}>
              <View style={styles.statusIndicator}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Online</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[styles.messageWrapper, message.isUser ? styles.userMessageWrapper : styles.aiMessageWrapper]}
            >
              {message.isUser ? (
                <View
                  style={[
                    styles.messageBubble,
                    styles.userBubble,
                    message.isError && styles.errorBubble,
                  ]}
                >
                  <Text style={styles.userText}>{message.text}</Text>
                  <Text style={styles.userTimestamp}>{formatTime(message.timestamp)}</Text>
                </View>
              ) : (
                <View
                  style={[
                    styles.messageBubble,
                    styles.aiBubble,
                    message.isError && styles.errorBubble,
                  ]}
                >
                  <View style={styles.aiIcon}>
                    <Ionicons name="leaf" size={16} color="#4CAF50" />
                  </View>
                  <View style={styles.messageTextContainer}>
                    <Text style={styles.aiText}>{message.text}</Text>
                    <Text style={styles.aiTimestamp}>{formatTime(message.timestamp)}</Text>
                  </View>
                </View>
              )}
            </View>
          ))}

          {isLoading && (
            <View style={styles.loadingWrapper}>
              <View style={[styles.messageBubble, styles.aiBubble]}>
                <View style={styles.aiIcon}>
                  <Ionicons name="leaf" size={16} color="#4CAF50" />
                </View>
                <View style={styles.messageTextContainer}>
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#4CAF50" />
                    <Text style={styles.loadingText}>Thinking...</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {showSuggestions && (
            <View style={styles.suggestionsContainer}>
              <Text style={styles.suggestionsTitle}>💡 Try asking:</Text>
              <View style={styles.suggestionsGrid}>
                {SUGGESTIONS.map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.suggestionChip}
                    onPress={() => handleSuggestionPress(suggestion)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.suggestionText}>{suggestion}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </ScrollView>

        <View style={[styles.inputContainer, { paddingBottom: Math.max(insets.bottom, 10) }]}>
          <View style={styles.inputRow}>
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Ask about climate change, sustainability..."
              placeholderTextColor="#999"
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
              editable={!isLoading}
              returnKeyType="send"
              onSubmitEditing={() => sendMessage()}
              blurOnSubmit={false}
            />
            <TouchableOpacity
              style={[styles.sendButton, (!inputText.trim() || isLoading) && styles.sendButtonDisabled]}
              onPress={() => sendMessage()}
              disabled={!inputText.trim() || isLoading}
            >
              <Ionicons name="send" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.clearButton} onPress={clearChat}>
            <Ionicons name="trash-outline" size={14} color="#666" />
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    paddingTop: 12,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.3,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 3,
    fontWeight: '500',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#81C784',
    marginRight: 6,
    shadowColor: '#81C784',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 2,
  },
  statusText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '600',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
  messageWrapper: {
    marginBottom: 15,
    maxWidth: '85%',
  },
  userMessageWrapper: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  aiMessageWrapper: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: '#4CAF50',
    borderBottomRightRadius: 4,
    maxWidth: '100%',
  },
  aiBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
    flexDirection: 'row',
    alignItems: 'flex-start',
    maxWidth: '100%',
  },
  errorBubble: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
    borderWidth: 1,
  },
  aiIcon: {
    marginRight: 8,
    marginTop: 2,
    flexShrink: 0,
  },
  messageTextContainer: {
    flex: 1,
    minWidth: 0,
  },
  userText: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 20,
  },
  aiText: {
    color: '#333',
    fontSize: 15,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  aiTimestamp: {
    color: '#999',
  },
  loadingWrapper: {
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  suggestionsContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  suggestionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  suggestionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  suggestionChip: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C8E6C9',
    marginRight: 8,
    marginBottom: 8,
  },
  suggestionText: {
    fontSize: 13,
    color: '#2E7D32',
    fontWeight: '500',
  },
  inputContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    minHeight: 48,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    maxHeight: 100,
    paddingVertical: 8,
    paddingHorizontal: 4,
    textAlignVertical: 'center',
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.5,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  clearButtonText: {
    fontSize: 11,
    color: '#666',
    marginLeft: 4,
  },
});
