import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PetContext = createContext();

export const usePet = () => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error('usePet must be used within a PetProvider');
  }
  return context;
};

export const PetProvider = ({ children }) => {
  const [exp, setExp] = useState(0);
  const [level, setLevel] = useState(1);
  const [petStage, setPetStage] = useState('egg'); // egg, baby, teen, adult
  const [petName, setPetName] = useState('EcoBuddy');
  const [totalTasksCompleted, setTotalTasksCompleted] = useState(0);
  const [tasksToday, setTasksToday] = useState(0);
  const [lastTaskDate, setLastTaskDate] = useState(null);

  // Load data from storage on mount
  useEffect(() => {
    loadPetData();
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    savePetData();
  }, [exp, level, petStage, petName, totalTasksCompleted, tasksToday, lastTaskDate]);

  // Update level and stage based on EXP
  useEffect(() => {
    const newLevel = Math.floor(exp / 100) + 1;
    if (newLevel !== level) {
      setLevel(newLevel);
    }

    // Determine pet stage based on level
    let newStage = 'egg';
    if (level >= 5) newStage = 'adult';
    else if (level >= 3) newStage = 'teen';
    else if (level >= 2) newStage = 'baby';

    if (newStage !== petStage) {
      setPetStage(newStage);
    }
  }, [exp, level]);

  // Reset daily tasks if it's a new day
  useEffect(() => {
    const today = new Date().toDateString();
    if (lastTaskDate !== today) {
      setTasksToday(0);
      setLastTaskDate(today);
    }
  }, []);

  const loadPetData = async () => {
    try {
      const data = await AsyncStorage.getItem('petData');
      if (data) {
        const parsed = JSON.parse(data);
        setExp(parsed.exp || 0);
        setLevel(parsed.level || 1);
        setPetStage(parsed.petStage || 'egg');
        setPetName(parsed.petName || 'EcoBuddy');
        setTotalTasksCompleted(parsed.totalTasksCompleted || 0);
        setTasksToday(parsed.tasksToday || 0);
        setLastTaskDate(parsed.lastTaskDate || null);
      }
    } catch (error) {
      console.error('Error loading pet data:', error);
    }
  };

  const savePetData = async () => {
    try {
      const data = {
        exp,
        level,
        petStage,
        petName,
        totalTasksCompleted,
        tasksToday,
        lastTaskDate,
      };
      await AsyncStorage.setItem('petData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving pet data:', error);
    }
  };

  const addExp = (amount) => {
    setExp(prev => prev + amount);
  };

  const completeTask = (expAmount) => {
    const today = new Date().toDateString();
    if (lastTaskDate !== today) {
      setTasksToday(1);
      setLastTaskDate(today);
    } else {
      setTasksToday(prev => prev + 1);
    }
    setTotalTasksCompleted(prev => prev + 1);
    addExp(expAmount);
  };

  const renamePet = (newName) => {
    setPetName(newName);
  };

  const expToNextLevel = () => {
    return (level * 100) - exp;
  };

  const expProgress = () => {
    const currentLevelExp = (level - 1) * 100;
    const nextLevelExp = level * 100;
    const expInCurrentLevel = exp - currentLevelExp;
    const expNeededForLevel = nextLevelExp - currentLevelExp;
    return (expInCurrentLevel / expNeededForLevel) * 100;
  };

  const value = {
    exp,
    level,
    petStage,
    petName,
    totalTasksCompleted,
    tasksToday,
    addExp,
    completeTask,
    renamePet,
    expToNextLevel,
    expProgress,
  };

  return <PetContext.Provider value={value}>{children}</PetContext.Provider>;
};

