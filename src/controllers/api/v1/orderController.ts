"use strict";

import { Request, Response, NextFunction } from "express";
import OrderService from "../../../domain/services/orderService";
import { Order } from "../../../domain/models/order";
import ILogger from "../../../domain/interfaces/ilogger";

interface OrderController {
  saveOrder(req: Request, resp: Response, next: NextFunction):any;
  findById(req: Request, resp: Response, next: NextFunction):any;
};

const buildOrderController = (orderService: OrderService, logger: ILogger): OrderController => {
  return {
    saveOrder: (req: Request, resp: Response, next: NextFunction) => {
      try {
        logger.event(`RequestId: ${req.id}`);
        const order = new Order(req.body);
        const placedOrder = orderService.placeOrder(order);

        resp.status(201).json(placedOrder);
        next();
      } catch (err) {
        next(err);
      }
    },

    findById: (req: Request, resp: Response, next: NextFunction) => {
      try {
        const order = orderService.findById(req.param("orderId"));
        resp.status(200).json(order);
        next();
      } catch (err) {
        next(err);
      }
    }
  }
}

export {
  OrderController,
  buildOrderController
}