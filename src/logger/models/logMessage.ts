"use strict";

import { LogSeverity } from "./logSeverity";
import { LogCategory } from "./logCategory";

export default interface LogMessage {
    id: string; //uuid
    eventId: number; //Application event code - you can define a list of code in your application mapping to an event
    transactionId: string; //Transaction identifier - supports only uuid
    logTime: string; //timestamp (yyyy-MM-dd'T'HH:mm:ssZ / yyyy-MM-dd'T'HH:mm:ss.SSSZ)
    severity: LogSeverity; //INFO, WARNING, ERROR, FATAL, TRACE
    logData: string;
    category?: LogCategory; //The kind of log: Monitoring, Tracelog
    
    description?: string;
    resourceType?: string; //default value is "LogEvent"
    serverName?: string; //Host
    serviceName?: string;
    applicationName?: string;
    applicationVersion?: string;
    applicationInstance?: string;
    organizationId?: string;
    component?: string; //Can be an event or a name of a sub component: Login, CreateResource
    originatingUser?: string;
    msg: string;
}