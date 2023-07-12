import { TOrderResponse } from "../../utils/data";

export const FEED_INIT = "FEED_INIT";
export const FEED_OPEN = "FEED_OPEN";
export const FEED_CLOSE = "FEED_CLOSE";
export const FEED_ERROR = "FEED_ERROR";
export const FEED_MESSAGE = "FEED_MESSAGE";
export const FEED_SEND = "FEED_SEND";

interface IFeedInit {
    readonly type: typeof FEED_INIT;
}
interface IFeedOpen {
    readonly type: typeof FEED_OPEN;
}
interface IFeedClose {
    readonly type: typeof FEED_CLOSE;
}
interface IFeedError {
    readonly type: typeof FEED_ERROR;
}
interface IFeedMessage {
    readonly type: typeof FEED_MESSAGE;
    data: TOrderResponse;
}
interface IFeedSend {
    readonly type: typeof FEED_SEND;
    data: TOrderResponse;
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

export const feedInit = () => {
    return oneField(FEED_INIT);
};
export const feedClose = () => {
    return oneField(FEED_CLOSE);
};
export const feedMessage = (data: string) => {
    return twoField(FEED_MESSAGE, data);
};
export const feedSend = (data: string) => {
    return twoField(FEED_SEND, data);
};

export type TFeedActions =
  | IFeedInit
  | IFeedOpen
  | IFeedClose
  | IFeedError
  | IFeedMessage
  | IFeedSend;
