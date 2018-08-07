import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import { defaultMiddleware } from "src/state/middleware/AxiosMiddleware";
import { spinnerMiddleware } from "src/state/middleware/SpinnerMiddleware";
import { feedbackMiddleware } from "src/state/middleware/FeedbackMiddleware";

import reducer from "src/state/reducers";

const loggerMiddleware = createLogger();

const configureStore = (preloadedState?: any) => {
  const store = createStore(
    reducer,
    preloadedState,
    applyMiddleware(
      loggerMiddleware,
      defaultMiddleware,
      spinnerMiddleware,
      feedbackMiddleware
    )
  );

  return store;
};

export default configureStore;
