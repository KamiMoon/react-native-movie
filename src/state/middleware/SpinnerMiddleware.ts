import {
  showLoadingSpinner,
  hideLoadingSpinner
} from "src/ui/spinner/Spinner.state";

//addon https://github.com/svrcekmichal/redux-axios-middleware
export const spinnerMiddleware = store => next => action => {
  if (action.payload && !action.meta) {
    store.dispatch(showLoadingSpinner());
  } else if (action.payload && action.meta) {
    store.dispatch(hideLoadingSpinner());
  } else if (action.meta && action.error) {
    store.dispatch(hideLoadingSpinner());
  }

  return next(action);
};
