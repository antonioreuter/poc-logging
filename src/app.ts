"use strict";

import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import expressRequestId from "express-request-id";

import orderRoutes from "./controllers/orderRoutes";
import OrderService from "./domain/services/orderService";
import Logger from "./logger";
import logginMiddleware from "./logger/logMiddleware";
import httpContext from "express-http-context";
import RequestContext from "./context/requestContext";

const app = express();

const requestContext = new RequestContext();
const logger = new Logger(requestContext);
const addRequestId = expressRequestId();

app.use(addRequestId);
app.use(httpContext.middleware);
app.use(logginMiddleware.storeReqId(requestContext));
app.use(helmet());
app.use(bodyParser.json());

const orderService = new OrderService(logger);

app.use("/api/orders", orderRoutes.build(orderService, logger));

export default app;