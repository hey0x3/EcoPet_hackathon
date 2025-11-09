import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen';
import TasksScreen from './screens/TasksScreen';
import EducationScreen from './screens/EducationScreen';
import StatsScreen from './screens/StatsScreen';
import ShopScreen from './screens/ShopScreen';
import SettingsScreen from './screens/SettingsScreen';
import ProfileScreen from './screens/ProfileScreen';
import LanguageScreen from './screens/LanguageScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import AboutScreen from './screens/AboutScreen';
import ResetScreen from './screens/ResetScreen';
import OnboardingPetScreen from './screens/OnboardingPetScreen';
import { PetProvider } from './context/PetContext';
import { LanguageProvider, useLanguage } from './src/i18n/LanguageContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Helper function to create header with settings icon
const getHeaderOptions = (title, navigation) => ({
  title,
  headerStyle: {
    backgroundColor: '#4CAF50',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerRight: () => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Settings')}
      style={{ marginRight: 15 }}
    >
      <Ionicons name="settings-outline" size={24} color="#fff" />
    </TouchableOpacity>
  ),
});

// Stack Navigator for Home tab
function HomeStack() {
  const { t } = useLanguage();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={({ navigation }) => getHeaderOptions(t('home'), navigation)}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: t('settings'),
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: t('profile'), headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
      <Stack.Screen name="Language" component={LanguageScreen} options={{ title: t('language'), headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ title: t('notifications'), headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
      <Stack.Screen name="About" component={AboutScreen} options={{ title: t('about'), headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
      <Stack.Screen name="Reset" component={ResetScreen} options={{ title: t('reset'), headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
    </Stack.Navigator>
  );
}

// Stack Navigator for Tasks tab
function TasksStack() {
  const { t } = useLanguage();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TasksMain"
        component={TasksScreen}
        options={({ navigation }) => getHeaderOptions(t('tasks'), navigation)}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: t('settings'), headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: t('profile'), headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
      <Stack.Screen name="Language" component={LanguageScreen} options={{ title: t('language'), headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ title: t('notifications'), headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
      <Stack.Screen name="About" component={AboutScreen} options={{ title: t('about'), headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
      <Stack.Screen name="Reset" component={ResetScreen} options={{ title: t('reset'), headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
    </Stack.Navigator>
  );
}

// Stack Navigator for Learn tab
function LearnStack() {
  const { t } = useLanguage();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LearnMain"
        component={EducationScreen}
        options={({ navigation }) => getHeaderOptions(t('learn'), navigation)}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: t('settings'), headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: t('profile'), headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
      <Stack.Screen name="Language" component={LanguageScreen} options={{ title: t('language'), headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ title: t('notifications'), headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
      <Stack.Screen name="About" component={AboutScreen} options={{ title: t('about'), headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
      <Stack.Screen name="Reset" component={ResetScreen} options={{ title: t('reset'), headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
    </Stack.Navigator>
  );
}

// Stack Navigator for Stats tab
function StatsStack() {
  const { t } = useLanguage();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StatsMain"
        component={StatsScreen}
        options={({ navigation }) => getHeaderOptions(t('stats'), navigation)}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: t('settings'), headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: t('profile'), headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
      <Stack.Screen name="Language" component={LanguageScreen} options={{ title: t('language'), headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ title: t('notifications'), headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
      <Stack.Screen name="About" component={AboutScreen} options={{ title: t('about'), headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
      <Stack.Screen name="Reset" component={ResetScreen} options={{ title: t('reset'), headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
    </Stack.Navigator>
  );
}

// Stack Navigator for Shop tab
function ShopStack() {
  const { t } = useLanguage();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ShopMain"
        component={ShopScreen}
        options={({ navigation }) => getHeaderOptions(t('shop'), navigation)}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: t('settings'), headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: t('profile'), headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
      <Stack.Screen name="Language" component={LanguageScreen} options={{ title: t('language'), headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ title: t('notifications'), headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
      <Stack.Screen name="About" component={AboutScreen} options={{ title: t('about'), headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
      <Stack.Screen name="Reset" component={ResetScreen} options={{ title: t('reset'), headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
    </Stack.Navigator>
  );
}

// Main Tab Navigator
function MainTabs() {
  const { t } = useLanguage();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Tasks') {
            iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
          } else if (route.name === 'Learn') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Stats') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'Shop') {  
            iconName = focused ? 'cart' : 'cart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#4CAF50',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false, tabBarLabel: t('home') }} />
      <Tab.Screen name="Tasks" component={TasksStack} options={{ headerShown: false, tabBarLabel: t('tasks') }} />
      <Tab.Screen name="Learn" component={LearnStack} options={{ headerShown: false, tabBarLabel: t('learn') }} />
      <Tab.Screen name="Stats" component={StatsStack} options={{ headerShown: false, tabBarLabel: t('stats') }} />
      <Tab.Screen name="Shop" component={ShopStack} options={{ headerShown: false, tabBarLabel: t('shop') }} />
    </Tab.Navigator>
  );
}

// Root Stack Navigator
const RootStack = createStackNavigator();

function RootNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('MainApp');

  useEffect(() => {
    bootstrap();
  }, []);

  const bootstrap = async () => {
    try {
      const onboarded = await AsyncStorage.getItem('onboarded');
      
      // If not onboarded, show onboarding screen
      if (!onboarded) {
        setInitialRoute('OnboardingPet');
      } else {
        setInitialRoute('MainApp');
      }
    } catch (error) {
      console.error('Error during bootstrap:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4CAF50' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {initialRoute === 'OnboardingPet' ? (
        <>
          <RootStack.Screen name="OnboardingPet" component={OnboardingPetScreen} />
          <RootStack.Screen name="MainApp" component={MainTabs} />
        </>
      ) : (
        <>
          <RootStack.Screen name="MainApp" component={MainTabs} />
          <RootStack.Screen name="OnboardingPet" component={OnboardingPetScreen} />
        </>
      )}
    </RootStack.Navigator>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <PetProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <RootNavigator />
        </NavigationContainer>
      </PetProvider>
    </LanguageProvider>
  );
}
