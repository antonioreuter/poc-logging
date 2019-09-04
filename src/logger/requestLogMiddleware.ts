"use strict";

import { Request, Response, NextFunction } from "express";
import ILogger from "../domain/interfaces/ilogger";

const requestLog = (logger: ILogger) => (req: Request, resp: Response, next: NextFunction) => {
  logger.requestLog({id: 200, message: "Logging the request..."},req);  
  next();
};

export default {
  requestLog
};
