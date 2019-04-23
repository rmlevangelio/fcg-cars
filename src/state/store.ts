import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { reducers } from './reducers';

export function initStore() {
  const sagaMiddleware = createSagaMiddleware();
  if (process.env.NODE_ENV === 'production') {
    return {
      ...createStore(
        reducers,
        applyMiddleware(sagaMiddleware)
      ),
      runSaga: sagaMiddleware.run
    };
  }

  return {
    ...createStore(
      reducers,
      compose(
        applyMiddleware(sagaMiddleware),
        window['devToolsExtension'] ? window['devToolsExtension']() : (f: any) => f
      )
    ),
    runSaga: sagaMiddleware.run
  };
}
