import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '../src/i18n/LanguageContext';

export default function OnboardingPetScreen({ navigation }) {
  const { t } = useLanguage();
  const [step, setStep] = useState(1); // 1 = user name, 2 = pet name
  const [userName, setUserName] = useState('');
  const [petName, setPetName] = useState('');

  const handleNext = () => {
    if (userName.trim().length === 0) return;
    setStep(2);
  };

  const handleStart = async () => {
    if (petName.trim().length === 0) return;

    try {
      // Save user name and pet name
      await AsyncStorage.setItem('profile.name', userName.trim());
      await AsyncStorage.setItem('pet.name', petName.trim());
      
      // Set onboarded flag
      await AsyncStorage.setItem('onboarded', '1');
      
      // Initialize minimal stats
      await AsyncStorage.setItem('stats.level', '1');
      await AsyncStorage.setItem('stats.exp', '0');
      await AsyncStorage.setItem('stats.streak', '0');

      // Navigate to main app
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainApp' }],
      });
    } catch (error) {
      console.error('Error saving names:', error);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <LinearGradient
        colors={['#4CAF50', '#45a049']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons name={step === 1 ? 'person' : 'leaf'} size={80} color="#fff" />
          </View>
          
          {step === 1 ? (
            <>
              <Text style={styles.title}>{t('enter_name')}</Text>
              <Text style={styles.subtitle}>Let's get to know you!</Text>
              
              <TextInput
                style={styles.input}
                placeholder="Your name..."
                placeholderTextColor="#999"
                value={userName}
                onChangeText={setUserName}
                maxLength={30}
                autoFocus={true}
                onSubmitEditing={handleNext}
              />
              
              <TouchableOpacity
                style={[styles.button, userName.trim().length === 0 && styles.buttonDisabled]}
                onPress={handleNext}
                disabled={userName.trim().length === 0}
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.title}>{t('choose_pet_name')}</Text>
              <Text style={styles.subtitle}>Now, name your eco buddy!</Text>
              
              <TextInput
                style={styles.input}
                placeholder={t('pet_name_placeholder')}
                placeholderTextColor="#999"
                value={petName}
                onChangeText={setPetName}
                maxLength={20}
                autoFocus={true}
                onSubmitEditing={handleStart}
              />
              
              <TouchableOpacity
                style={[styles.button, petName.trim().length === 0 && styles.buttonDisabled]}
                onPress={handleStart}
                disabled={petName.trim().length === 0}
              >
                <Text style={styles.buttonText}>{t('start')}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setStep(1)}
              >
                <Text style={styles.backButtonText}>← Back</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  backButton: {
    marginTop: 20,
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
});
