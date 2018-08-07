import { combineReducers } from "redux";
//import { reducer as formReducer } from 'redux-form';

import loadingSpinnerReducer from "src/ui/spinner/Spinner.state";
import movieReducer from "src/movies/state/MoviesState";
const rootReducer = combineReducers({
  loadingSpinner: loadingSpinnerReducer,
  movies: movieReducer
});

export default rootReducer;
