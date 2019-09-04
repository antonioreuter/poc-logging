"use strict";

import { Request } from "express";
import * as BunyanLogger from "bunyan";
import Event from "./models/logEvent";

import ILogger from "../domain/interfaces/ilogger";
import LogMessageBuilder from "./logMessageBuilder";
import { LogSeverity } from "./models/logSeverity";
import { LogCategory } from "./models/logCategory";

export default class Logger implements ILogger {
  private logger: BunyanLogger;

  constructor() {
    this.logger = BunyanLogger.createLogger({
      name: "poc-logging",
      streams: [
        {
          level: "info",
          stream: process.stdout
        }
      ]
    });
  }

  debug(msg: string, data: any): void {
    const severity = LogSeverity.DEBUG;
    const category = LogCategory.TRACE_LOG;

    const eventLog: Event = {
      id: 0,
      message: msg
    };

    this.logger.debug(LogMessageBuilder.buildMessage({
      eventLog,
      severity,
      category,
      data
    }), msg);
  }

  event(eventLog: Event, data: any, req?: Request): void {
    const category = LogCategory.EVENT_LOG;
    const severity = LogSeverity.INFO;

    this.logger.info(LogMessageBuilder.buildMessage({
      eventLog,
      severity,
      category,
      data,
      req
    }), eventLog.message);
  }

  issue(eventLog: Event, err: Error, req?: Request): void {
    const category = LogCategory.ISSUE_LOG;

    const severity = LogSeverity.ISSUE;

    this.logger.error(LogMessageBuilder.buildMessage({
      eventLog,
      severity,
      category,
      err,
      req
    }), eventLog.message);
  }

  fatal(eventLog: Event, err: Error, req?: Request): void {
    const category = LogCategory.ISSUE_LOG;
    const severity = LogSeverity.FATAL;
    
    this.logger.fatal(LogMessageBuilder.buildMessage({
      eventLog,
      severity,
      category,
      err,
      req      
    }), eventLog.message);
  }

  requestLog(eventLog: Event, req: Request): void {
    const category = LogCategory.REQUEST_LOG;
    const severity = LogSeverity.INFO;

    this.logger.info(LogMessageBuilder.buildMessage({
      eventLog,
      category,
      severity,
      data: {
        headers: req.headers,
        method: req.method,
        url: req.originalUrl,
        query: req.query,
        body: req.body
      },
      req
    }), eventLog.message);
  }
}