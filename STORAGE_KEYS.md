# AsyncStorage Keys Reference

## 📋 Complete List of Storage Keys

### App Configuration
| Key | Type | Description | Example |
|-----|------|-------------|---------|
| `app.lang` | string | Current language code | `"en"`, `"tr"`, `"bs"` |
| `onboarded` | string | Onboarding completed flag | `"1"` |

### Onboarding & Profile
| Key | Type | Description | Example |
|-----|------|-------------|---------|
| `pet.name` | string | Pet's name (onboarding) | `"EcoFriend"` |
| `profile.name` | string | User's name | `"John"` |
| `profile.city` | string | User's city | `"Istanbul"` |

### Stats & Progress
| Key | Type | Description | Example |
|-----|------|-------------|---------|
| `stats.level` | string | Current level | `"1"` |
| `stats.exp` | string | Experience points | `"0"` |
| `stats.streak` | string | Daily streak | `"0"` |

### Pet Data (Legacy - from PetContext)
| Key | Type | Description | Structure |
|-----|------|-------------|-----------|
| `petData` | JSON | All pet stats and progress | See below |

#### petData Structure
```json
{
  "exp": 0,
  "level": 1,
  "petStage": "egg",
  "petName": "EcoBuddy",
  "totalTasksCompleted": 0,
  "tasksToday": 0,
  "lastTaskDate": null,
  "consecutiveDaysLogged": 0,
  "hatsCollected": 0,
  "firstTaskDone": false,
  "expPerLevel": 100,
  "coins": 250,
  "litterPicked": 0,
  "waterSaved": 0,
  "co2Reduced": 0,
  "itemsRecycled": 0
}
```

### Settings
| Key | Type | Description | Example |
|-----|------|-------------|---------|
| `notifications.enabled` | string | Daily reminder enabled | `"true"`, `"false"` |

## 🔄 Key Usage by Screen

### OnboardingPetScreen
- **Writes:** `profile.name`, `pet.name`, `onboarded`, `stats.level`, `stats.exp`, `stats.streak`

### ProfileScreen
- **Reads:** `profile.name`, `profile.city`
- **Writes:** `profile.name`, `profile.city`

### HomeScreen
- **Reads:** `pet.name`, `profile.name`, `petData`
- **No writes** (modal removed)

### LanguageScreen
- **Writes:** `app.lang` (via LanguageContext)

### NotificationsScreen
- **Reads:** `notifications.enabled`
- **Writes:** `notifications.enabled`

### ResetScreen
- **Clears:** ALL keys
- **Preserves:** `app.lang` (writes it back after clear)

### App.js (Bootstrap)
- **Reads:** `onboarded` (to determine initial route)

### LanguageContext
- **Reads:** `app.lang` (on mount)
- **Writes:** `app.lang` (on language change)

### PetContext
- **Reads:** `petData` (on mount)
- **Writes:** `petData` (on any state change)

## 🎯 Data Flow

### First Launch
1. Bootstrap checks `onboarded` → not found
2. Shows OnboardingPetScreen
3. User enters name (Step 1)
4. User enters pet name (Step 2)
5. Writes: `profile.name`, `pet.name`, `onboarded`, `stats.level`, `stats.exp`, `stats.streak`
6. Navigates to MainApp

### Subsequent Launches
1. Bootstrap checks `onboarded` → found ("1")
2. Shows MainApp directly
3. HomeScreen loads names via `useFocusEffect`
4. PetContext loads `petData`
5. LanguageContext loads `app.lang`

### Language Change
1. User selects language in LanguageScreen
2. LanguageContext calls `setLang(code)`
3. Writes to `app.lang`
4. Context re-renders → instant UI update

### Profile Update
1. User edits name/city in ProfileScreen
2. Saves to `profile.name` and `profile.city`
3. HomeScreen refreshes on focus
4. Greeting updates with new data

### Reset Flow
1. User confirms reset in ResetScreen
2. Saves current language: `const currentLang = lang`
3. Calls `AsyncStorage.clear()`
4. Writes back: `AsyncStorage.setItem('app.lang', currentLang)`
5. Navigates to OnboardingPet

## 🔍 Debugging Tips

### View all stored data
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

const getAllKeys = async () => {
  const keys = await AsyncStorage.getAllKeys();
  const items = await AsyncStorage.multiGet(keys);
  console.log('All stored data:', items);
};
```

### Clear specific key
```javascript
await AsyncStorage.removeItem('pet.name');
```

### Clear all data (except language)
```javascript
const lang = await AsyncStorage.getItem('app.lang');
await AsyncStorage.clear();
await AsyncStorage.setItem('app.lang', lang);
```

## ⚠️ Important Notes

1. **String values only** - AsyncStorage stores strings, convert numbers/booleans
2. **JSON for complex data** - Use `JSON.stringify()` and `JSON.parse()`
3. **Async operations** - Always use `await` or `.then()`
4. **Error handling** - Wrap in try/catch blocks
5. **Key naming** - Use dot notation for organization (e.g., `app.lang`, `profile.name`)

## 🔐 Data Persistence

- **Persists across app restarts** ✓
- **Survives app updates** ✓
- **Cleared on app uninstall** ✓
- **Not synced to cloud** ✓ (local only)
- **Not encrypted** ⚠️ (don't store sensitive data)

---
**Last Updated:** Implementation Date
**Version:** 1.0.0
