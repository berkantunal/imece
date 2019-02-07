import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import { throttle } from 'lodash';
import rootReducer from './reducers';
import { loadState, setState } from './localStorage';

const configureStore = preloadedState => {
  const loadedState = loadState();
  const store = createStore(
    rootReducer,
    {
      ...preloadedState,
      ...loadedState
    },
    applyMiddleware(reduxPromiseMiddleware, thunkMiddleware, loggerMiddleware)
  );

  store.subscribe(
    throttle(() => {
      setState({
        user: store.getState().user
      });
    }, 1000)
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      // eslint-disable-next-line  global-require
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
