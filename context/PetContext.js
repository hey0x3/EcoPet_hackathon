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
  const [petStage, setPetStage] = useState('egg');
  const [petName, setPetName] = useState('EcoBuddy');
  const [totalTasksCompleted, setTotalTasksCompleted] = useState(0);
  const [tasksToday, setTasksToday] = useState(0);
  const [lastTaskDate, setLastTaskDate] = useState(null);

  // Yeni eklenen state'ler
  const [consecutiveDaysLogged, setConsecutiveDaysLogged] = useState(0);
  const [hatsCollected, setHatsCollected] = useState(0);
  const [firstTaskDone, setFirstTaskDone] = useState(false);
  const [expPerLevel, setExpPerLevel] = useState(100); // Her level için gereken EXP, başlangıç 100

  // Load data on mount
  useEffect(() => {
    loadPetData();
  }, []);

  useEffect(() => {
    savePetData();
  }, [exp, level, petStage, petName, totalTasksCompleted, tasksToday, lastTaskDate, consecutiveDaysLogged, hatsCollected, firstTaskDone, expPerLevel]);

  // Level ve Stage kontrolü, EXP artırımı ile birlikte
  useEffect(() => {
    let newLevel = level;
    while (exp >= expPerLevel * newLevel) {
      newLevel++;
      // Yeni level atlandığında bir sonraki level için gereken EXP %10 artsın
      setExpPerLevel(prev => Math.floor(prev * 1.1));
    }
    if (newLevel !== level) setLevel(newLevel);

    let newStage = 'egg';
    if (newLevel >= 10) newStage = 'adult';
    else if (newLevel >= 5) newStage = 'teen';
    else if (newLevel >= 2) newStage = 'baby';

    if (newStage !== petStage) setPetStage(newStage);
  }, [exp]);

  useEffect(() => {
    const today = new Date().toDateString();
    if (lastTaskDate !== today) {
      setTasksToday(0);
      setLastTaskDate(today);
      setConsecutiveDaysLogged(prev => prev + 1); // günlük giriş sayısı
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
        setConsecutiveDaysLogged(parsed.consecutiveDaysLogged || 0);
        setHatsCollected(parsed.hatsCollected || 0);
        setFirstTaskDone(parsed.firstTaskDone || false);
        setExpPerLevel(parsed.expPerLevel || 100);
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
        consecutiveDaysLogged,
        hatsCollected,
        firstTaskDone,
        expPerLevel,
      };
      await AsyncStorage.setItem('petData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving pet data:', error);
    }
  };

  // -----------------------------
  // EXP ekleme fonksiyonu (% bonus)
  const addExp = (amount) => {
    const achievementsList = [
      { name: 'First Task', unlocked: firstTaskDone, expBoostPercent: 1 },
      { name: '7 Days Login', unlocked: consecutiveDaysLogged >= 7, expBoostPercent: 2 },
      { name: '5 Hats Collected', unlocked: hatsCollected >= 5, expBoostPercent: 3 },
      { name: 'Level 10 Pet', unlocked: level >= 10, expBoostPercent: 5 },
    ];

    const totalBonusPercent = achievementsList
      .filter(ach => ach.unlocked)
      .reduce((acc, ach) => acc + ach.expBoostPercent, 0);

    const finalExp = amount * (1 + totalBonusPercent / 100);
    setExp(prev => prev + finalExp);
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
    if (!firstTaskDone) setFirstTaskDone(true);
    addExp(expAmount);
  };

  const renamePet = (newName) => setPetName(newName);

  const expToNextLevel = () => {
    return Math.floor(expPerLevel * level - exp);
  };

  const expProgress = () => {
    const currentLevelExp = expPerLevel * (level - 1);
    const nextLevelExp = expPerLevel * level;
    return ((exp - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100;
  };

  const achievements = [
    { name: 'First Task', unlocked: firstTaskDone, expBoostPercent: 1 },
    { name: '7 Days Login', unlocked: consecutiveDaysLogged >= 7, expBoostPercent: 2 },
    { name: '5 Hats Collected', unlocked: hatsCollected >= 5, expBoostPercent: 3 },
    { name: 'Level 10 Pet', unlocked: level >= 10, expBoostPercent: 5 },
  ];

  return (
    <PetContext.Provider value={{
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
      achievements,
      consecutiveDaysLogged,
      hatsCollected,
      expPerLevel
    }}>
      {children}
    </PetContext.Provider>
  );
};
