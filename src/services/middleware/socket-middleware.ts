import { Middleware, MiddlewareAPI } from "redux";
import { getCookie } from "../../utils/utils";

export type TWSActions = {
	init: string;
	open: string;
	close: string;
	error: string;
	message: string;
	send: string;
}

export const socketMiddleware = (url: string, actions: TWSActions, security: boolean): Middleware => {
  return (store: MiddlewareAPI) => 
  {
    let socket: WebSocket | null = null;
    const { init, open, close, error, message, send } = actions;

    return (next) => (action) => 
    {
      const { dispatch } = store;
      const { type, data } = action;
      
      if (type === init) 
      {
        let additUrl = "";
        if (security)
            additUrl = `?token=${getCookie("accessToken")}`;
        const wsurl = url + additUrl;

        socket = new WebSocket(wsurl);
                       
        socket.onopen = (event) => {
          dispatch({ type: open, data: event });
        };

        socket.onmessage = (event) => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;
            dispatch({
              type: message,
              data: restParsedData,
            });
        };

        socket.onclose = (event) => {
            dispatch({
              type: close,
              data: event,
            });
        };

        socket.onerror = (event) => {
          dispatch({ type: error, data: event });
        };
      }

      if (send && type === send && socket ) 
      {
        const orders = { ...data };
        socket.send(JSON.stringify(orders));
      }

      next(action);
    };
  };
};