export type LoggerConfig = {
  timestamp: {
    lang: string;
    active: boolean;
  };
  showLevelPrefix: boolean;
  levels: LogLevels;
};

type LogLevels = Record<LogLevel, LogConfig>;

type LogLevel = 'info' | 'success' | 'warning' | 'error' | 'critical';

type LogConfig = {
  color: string;
  active: boolean;
  prefix: string;
};
