
import './index.css';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { socketMiddleware } from './middleware/socket-middleware';
import { ORDERS_CLOSE, ORDERS_ERROR, ORDERS_INIT, ORDERS_MESSAGE, ORDERS_OPEN, ORDERS_SEND } from './actions/orders';
import { FEED_CLOSE, FEED_ERROR, FEED_INIT, FEED_MESSAGE, FEED_OPEN, FEED_SEND } from './actions/feed';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  const wsUrlOrder = "wss://norma.nomoreparties.space/orders";
  const wsUrlFeed = "wss://norma.nomoreparties.space/orders/all";

  const orderActions = {
    init: ORDERS_INIT,
    open: ORDERS_OPEN,
    close: ORDERS_CLOSE,
    error: ORDERS_ERROR,
    message: ORDERS_MESSAGE,
    send: ORDERS_SEND,
  }

  const feedActions = {
    init: FEED_INIT,
    open: FEED_OPEN,
    close: FEED_CLOSE,
    error: FEED_ERROR,
    message: FEED_MESSAGE,
    send: FEED_SEND,
  }

  const enhancer = composeEnhancers(applyMiddleware(
    thunk, socketMiddleware(wsUrlOrder, orderActions, true), 
    socketMiddleware(wsUrlFeed, feedActions, false)));
  
  // Инициализируем хранилище с помощью корневого редьюсера
  const store = createStore(rootReducer, enhancer);
  
  export default store;