"use strict";

import { Request } from "express";
import Event from "./logEvent";
import { LogSeverity } from "./logSeverity";
import { LogCategory } from "./logCategory";

export default interface LogObject {
    eventLog: Event;
    resourceType?: string;
    data?: any;
    err?: Error;
    req?: Request
    severity: LogSeverity;
    category: LogCategory;
}