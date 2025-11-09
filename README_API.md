# API Key Setup

## Groq API Key Configuration

To use the AI chatbot feature, you need to add your Groq API key.

### Steps:

1. **Get your Groq API key** from [https://console.groq.com/](https://console.groq.com/)

2. **Create the config file:**
   - Copy `config/api.example.js` to `config/api.js`
   - Or create `config/api.js` manually

3. **Add your API key:**
   ```javascript
   export const GROQ_API_KEY = 'your-actual-api-key-here';
   ```

4. **Verify it's gitignored:**
   - The file `config/api.js` is already in `.gitignore`
   - This ensures your API key won't be committed to GitHub

### Security Notes:

- ✅ `config/api.js` is in `.gitignore` - your key is safe
- ✅ Never commit your actual API key
- ✅ The example file (`api.example.js`) is safe to commit

### Testing:

After adding your API key, restart the Expo development server:
```bash
npm start
```

Then try asking the AI assistant a question about climate change!

