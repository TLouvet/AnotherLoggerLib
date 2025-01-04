# 🌈 ColorLogger: Say Goodbye to Boring `console.log("here")`!

Are you tired of writing **`console.log("here")`** and feeling like your logs are lost in the dark abyss of your terminal? Say hello to **ColorLogger**, your new best friend for console logging! 🥳

This lightweight, easy-to-use logger will change your life (or at least your logging experience). Add **colors**, **log levels**, and a touch of **style** to your console outputs! Works like magic in both **Node.js** and the **browser**. ✨

P.S: Does not replace a debugging session with the debugger.

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

Install via npm or yarn:

```bash
npm install @cptn-tlouvet/color-logger
yarn add @cptn-tlouvet/color-logger
```

### 📚 **Getting Started**

#### Import the Logger

```typescript
import { Logger } from '@cptn-tlouvet/color-logger';

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
    info: { active: true, prefix: '[INFO]', color: '\x1b[36m' },
    success: { active: true, prefix: '[SUCCESS]', color: '\x1b[32m' },
    warning: { active: true, prefix: '[WARNING]', color: '\x1b[33m' },
    error: { active: true, prefix: '[ERROR]', color: '\x1b[31m' },
    critical: { active: true, prefix: '[CRITICAL]', color: '\x1b[35m' },
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
    warn: { color: '#FFFF00' }, // Change the color
  },
  timestamp: {
    lang: 'fr', // Display timestamps in French (baguette not included)
    active: true, // Enable/disable timestamps
  },
  showLevelPrefix: false, // Enable/disable prefix
});
```

### 🎨 **Color Customization**

ColorLogger uses ANSI escape codes for coloring your logs. You can customize the colors for each log level by modifying the `color` property in the configuration.
The initial configuration comes equiped with 2 default palettes. One with Common ANSI Color Codes, one with TrueColor codes. To ensure maximum compatibility, the
Common ANSI palette is used, but switching is easy (v0.2.1+):

```typescript
Logger.usePalette('trueColor');
// Alternatively, to go back to the standard palette:
Logger.usePalette('common');
```

#### Common ANSI Color Codes

These colors should work with every terminal

| Color   | Code       |
| ------- | ---------- |
| Black   | `\x1b[30m` |
| Red     | `\x1b[31m` |
| Green   | `\x1b[32m` |
| Yellow  | `\x1b[33m` |
| Blue    | `\x1b[34m` |
| Magenta | `\x1b[35m` |
| Cyan    | `\x1b[36m` |
| White   | `\x1b[37m` |

#### TrueColor

It is possible to have more detailed colors with the TrueColor system which works as follows: `\x1b[38;2;${red};${green};${blue}m`.

For each color, set an input between 0 and 255. For reference, here are the basic colors translated with this system:

| Color   | Code                     |
| ------- | ------------------------ |
| Black   | `\x1b[38;2;0;0;0m`       |
| Red     | `\x1b[38;2;255;0;0m`     |
| Green   | `\x1b[38;2;0;255;0m`     |
| Yellow  | `\x1b[38;2;255;255;0m`   |
| Blue    | `\x1b[38;2;0;0;255m`     |
| Magenta | `\x1b[38;2;255;0;255m`   |
| Cyan    | `\x1b[38;2;0;255;255m`   |
| White   | `\x1b[38;2;255;255;255m` |

Please note that depending on where you use the package (browser vs terminal), it is possible that TrueColor is not accepted (I'm looking at you old Powershell)

#### Hex Color (v0.2+)

Let's face it, ANSI system is probably not something we use a lot. There is also a great chance that you use this package in a frontend context or with a modern enough terminal, so you'll be looking at something that, as stated previously, supports TrueColor ANSI 24 bits. And the good news is: we can easily convert Hex to TrueColor, since we can convert Hex to RGB and then place this RGB into our ANSI TrueColor code.

You can opt to use colors in a hex format instead of an ANSI escape code. Here are the same basic colors, translated in Hex:

| Color   | Code      |
| ------- | --------- |
| Black   | `#000000` |
| Red     | `#FF0000` |
| Green   | `#00FF00` |
| Yellow  | `#FFFF00` |
| Blue    | `#0000FF` |
| Magenta | `#FF00FF` |
| Cyan    | `#00FFFF` |
| White   | `#FFFFFF` |

### RGB Color (v0.3+) -- Coming Soon

The TrueColor system works as follows: `\x1b[38;2;${red};${green};${blue}m` so when we use Hex colors, we first transform them into their RGB versions and then create the
TrueColor value associated.

Naturally, you can bypass this step by using RGB system for your colors in the first place. The expected syntax is an array with 3 entries corresponding to red, green and blue.

For reference, here are the inputs for the basic colors:

| Color   | Code            |
| ------- | --------------- |
| Black   | `[0,0,0]`       |
| Red     | `[255,0,0]`     |
| Green   | `[0,255,0]`     |
| Yellow  | `[255,255,0]`   |
| Blue    | `[0,0,255]`     |
| Magenta | `[255,0,255]`   |
| Cyan    | `[0,255,255]`   |
| White   | `[255,255,255]` |

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
