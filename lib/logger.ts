type LogLevel = 'info' | 'warn' | 'error' | 'debug';
type LogContext = Record<string, unknown> | undefined;

class Logger {
  private static instance: Logger;

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` | Context: ${JSON.stringify(context)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
  }

  public info(message: string, context?: LogContext) {
    console.log(this.formatMessage('info', message, context));
  }

  public warn(message: string, context?: LogContext) {
    console.warn(this.formatMessage('warn', message, context));
  }

  public error(message: string, context?: LogContext) {
    console.error(this.formatMessage('error', message, context));
  }

  public debug(message: string, context?: LogContext) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(this.formatMessage('debug', message, context));
    }
  }
}

export const logger = Logger.getInstance();
