/**
 * The idea of this (as of yet) useless class is to integrate some
 * form of error reporting toll such as sentry later
 */
export interface Logger {
  debug: (msg: string) => void;
  info: (msg: string) => void;
  warn: (msg: string) => void;
  error: (msg: string) => void;
}

class LoggerImpl implements Logger {
  debug(msg: string): void {
    console.debug(msg);
  }

  info(msg: string): void {
    console.info(msg);
  }

  warn(msg: string): void {
    console.warn(msg);
  }

  public error(msg: string): void {
    console.error(msg);
  }
}

export const log = new LoggerImpl();

export default log;
