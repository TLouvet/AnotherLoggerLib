## 📖 Logger Levels

The Logger class provides several public methods to handle logging efficiently. Below is a list of all available logging functions, with explanations and usage examples.

### Log Levels

Log levels are predefined functions for structured logging. Each level can be customized in the configuration:

- `info(message: string)`: For general information.
- `success(message: string)`: For successful operations.
- `warn(message: string)`: For warnings.
- `error(message: string)`: For errors.
- `critical(message: string)`: For critical alerts.

```typescript
Logger.info('This is an informational message.');
Logger.success('This operation was successful!');
Logger.warn('This is a warning!');
Logger.error('Something went wrong.');
Logger.critical('🚨 Critical error!');
```

### `neutral(message: string)`

Logs a neutral message without any colors or formatting, similar to `console.log`. When you want to have the original console.log without any style attached.

```typescript
Logger.neutral('This is a neutral log message.');
```
