"use strict";

import { Router } from "express";
import { OrderController, buildOrderController } from "./api/v1/orderController";
import OrderService from "../domain/services/orderService";
import ILogger from "../domain/interfaces/ilogger";

const build = (orderService: OrderService, logger: ILogger) => {
  const router = Router();
  const orderController: OrderController = buildOrderController(orderService, logger);
  router.route("/").post(orderController.saveOrder);
  router.route("/:orderId").get(orderController.findById);

  return router;
};

export default {
  build
};
