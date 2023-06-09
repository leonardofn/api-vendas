/* eslint-disable no-console */
import { AbstractLogger, LogLevel, LogMessage } from 'typeorm';

export default class CustomLogger extends AbstractLogger {
  protected writeLog(
    level: LogLevel,
    message: string | number | LogMessage | (string | number | LogMessage)[]
  ): void {
    console.info('logLevel', level);
    console.info('logMessage', message);
  }

  logQuery(query: string): void {
    console.info('logQuery 🔎: ', query);
  }
}
