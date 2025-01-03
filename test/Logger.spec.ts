import { beforeEach, describe, vi, it, expect, afterEach } from 'vitest';
import { Logger } from '../src/index';
import { defaultLoggerConfig } from '../src/defaultConfig';

describe('Logger with default console.log', () => {
  beforeEach(() => {
    console.log = (arg: string) => {};
    vi.spyOn(console, 'log');
  });

  it('should log from console', () => {
    Logger.info('Hello world');
    Logger.warn('Hello world');
    Logger.error('Hello world');
    Logger.critical('Hello world');
    Logger.success('Hello world');

    expect(console.log).toHaveBeenCalledTimes(5);
  });

  it('should not log a non activated level', () => {
    Logger.config({
      levels: {
        info: {
          active: false,
        },
      },
    });

    Logger.info('Hello world');
    Logger.warn('Hello world');
    Logger.error('Hello world');
    Logger.critical('Hello world');
    Logger.success('Hello world');

    expect(console.log).toHaveBeenCalledTimes(4);
  });

  afterEach(() => {
    vi.resetAllMocks();
    Logger.config(defaultLoggerConfig);
  });
});
