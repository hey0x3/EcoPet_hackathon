import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../src/i18n/LanguageContext';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'bs', name: 'Bosanski', flag: '🇧🇦' },
];

export default function LanguageScreen() {
  const { lang, setLang } = useLanguage();

  const handleSelectLanguage = (code) => {
    setLang(code);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {LANGUAGES.map((language, index) => (
          <View key={language.code}>
            <TouchableOpacity
              style={styles.languageItem}
              onPress={() => handleSelectLanguage(language.code)}
              activeOpacity={0.7}
            >
              <View style={styles.languageLeft}>
                <Text style={styles.flag}>{language.flag}</Text>
                <Text style={styles.languageName}>{language.name}</Text>
              </View>
              {lang === language.code && (
                <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
              )}
            </TouchableOpacity>
            {index < LANGUAGES.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingVertical: 10,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  languageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flag: {
    fontSize: 28,
    marginRight: 15,
  },
  languageName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginLeft: 75,
  },
});
