export type LoggerConfig = {
  timestamp: {
    lang: string;
    active: boolean;
  };
  showLevelPrefix: boolean;
  levels: LogLevels;
};

export type RGBColor = [number, number, number];

type LogLevels = Record<LogLevel, LogConfig>;

type LogLevel = 'info' | 'success' | 'warning' | 'error' | 'critical';

type LogConfig = {
  color: string | RGBColor;
  active: boolean;
  prefix: string;
};
