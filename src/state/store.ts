import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import { defaultMiddleware } from "src/state/AxiosMiddleware";
import { spinnerMiddleware } from "src/state/SpinnerMiddleware";

import reducer from "src/state/reducers";

const loggerMiddleware = createLogger();

const configureStore = (preloadedState?: any) => {
  const store = createStore(
    reducer,
    preloadedState,
    applyMiddleware(loggerMiddleware, defaultMiddleware, spinnerMiddleware)
  );

  return store;
};

export default configureStore;
