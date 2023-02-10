/** @format */

const loggerMiddleware = (store) => (next) => (action) => {
  if (action) console.log('action: ', action);
  if (!action.payload) {
    action.payload = 'test';
  }
  if (action.payload) console.log('action.payload: ', action.payload);
  if (action.type) console.log('action.type: ', action.type);
  next(action);
};

export default loggerMiddleware;
