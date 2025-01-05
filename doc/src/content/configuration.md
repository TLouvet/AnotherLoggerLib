## ⚙️ Configuration

ColorLogger is designed to work out of the box with sensible defaults. However, you can customize almost everything to fit your needs.

### 1.Default Configuration

If you don't configure anything, this is what you start with automatically.

```typescript
Logger.config({
  showLevelPrefix: true,
  active: true,
  timestamp: {
    active: true,
    lang: 'en',
  },
  levels: {
    info: { active: true, prefix: '[INFO]', color: '\x1b[36m', bg: '' },
    success: { active: true, prefix: '[SUCCESS]', color: '\x1b[32m', bg: '' },
    warning: { active: true, prefix: '[WARNING]', color: '\x1b[33m', bg: '' },
    error: { active: true, prefix: '[ERROR]', color: '\x1b[31m', bg: '' },
    critical: { active: true, prefix: '[CRITICAL]', color: '\x1b[35m', bg: '' },
  },
});
```

#### LoggerConfig Structure

```typescript
{
  showLevelPrefix: boolean; // Whether to display level prefixes (e.g., [INFO], [ERROR])
  active: boolean;          // Enable or disable the Logger.
  timestamp: {
    active: boolean;        // Enable or disable timestamps
    lang: string;           // Language for timestamps (e.g., 'en', 'fr', 'es')
  };
  levels: {
    info: {
      active: boolean;      // Enable or disable info logs
      prefix: string;       // Prefix for info logs
      color: string | [number, number, number];        // Text color (ANSI, Hex, RGB)
      bg?: string | [number, number, number];          // Optional background color
    };
    success: { ... };        // Same structure as "info"
    warning: { ... };        // Same structure as "info"
    error: { ... };          // Same structure as "info"
    critical: { ... };       // Same structure as "info"
  };
}
```

---

### 2.Config Function

`config(options: DeepPartial<LoggerConfig>)`

Configures the Logger with custom settings. This method allows you to adjust the colors, prefixes, and timestamps for all log levels.

The `LoggerConfig` object defines the structure for all configurable options in the Logger. Here's what it includes:

You can provide partial configurations using `DeepPartial`, and the Logger will merge your configuration with its defaults.

#### Examples

```typescript
// Example: Disabling info logs and customizing the other colors
Logger.config({
  levels: {
    info: { active: false },
    success: { color: '#00ff00' },
    warning: { color: '\x1b[38;2;255;165;0m' }, // Orange for warnings
    error: { color: [255, 0, 0] },
  },
});

// Example: Customizing timestamps
Logger.config({
  timestamp: {
    active: true,
    lang: 'fr', // Display timestamps in French
  },
});
```

---

### 3.Enabling and disabling globally - v0.5+

You can choose to enable or disable the entire logger with these two functions. When disabled, any call to the logger will not yield any result.

```typescript
Logger.enable();
Logger.disable(); // any call to Logger.[loglevel] will not produce any output
```

Note that you can achieve the same via the `Logger.config({active: false})`, which might even be more useful when deciding to activate it for development mode only for example.

```typescript
// No more "don't forget to remove your console.log before submitting that PR"
Logger.config({
  active: process.env.NODE_ENV === 'development',
});
```

---

### 4.Using a predefined Color Palette

Quickly switch between predefined color palettes. Available palettes include `common` and `trueColor`.

By default, `common` is used for maximum compatibility, however most of the terminals should accept the `trueColor` version (and the browser console definitely will).

```typescript
Logger.usePalette('trueColor');
```

For reference, here are the ANSI colors used in the trueColor version:

```typescript
  info: '\x1b[38;2;0;255;255m',
  success: '\x1b[38;2;72;255;165m',
  warning: '\x1b[38;2;255;165;0m',
  error: '\x1b[38;2;244;67;54m',
  critical: '\x1b[38;2;255;0;255m',
```

More info available on the colors page.
