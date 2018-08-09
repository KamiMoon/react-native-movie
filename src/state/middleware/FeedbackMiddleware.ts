import { showFeedback, hideFeedback } from "src/ui/feedback/Feedback.state";
import { getErrorMsg } from "src/state/StateHelper";

//addon https://github.com/svrcekmichal/redux-axios-middleware
export const feedbackMiddleware = store => next => action => {
  if (action.type.startsWith("@@redux-form/")) {
    return next(action);
  }

  if (action.payload && !action.meta) {
    store.dispatch(hideFeedback());
  } else if (action.meta && action.error) {
    const errorMsg = getErrorMsg(action.error);

    console.log(action);

    store.dispatch(
      showFeedback({
        title: "Error",
        msg: errorMsg
      })
    );
  }

  return next(action);
};
