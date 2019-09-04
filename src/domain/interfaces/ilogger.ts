"use strict";

export default interface ILogger {
  debug(message: string, data: any, req?: any): void;
  event(eventLog: any, data: any, req?: any): void;
  issue(eventLog: any, err: Error, req?: any): void;
  fatal(eventLog: any, err: Error, req?: any): void;
  requestLog(eventLog: any, req: any): void;
}