# 🌈 ColorLogger: Say Goodbye to Boring `console.log("here")`!

Are you tired of writing **`console.log("here")`** and feeling like your logs are lost in the dark abyss of your terminal? Say hello to **ColorLogger**, your new best friend for console logging! 🥳

This lightweight, easy-to-use logger will change your life (or at least your logging experience). Add **colors**, **log levels**, and a touch of **style** to your console outputs! Works like magic in both **Node.js** and the **browser**. ✨

---

## Why ColorLogger?

- 🎨 **Colors, baby!** Make your logs pop with vibrant colors for each level.
- 🚦 **Structured log levels:** Organize your logs with `info`, `success`, `warning`, `error`, and `critical`.
- 🕒 **Timestamps? Yes, please!** Add a configurable timestamp to your logs.
- 💼 **Front-end or back-end?** Works everywhere—Node.js or the browser.
- 🎯 **Configurable:** Want to turn off a level? Customize prefixes? Disable timestamps? We've got you covered.
- 🤖 **Minimalistic:** No dependencies, just pure logging goodness.

---

## Installation

Install via npm:

```bash
npm install @tlouvet/color-logger
```

### 📚 **Getting Started**

#### Import the Logger

```typescript
import { Logger } from '@your-username/color-logger';

Logger.info("Here's some information!");
Logger.success('Woohoo! Everything worked!');
Logger.warn('Careful now, this is a warning.');
Logger.error('Uh oh, something went wrong.');
Logger.critical('🚨 This is critical!');
```

✨ Your terminal will thank you with organized, colorful logs! 🌈

### ⚙️ Configuration

#### Default Configuration

Here's the default configuration out of the box:

```typescript
Logger.config({
  showLevelPrefix: true,
  timestamp: {
    active: true,
    lang: 'en', // Locale for the timestamp
  },
  levels: {
    info: { active: true, prefix: '[INFO]', color: '\x1b[34m' }, // Blue
    success: { active: true, prefix: '[SUCCESS]', color: '\x1b[32m' }, // Green
    warning: { active: true, prefix: '[WARNING]', color: '\x1b[33m' }, // Yellow
    error: { active: true, prefix: '[ERROR]', color: '\x1b[31m' }, // Red
    critical: { active: true, prefix: '[CRITICAL]', color: '\x1b[31m' }, // Red
  },
});
```

#### Customize What You Need

Adjust the configuration to fit your needs:

```typescript
Logger.config({
  levels: {
    info: { active: false }, // Turn off info logs - who reads them anyway ?
    error: { prefix: '[ERR]' }, // Customize prefix
  },
  timestamp: {
    lang: 'fr', // Display timestamps in French
    active: true, // Enable/disable timestamps
  },
  showLevelPrefix: false, // Disable prefix if you don't want to see them
});
```

### Example Output

With the default settings, your logs might look like this (and with colors, but I'm terrible with Markdown):

```text
[INFO] | 01/03/2025, 10:00:00 | Here's some information!
[SUCCESS] | 01/03/2025, 10:00:01 | Woohoo! Everything worked!
[WARNING] | 01/03/2025, 10:00:02 | Careful now, this is a warning.
[ERROR] | 01/03/2025, 10:00:03 | Uh oh, something went wrong.
[CRITICAL] | 01/03/2025, 10:00:04 | 🚨 This is critical!
```

### License

MIT License. Use it, love it, share it! ❤️
