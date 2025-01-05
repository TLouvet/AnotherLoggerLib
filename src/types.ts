export type LoggerConfig = {
  active: boolean;
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
  bg?: string | RGBColor;
  active: boolean;
  prefix: string;
};
