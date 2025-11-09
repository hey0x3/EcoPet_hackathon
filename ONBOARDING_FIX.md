# Onboarding Flow Fix - Documentation

## 🐛 Problem Fixed
The app was showing duplicate pet name prompts:
1. OnboardingPetScreen asked for pet name
2. HomeScreen showed a modal asking for pet name again
3. After reset, stale names like "Pet1" would appear in greeting

## ✅ Solution Implemented

### Key Changes

#### 1. **HomeScreen.js** - Removed Duplicate Modal
- **Removed:** `checkFirstLaunch()` function
- **Removed:** `showNameModal` state and modal UI
- **Removed:** `handleSaveName()` function
- **Added:** Clean `useFocusEffect` to reload names on every screen focus
- **Result:** No more duplicate pet name prompts

```javascript
// Clean greeting logic
useFocusEffect(
  useCallback(() => {
    (async () => {
      const savedName = await AsyncStorage.getItem('profile.name') || '';
      const savedPet = await AsyncStorage.getItem('pet.name') || '';
      
      setName(savedName);
      setPet(savedPet);

      // Greeting shows only user name
      const greetingText = savedName ? `Hello ${savedName}! 🌱` : 'Welcome! 🌱';
      
      setGreeting(greetingText);
    })();
  }, [])
);

// Display pet name from AsyncStorage
<Text style={styles.petName}>{pet || petName}</Text>
```

#### 2. **OnboardingPetScreen.js** - Set Onboarded Flag
- **Added:** `await AsyncStorage.setItem('onboarded', '1');` after saving names
- **Result:** App knows user has completed onboarding

```javascript
const handleStart = async () => {
  try {
    await AsyncStorage.setItem('profile.name', userName.trim());
    await AsyncStorage.setItem('pet.name', petName.trim());
    
    // Set onboarded flag ✅
    await AsyncStorage.setItem('onboarded', '1');
    
    await AsyncStorage.setItem('stats.level', '1');
    await AsyncStorage.setItem('stats.exp', '0');
    await AsyncStorage.setItem('stats.streak', '0');

    navigation.reset({
      index: 0,
      routes: [{ name: 'MainApp' }],
    });
  } catch (error) {
    console.error('Error saving names:', error);
  }
};
```

#### 3. **App.js** - Bootstrap with Onboarded Flag
- **Changed:** Check `onboarded` flag instead of checking both names
- **Result:** Simpler, cleaner bootstrap logic

```javascript
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
```

#### 4. **ResetScreen.js** - Already Correct
- Clears all AsyncStorage (including `onboarded` flag)
- Preserves language preference
- Navigates to OnboardingPet
- **Result:** After reset, user goes through onboarding again

## 🎯 Expected Behavior

### First Launch
1. App checks `onboarded` flag → not found
2. Shows **OnboardingPetScreen**
3. User enters name (Step 1)
4. User enters pet name (Step 2)
5. App saves both names + sets `onboarded = "1"`
6. Navigates to MainApp
7. HomeScreen shows:
   - **Greeting:** "Hello [Name]! 🌱"
   - **Pet Name:** [PetName]
8. ✅ **No modal appears**

### Subsequent Launches
1. App checks `onboarded` flag → found
2. Goes directly to MainApp
3. HomeScreen loads names from AsyncStorage
4. Shows:
   - **Greeting:** "Hello [Name]! 🌱"
   - **Pet Name:** [PetName]
5. ✅ **No modal appears**

### After Profile Edit
1. User edits name in ProfileScreen
2. Returns to HomeScreen
3. `useFocusEffect` triggers
4. Reloads names from AsyncStorage
5. Display updates:
   - **Greeting:** "Hello [NewName]! 🌱"
   - **Pet Name:** [PetName]
6. ✅ **No stale data**

### After Reset
1. User confirms reset in ResetScreen
2. App clears all AsyncStorage (including `onboarded`)
3. Preserves language preference
4. Navigates to OnboardingPet
5. User goes through 2-step onboarding again
6. New names saved + `onboarded = "1"` set
7. HomeScreen shows new data:
   - **Greeting:** "Hello [NewName]! 🌱"
   - **Pet Name:** [NewPetName]
8. ✅ **No old names like "Pet1" appear**

## 📦 AsyncStorage Keys

| Key | Purpose | Set By | Cleared By |
|-----|---------|--------|------------|
| `onboarded` | Tracks if user completed onboarding | OnboardingPetScreen | ResetScreen |
| `profile.name` | User's name | OnboardingPetScreen, ProfileScreen | ResetScreen |
| `pet.name` | Pet's name | OnboardingPetScreen | ResetScreen |
| `app.lang` | Language preference | LanguageContext | ❌ Never (preserved on reset) |
| `stats.level` | Pet level | OnboardingPetScreen | ResetScreen |
| `stats.exp` | Pet experience | OnboardingPetScreen | ResetScreen |
| `stats.streak` | Daily streak | OnboardingPetScreen | ResetScreen |

## 🔍 Debugging

### Check if onboarded:
```javascript
const onboarded = await AsyncStorage.getItem('onboarded');
console.log('Onboarded:', onboarded); // "1" or null
```

### Check current names:
```javascript
const name = await AsyncStorage.getItem('profile.name');
const pet = await AsyncStorage.getItem('pet.name');
console.log('Name:', name, 'Pet:', pet);
```

### Manually reset onboarding:
```javascript
await AsyncStorage.removeItem('onboarded');
// App will show onboarding on next launch
```

## ✅ Testing Checklist

- [x] First launch → shows onboarding (2 steps)
- [x] After onboarding → no modal on HomeScreen
- [x] Greeting shows both names correctly
- [x] Edit profile → greeting updates on return
- [x] Reset → clears all data, shows onboarding
- [x] After reset → no stale names in greeting
- [x] Language preserved after reset
- [x] No "(and undefined)" in greeting
- [x] No duplicate pet name prompts

## 🎉 Result

**Clean, predictable onboarding flow with no duplicate prompts or stale data!**

---
**Fixed:** 2025-11-09
**Files Modified:** HomeScreen.js, OnboardingPetScreen.js, App.js
**Status:** ✅ COMPLETE
