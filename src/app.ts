"use strict";

import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import expressRequestId from "express-request-id";

import orderRoutes from "./controllers/orderRoutes";
import OrderService from "./domain/services/orderService";
import Logger from "./logger/logger";
import requestLogMiddleware from "./logger/requestLogMiddleware";

const app = express();

const logger = new Logger();
const addRequestId = expressRequestId();

app.use(addRequestId);
app.use(helmet());
app.use(bodyParser.json());
app.use(requestLogMiddleware.requestLog(logger));

const orderService = new OrderService(logger);

app.use("/api/orders", orderRoutes.build(orderService, logger));

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err) {
    logger.issue({ id: 4301, message: err.message }, err, req);
    res.status(500).json({
      error: err.message
    });
  } else {
    next();
  }
});

export default app;