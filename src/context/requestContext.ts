"use strict";

import { Request } from "express";

export default class RequestContext {
  storeRequest(req: Request): void {
    console.log(`Storing request in the requestContext: ${req.id}`);
    console.log("Request stored...");
  }

  retrieveRequest(): Request {
    throw new Error();
  }
}