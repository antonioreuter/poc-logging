"use strict";

import Item from "./item";

interface IOrder {
  id: string;  
  items: Item[];
  createdAt: Date;
  updatedAt: Date;
};

class Order {
  id: string;
  items: Item[];
  createdAt: Date;
  updatedAt: Date;

  constructor(order: IOrder) {
    this.id = order.id;
    this.items = order.items;
    this.createdAt = order.createdAt || new Date();
    this.updatedAt = order.updatedAt || new Date();
  }

  total(): number {
    if (!this.items || this.items.length === 0) return 0;
    return this.items.reduce((acc, el) => acc + (el.price * el.qtd), 0);
  }
};

export {
  IOrder,
  Order
};