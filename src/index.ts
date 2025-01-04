import { defaultLoggerConfig, defaultPalette } from './defaultConfig';
import { LoggerConfig, RGBColor } from './types';
import { deepMerge, DeepPartial, hexToAnsi, isHexColor, rgbToAnsiTrueColor } from './utils';

enum ELogLevel {
  WARNING = 'warning',
  INFO = 'info',
  ERROR = 'error',
  SUCCESS = 'success',
  CRITICAL = 'critical',
}

export class Logger {
  private static _config: LoggerConfig = defaultLoggerConfig;

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

    return this;
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
    if (!this.isLevelActive(level)) {
      return;
    }

    console.log(this.colorize(level, this.formatTextMessage(level, message)));
  }

  private static isLevelActive(level: ELogLevel) {
    return this._config.levels[level].active;
  }

  private static colorize(level: ELogLevel, message: string): string {
    const { color, bg } = this._config.levels[level];

    const formattedColor = this.formatColor(color);
    const formattedBG = this.formatColor(bg);

    return `${formattedBG}${formattedColor}${message}\x1b[0m`;
  }

  private static formatColor(color: string | RGBColor = '') {
    if (Array.isArray(color)) {
      return rgbToAnsiTrueColor(...color);
    }

    if (isHexColor(color)) {
      return hexToAnsi(color);
    }

    return color;
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
