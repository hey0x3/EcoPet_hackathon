import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { useLanguage } from '../src/i18n/LanguageContext';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function NotificationsScreen() {
  const { t } = useLanguage();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    loadSettings();
    requestPermissions();
  }, []);

  const loadSettings = async () => {
    try {
      const saved = await AsyncStorage.getItem('notifications.enabled');
      if (saved !== null) {
        setEnabled(saved === 'true');
      }
    } catch (error) {
      console.error('Error loading notification settings:', error);
    }
  };

  const requestPermissions = async () => {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        console.log('Notification permissions not granted');
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
    }
  };

  const handleToggle = async (value) => {
    setEnabled(value);
    await AsyncStorage.setItem('notifications.enabled', value.toString());

    if (value) {
      // Schedule daily notification at 19:00
      await scheduleDailyNotification();
    } else {
      // Cancel all scheduled notifications
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
  };

  const scheduleDailyNotification = async () => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      
      await Notifications.scheduleNotificationAsync({
        content: {
          title: t('test_notification_title'),
          body: t('test_notification_body'),
          sound: true,
        },
        trigger: {
          hour: 19,
          minute: 0,
          repeats: true,
        },
      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };

  const sendTestNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: t('test_notification_title') || 'EcoPet Reminder',
          body: t('test_notification_body') || 'Time to complete your eco-friendly tasks!',
          sound: true,
        },
        trigger: null, // Send immediately
      });
      Alert.alert('✓', t('notification_sent') || 'Test notification sent!');
    } catch (error) {
      console.error('Error sending test notification:', error);
      Alert.alert('Error', 'Failed to send notification. Please check permissions.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="notifications-outline" size={24} color="#333" style={styles.icon} />
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>{t('daily_reminder')}</Text>
              <Text style={styles.settingDesc}>{t('daily_reminder_desc')}</Text>
            </View>
          </View>
          <Switch
            value={enabled}
            onValueChange={handleToggle}
            trackColor={{ false: '#ccc', true: '#81C784' }}
            thumbColor={enabled ? '#4CAF50' : '#f4f3f4'}
          />
        </View>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.testButton} onPress={sendTestNotification}>
          <Ionicons name="send-outline" size={20} color="#4CAF50" />
          <Text style={styles.testButtonText}>{t('send_test')}</Text>
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
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 15,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  settingDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 20,
  },
  testButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4CAF50',
    backgroundColor: '#f1f8f4',
  },
  testButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
    marginLeft: 8,
  },
});
