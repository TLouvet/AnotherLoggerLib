import { LoggerConfig } from './types';

export const defaultLoggerConfig: LoggerConfig = {
  showLevelPrefix: true,
  timestamp: {
    lang: 'en',
    active: true,
  },
  levels: {
    info: {
      active: true,
      prefix: '[INFO]',
      color: '\x1b[34m',
    },
    success: {
      active: true,
      prefix: '[SUCCESS]',
      color: '\x1b[32m',
    },
    warning: {
      active: true,
      prefix: '[WARNING]',
      color: '\x1b[33m',
    },
    error: {
      active: true,
      prefix: '[ERROR]',
      color: '\x1b[31m',
    },
    critical: {
      active: true,
      prefix: '[CRITICAL]',
      color: '\x1b[38;2;255;0;255m',
    },
  },
} as const;
