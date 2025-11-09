import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '../src/i18n/LanguageContext';

export default function ResetScreen({ navigation }) {
  const { t, lang } = useLanguage();
  const [isResetting, setIsResetting] = useState(false);

  const handleReset = () => {
    Alert.alert(
      t('confirm_reset_title'),
      t('confirm_reset_msg'),
      [
        {
          text: t('cancel'),
          style: 'cancel',
        },
        {
          text: t('delete'),
          style: 'destructive',
          onPress: performReset,
        },
      ]
    );
  };

  const performReset = async () => {
    setIsResetting(true);
    try {
      // Save current language
      const currentLang = lang;

      // Clear all AsyncStorage
      await AsyncStorage.clear();

      // Restore language preference
      await AsyncStorage.setItem('app.lang', currentLang);

      // Navigate to onboarding
      navigation.reset({
        index: 0,
        routes: [{ name: 'OnboardingPet' }],
      });
    } catch (error) {
      console.error('Error resetting app:', error);
      Alert.alert('Error', 'Failed to reset app data');
    } finally {
      setIsResetting(false);
    }
  };

  if (isResetting) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>{t('resetting')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="warning" size={60} color="#FF6B6B" />
        </View>

        <Text style={styles.title}>{t('reset')}</Text>
        <Text style={styles.description}>{t('confirm_reset_msg')}</Text>

        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Ionicons name="trash-outline" size={20} color="#fff" />
          <Text style={styles.resetButtonText}>{t('delete')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFE8E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 40,
  },
  resetButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});
