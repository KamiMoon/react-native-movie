import { combineReducers } from "redux";
//import { reducer as formReducer } from 'redux-form';

import loadingSpinnerReducer from "src/ui/spinner/Spinner.state";
import feebackReducer from "src/ui/feedback/Feedback.state";
import movieReducer from "src/movies/state/MoviesState";
const rootReducer = combineReducers({
  loadingSpinner: loadingSpinnerReducer,
  feedback: feebackReducer,
  movies: movieReducer
});

export default rootReducer;
