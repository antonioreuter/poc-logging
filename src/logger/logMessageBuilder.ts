"use strict";

import { Request } from "express";
import LogObject from "./models/logObject";
import LogMessage from "./models/logMessage";
import { v4 as uuidV4 } from "uuid";
import os from "os";
import moment from "moment";

export default class LogMessageBuilder {
    static BLACK_LIST = ['authorization', 'loginname', 'password', 'clientid', 'clientsecret', 'login', 'username', 'guid', 'ipaddress', 'hsdpid', 'createdby', 'user'];

    static buildMessage(logObject: LogObject): LogMessage {
        const logData = {
            message: logObject.eventLog.message,
            data: logObject.data,
            stack: (logObject.err) ? logObject.err.stack : undefined
        };
    
        const message: string = JSON.stringify(logData) || "";
        const reqFields = LogMessageBuilder.parseRequest(logObject.req);
    
        const logMessage: LogMessage = {
            id: uuidV4(),
            eventId: logObject.eventLog.id || 0,
            ...reqFields,
            logTime: moment(new Date()).utc().format('YYYY-MM-DDTHH:mm:ssZ'),
            severity: logObject.severity,
            logData: {
                message: Buffer.from(message).toString("base64")
            },
    
            applicationName: "POC_LOGGING",
            serviceName: "HAS",
            resourceType: "LogEvent",
            category: logObject.category,
            msg: logObject.eventLog.message
        };
    
        return LogMessageBuilder.sanitize(logMessage);
    }

    private static parseRequest(req?: Request): any {
        const requestLogFields: any = {
            serverName: os.hostname,
            applicationVersion: "",
            originationUser: "",
            transactionId: uuidV4(),
            component: "",
            httpMethod: "",
            protocol: ""
        };
    
        if (req) {
            requestLogFields.applicationVersion = req.header("api-version") || "";
            requestLogFields.originationUser = req.ip || "";
            requestLogFields.transactionId = req.id || uuidV4();
            requestLogFields.component = req.originalUrl;
            requestLogFields.protocol = req.protocol;
            requestLogFields.httpMethod = req.method;
            requestLogFields.serverName = req.hostname || os.hostname;
        }
    
        return requestLogFields;
    }

    private static sanitize(data: any): LogMessage {
        if (typeof data !== 'object') {
            return data;
        }

        const sanitizedData = { ...data };
        Object.getOwnPropertyNames(data).forEach((prop) => {
            if (typeof data[prop] === 'object' && data[prop] !== null) {
                sanitizedData[prop] = LogMessageBuilder.sanitize(data[prop]);
            } else if (LogMessageBuilder.BLACK_LIST.includes(prop.toLowerCase())) {
                sanitizedData[prop] = '***';
            }
        });

        return sanitizedData;
    }
}