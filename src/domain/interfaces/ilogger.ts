"use strict";

export default interface ILogger {
  debug(message: string, data?: any): void;
  warn(message: string, data?: any): void;
  event(message: string, data?: any): void;
  issue(message: string, err: Error): void;
  requestLog(message: string, data?: any): void;
}