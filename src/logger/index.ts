"use strict";

import ILogger from "../domain/interfaces/ilogger";
import RequestContext from "../context/requestContext";

export default class Logger implements ILogger {
  // private logger:any;
  private requestContext: RequestContext;

  constructor(requestContext: RequestContext) {
    // this.logger = {};
    this.requestContext = requestContext;
  }

  debug(message: string, data?: any): void {
    const req = this.requestContext.retrieveRequest();
    console.log(`[DEBUG] REQ[${req.id}] ${message}. DATA: ${JSON.stringify(data)}`);
  }

  warn(message: string, data?: any): void {
    const req = this.requestContext.retrieveRequest();
    console.log(`[WARN] REQ[${req.id}] ${message}. DATA: ${JSON.stringify(data)}`);
  }

  event(message: string, data?: any): void {
    const req = this.requestContext.retrieveRequest();
    console.log(`[INFO] REQ[${req.id}] ${message}. DATA: ${JSON.stringify(data)}`);
  }

  issue(message: string, err: Error): void {
    const req = this.requestContext.retrieveRequest();
    console.log(`[ISSUE] REQ[${req.id}] ${message}. DATA: ${JSON.stringify(err)}`);
  }

  requestLog(message: string, data?: any): void {
    const req = this.requestContext.retrieveRequest();
    console.log(`[REQUEST] REQ[${req.id}] ${message}. DATA: ${JSON.stringify(data)}`);
  }
}