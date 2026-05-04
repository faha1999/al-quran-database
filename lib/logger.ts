type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private static instance: Logger;

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(level: LogLevel, message: string, context?: any): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` | Context: ${JSON.stringify(context)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
  }

  public info(message: string, context?: any) {
    console.log(this.formatMessage('info', message, context));
  }

  public warn(message: string, context?: any) {
    console.warn(this.formatMessage('warn', message, context));
  }

  public error(message: string, context?: any) {
    console.error(this.formatMessage('error', message, context));
  }

  public debug(message: string, context?: any) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(this.formatMessage('debug', message, context));
    }
  }
}

export const logger = Logger.getInstance();
