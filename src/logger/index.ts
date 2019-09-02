"use strict";

import { Request } from "express";
import * as BunyanLogger from "bunyan";

import ILogger from "../domain/interfaces/ilogger";
import { Order } from "../domain/models/order";

const orderSerializer = (order: Order) => {
  return {
    id: order.id,
    items: order.items.map(item => item.name),
    total: order.total,
    createdAt: order.createdAt
  }
}

const requestSerializer = (req: Request) => {
  return {
    id: req.id,
    method: req.method,
    protocol: req.protocol,
    url: req.url,
    headers: req.headers,
    accepted: req.accepted,
    remoteAddress: req.connection.remoteAddress,
    remotePort: req.connection.remotePort
  };
}

export default class Logger implements ILogger {
  private logger: BunyanLogger;

  constructor() {
    this.logger = BunyanLogger.createLogger({
      name: "poc-logging",
      serializers: {
        req: requestSerializer,
        err: BunyanLogger.stdSerializers.err,
        order: orderSerializer
      },
      streams: [
        {
          level: "info",
          stream: process.stdout
        }
      ]
    });
  }

  debug(msg: string, data?: any): void {
    this.logger.debug({
      data
    }, msg);
  }

  warn(msg: string, data?: any): void {
    this.logger.warn({
      data
    }, msg);
  }

  event(msg: string, data?: any): void {
    this.logger.info(data, msg);
  }

  issue(msg: string, err: Error): void {
    this.logger.error({
      err
    }, msg);
  }

  fatal(msg: string, req: Request, err: Error): void {
    this.logger.error({
      requestId: req.id,
      err
    }, msg);
  }

  requestLog(msg: string, req: Request): void {
    this.logger.info({
      requestId: req.id,
      req
    }, msg);
  }
}