"use strict";

import { Order } from "../models/order";
import { v4 as uuidV4 } from "uuid";
import ILogger from "../interfaces/ilogger";

export default class OrderService {
  private placedOrders:Map<string, Order> = new Map();
  private logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  placeOrder(order: Order) {
    this.logger.debug("Saving a new order.");
    order.id = uuidV4();
    this.placedOrders.set(order.id, order);
    this.logger.event("The new order was saved:", order);
    
    return order;
  }

  findById(orderId: string) {
    this.logger.debug("Finding order by Id: ", { orderId });
    
    if (!this.placedOrders.has(orderId)) throw new Error("Order not found!");
    
    return this.placedOrders.get(orderId);
  }
}