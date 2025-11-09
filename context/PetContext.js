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
  const [coins, setCoins] = useState(250);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [litterPicked, setLitterPicked] = useState(0);
  const [waterSaved, setWaterSaved] = useState(0);
  const [co2Reduced, setCo2Reduced] = useState(0);
  const [itemsRecycled, setItemsRecycled] = useState(0);

  // Load data from storage on mount
  useEffect(() => {
    loadPetData();
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    savePetData();
  }, [exp, level, petStage, petName, totalTasksCompleted, tasksToday, lastTaskDate, coins, litterPicked, waterSaved, co2Reduced, itemsRecycled]);

  // Update level and stage based on EXP
  useEffect(() => {
    const newLevel = Math.floor(exp / 100) + 1;
    if (newLevel !== level && newLevel > level) {
      setLevel(newLevel);
      setShowLevelUp(true);
      // Hide animation after 2 seconds (slightly longer than animation)
      setTimeout(() => {
        setShowLevelUp(false);
      }, 2000);
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
        setCoins(parsed.coins !== undefined ? parsed.coins : 250);
        setLitterPicked(parsed.litterPicked || 0);
        setWaterSaved(parsed.waterSaved || 0);
        setCo2Reduced(parsed.co2Reduced || 0);
        setItemsRecycled(parsed.itemsRecycled || 0);
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
        coins,
        litterPicked,
        waterSaved,
        co2Reduced,
        itemsRecycled,
      };
      await AsyncStorage.setItem('petData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving pet data:', error);
    }
  };

  const addExp = (amount) => {
    setExp(prev => prev + amount);
  };

  const completeTask = (expAmount, taskId) => {
    const today = new Date().toDateString();
    if (lastTaskDate !== today) {
      setTasksToday(1);
      setLastTaskDate(today);
    } else {
      setTasksToday(prev => prev + 1);
    }
    setTotalTasksCompleted(prev => prev + 1);
    addExp(expAmount);
    // Award coins: 5 coins for every 100 EXP (1 coin per 20 EXP)
    const coinsToAward = Math.floor((expAmount / 100) * 5);
    if (coinsToAward > 0) {
      addCoins(coinsToAward);
    }
    
    // Track actual environmental impact based on task ID
    // Task IDs: 1=Pick Up Litter, 2=Save Water, 3=Recycle, 4=Reusable Bag, 5=Walk/Bike, 6=Turn Off Lights, 7=Plant Tree, 8=Meatless Meal
    if (taskId === 1) {
      // Pick Up Litter: 5 pieces per task
      setLitterPicked(prev => prev + 5);
    } else if (taskId === 2) {
      // Save Water: ~5 gallons per shorter shower
      setWaterSaved(prev => prev + 5);
    } else if (taskId === 3) {
      // Recycle Properly: 3 items per task
      setItemsRecycled(prev => prev + 3);
    } else if (taskId === 5) {
      // Walk or Bike: ~2kg CO2 reduced per trip
      setCo2Reduced(prev => prev + 2);
    } else if (taskId === 7) {
      // Plant a Tree: ~10kg CO2 reduced over time
      setCo2Reduced(prev => prev + 10);
    } else if (taskId === 8) {
      // Meatless Meal: ~2kg CO2 reduced per meal
      setCo2Reduced(prev => prev + 2);
    }
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

  const spendCoins = (amount) => {
    let success = false;
    setCoins(prev => {
      if (prev >= amount) {
        success = true;
        return prev - amount;
      }
      return prev;
    });
    return success;
  };

  const addCoins = (amount) => {
    setCoins(prev => prev + amount);
  };

  const value = {
    exp,
    level,
    petStage,
    petName,
    totalTasksCompleted,
    tasksToday,
    coins,
    showLevelUp,
    litterPicked,
    waterSaved,
    co2Reduced,
    itemsRecycled,
    addExp,
    completeTask,
    renamePet,
    expToNextLevel,
    expProgress,
    spendCoins,
    addCoins,
  };

  return <PetContext.Provider value={value}>{children}</PetContext.Provider>;
};

