import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import TasksScreen from './screens/TasksScreen';
import EducationScreen from './screens/EducationScreen';
import StatsScreen from './screens/StatsScreen';
import ShopScreen from './screens/ShopScreen';
import SettingsScreen from './screens/SettingsScreen';
import { PetProvider } from './context/PetContext';

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
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={({ navigation }) => getHeaderOptions('Home', navigation)}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}

// Stack Navigator for Tasks tab
function TasksStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TasksMain"
        component={TasksScreen}
        options={({ navigation }) => getHeaderOptions('Tasks', navigation)}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}

// Stack Navigator for Learn tab
function LearnStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LearnMain"
        component={EducationScreen}
        options={({ navigation }) => getHeaderOptions('Learn', navigation)}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}

// Stack Navigator for Stats tab
function StatsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StatsMain"
        component={StatsScreen}
        options={({ navigation }) => getHeaderOptions('Stats', navigation)}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}

// Stack Navigator for Shop tab
function ShopStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ShopMain"
        component={ShopScreen}
        options={({ navigation }) => getHeaderOptions('Shop', navigation)}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <PetProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
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
          <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
          <Tab.Screen name="Tasks" component={TasksStack} options={{ headerShown: false }} />
          <Tab.Screen name="Learn" component={LearnStack} options={{ headerShown: false }} />
          <Tab.Screen name="Stats" component={StatsStack} options={{ headerShown: false }} />
          <Tab.Screen name="Shop" component={ShopStack} options={{ headerShown: false }} />
        </Tab.Navigator>
      </NavigationContainer>
    </PetProvider>
  );
}
