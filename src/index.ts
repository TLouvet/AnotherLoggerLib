import { defaultLoggerConfig, defaultPalette } from './defaultConfig';
import { LoggerConfig } from './types';
import { deepMerge, DeepPartial } from './utils';
import { AnsiColorFormatter } from './colors';
import { MessageFormatter } from './MessageFormatter';

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
  private static readonly messageFormatter = new MessageFormatter();

  private constructor() {}

  static config(options: DeepPartial<LoggerConfig>) {
    this._config = deepMerge(this._config, options);
  }

  static setMaximumDepth(depth: number) {
    this.messageFormatter.setMaxDepth(depth);
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

  static neutral(...list: any[]) {
    if (!this._config.active) {
      return;
    }
    console.log(...list);
  }

  /**
   * Call to console.table, works the same way
   * @link https://developer.mozilla.org/fr/docs/Web/API/console/table_static
   */
  static table(data: any, tableOptions: any) {
    if (!this._config.active) {
      return;
    }

    return console.table(data, tableOptions);
  }

  static info(...list: any[]) {
    this.log(ELogLevel.INFO, ...list);
  }

  static success(...list: any[]) {
    this.log(ELogLevel.SUCCESS, ...list);
  }

  static error(...list: any[]) {
    this.log(ELogLevel.ERROR, ...list);
  }

  static warn(...list: any[]) {
    this.log(ELogLevel.WARNING, ...list);
  }

  static critical(...list: any[]) {
    this.log(ELogLevel.CRITICAL, ...list);
  }

  private static log(level: ELogLevel, ...list: any[]) {
    if (!this._config.active || !this.isLevelActive(level)) {
      return;
    }

    const { color, bg } = this._config.levels[level];
    console.log(this.colorFormatter.colorize(this.formatTextMessage(level, ...list), color, bg));
  }

  private static isLevelActive(level: ELogLevel) {
    return this._config.levels[level].active;
  }

  private static formatTextMessage(level: ELogLevel, ...args: any[]) {
    const timestamp = this.timestamp();
    const message = this.messageFormatter.format(...args);
    const baseMessage = `${timestamp} ${message}`;

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
