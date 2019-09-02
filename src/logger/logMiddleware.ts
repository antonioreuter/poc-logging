"use strict";

import { Request, Response, NextFunction } from "express";
import RequestContext from "../context/requestContext";

const storeReqId = (requestContext: RequestContext) => (req: Request, resp: Response, next: NextFunction) => {
  console.log(`[logMiddleware] Req.id: ${req.id}`);
  requestContext.storeRequest(req);
  next();
};

export default {
  storeReqId
};
