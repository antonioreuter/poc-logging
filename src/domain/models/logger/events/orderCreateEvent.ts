"use strict";

import Event from "../../../../logger/models/logEvent";

export default class OrderCreateEvent implements Event {
    id: number = 4001;
    message: string = "Order created with success";
}