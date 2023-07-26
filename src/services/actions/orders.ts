import { TOrderResponse } from "../../utils/data";

export const ORDERS_INIT = "ORDERS_INIT";
export const ORDERS_OPEN = "ORDERS_OPEN";
export const ORDERS_CLOSE = "ORDERS_CLOSE";
export const ORDERS_ERROR = "ORDERS_ERROR";
export const ORDERS_MESSAGE = "ORDERS_MESSAGE";
export const ORDERS_SEND = "ORDERS_SEND";
export const ORDERS_DEFAULT = "ORDERS_DEFAULT";

interface IOrdersDefault {
    readonly type: typeof ORDERS_DEFAULT;
}
interface IOrdersInit {
    readonly type: typeof ORDERS_INIT;
}
interface IOrdersOpen {
    readonly type: typeof ORDERS_OPEN;
}
interface IOrdersClose {
    readonly type: typeof ORDERS_CLOSE;
}
interface IOrdersError {
    readonly type: typeof ORDERS_ERROR;
}
interface IOrdersMessage {
    readonly type: typeof ORDERS_MESSAGE;
    data: TOrderResponse
}
interface IOrdersSend {
    readonly type: typeof ORDERS_SEND;
    data: TOrderResponse
}

const oneField = (type: string) => {
    return {
        type: type,
    };
}
const twoField = (type: string, data: string) => {
    return {
        type: type,
        data: data
    };
}

export const ordersInit = () => {
    return oneField(ORDERS_INIT);
};
export const ordersClose = () => {
    return oneField(ORDERS_CLOSE);
};
export const ordersMessage = (data: string) => {
    return twoField(ORDERS_MESSAGE, data);
};
export const ordersSend = (data: string) => {
    return twoField(ORDERS_SEND, data);
};

export type TOrdersActions =
  | IOrdersInit
  | IOrdersOpen
  | IOrdersClose
  | IOrdersError
  | IOrdersMessage
  | IOrdersSend
  | IOrdersDefault;