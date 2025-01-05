import { defaultLoggerConfig, defaultPalette } from './defaultConfig';
import { LoggerConfig } from './types';
import { deepMerge, DeepPartial } from './utils';
import { AnsiColorFormatter } from './colors';

enum ELogLevel {
  WARNING = 'warning',
  INFO = 'info',
  ERROR = 'error',
  SUCCESS = 'success',
  CRITICAL = 'critical',
}

export class Logger {
  private static _config: LoggerConfig = defaultLoggerConfig;
  private static readonly colorFormatter = new AnsiColorFormatter();

  private constructor() {}

  static config(options: DeepPartial<LoggerConfig>) {
    this._config = deepMerge(this._config, options);
  }

  static usePalette(palette: string) {
    const colorPalette = defaultPalette[palette];

    if (!colorPalette) {
      return;
    }

    this.config({
      levels: {
        info: { color: colorPalette.info },
        warning: { color: colorPalette.warning },
        error: { color: colorPalette.error },
        success: { color: colorPalette.success },
        critical: { color: colorPalette.critical },
      },
    });
  }

  static disable() {
    this._config.active = false;
  }

  static enable() {
    this._config.active = true;
  }

  static neutral(message: string) {
    console.log(message);
  }

  static info(message: string) {
    this.log(ELogLevel.INFO, message);
  }

  static success(message: string) {
    this.log(ELogLevel.SUCCESS, message);
  }

  static error(message: string) {
    this.log(ELogLevel.ERROR, message);
  }

  static warn(message: string) {
    this.log(ELogLevel.WARNING, message);
  }

  static critical(message: string) {
    this.log(ELogLevel.CRITICAL, message);
  }

  private static log(level: ELogLevel, message: string) {
    if (!this._config.active || !this.isLevelActive(level)) {
      return;
    }

    const { color, bg } = this._config.levels[level];
    console.log(this.colorFormatter.colorize(this.formatTextMessage(level, message), color, bg));
  }

  private static isLevelActive(level: ELogLevel) {
    return this._config.levels[level].active;
  }

  private static formatTextMessage(level: ELogLevel, message: string) {
    const baseMessage = `${this.timestamp()} ${message}`;

    if (!this._config.showLevelPrefix) {
      return baseMessage;
    }

    return `${this.prefix(level)} | ${baseMessage}`;
  }

  private static timestamp() {
    if (!this._config.timestamp.active) {
      return '';
    }

    return `${new Date().toLocaleString(this._config.timestamp.lang)} | `;
  }

  private static prefix(level: ELogLevel) {
    return this._config.levels[level].prefix;
  }
}
