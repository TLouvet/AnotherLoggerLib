import { LoggerConfig, RGBColor } from './types';

export const defaultPalette: Record<string, Record<string, string | RGBColor>> = {
  common: {
    info: '\x1b[36m', // Cyan
    success: '\x1b[32m', // Green
    warning: '\x1b[33m', // Yellow
    error: '\x1b[31m', // Red
    critical: '\x1b[35m', // Magenta
  },
  trueColor: {
    info: '\x1b[38;2;0;255;255m',
    success: '\x1b[38;2;72;255;165m',
    warning: '\x1b[38;2;255;165;0m',
    error: '\x1b[38;2;244;67;54m',
    critical: '\x1b[38;2;255;0;255m',
  },
};

export const defaultLoggerConfig: LoggerConfig = {
  showLevelPrefix: true,
  active: true,
  timestamp: {
    lang: 'en',
    active: true,
  },
  levels: {
    info: {
      active: true,
      prefix: '[INFO]',
      color: defaultPalette.common.info,
      bg: '',
    },
    success: {
      active: true,
      prefix: '[SUCCESS]',
      color: defaultPalette.common.success,
      bg: '',
    },
    warning: {
      active: true,
      prefix: '[WARNING]',
      color: defaultPalette.common.warning,
      bg: '',
    },
    error: {
      active: true,
      prefix: '[ERROR]',
      color: defaultPalette.common.error,
      bg: '',
    },
    critical: {
      active: true,
      prefix: '[CRITICAL]',
      color: defaultPalette.common.critical,
      bg: '',
    },
  },
} as const;
