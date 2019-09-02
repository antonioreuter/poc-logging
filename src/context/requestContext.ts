"use strict";

import httpContext from "express-http-context";
import { Request } from "express";

export default class RequestContext {
  private static REQUEST = "request"
  
  storeRequest(req: Request): void {
    console.log(`Storing request in the requestContext: ${req.id}`);
    httpContext.set(RequestContext.REQUEST, req);
    console.log("Request stored...");
  }

  retrieveRequest(): Request {
    const result = httpContext.get(RequestContext.REQUEST) || {};
    console.log("Result");
    console.log(result);

    return result;
  }
}