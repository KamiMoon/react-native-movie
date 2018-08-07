import * as StateHelper from "src/state/StateHelper";

//Actions
export const CREATE_MOVIE = "movies/CREATE_MOVIE";
export const CREATE_MOVIE_SUCCESS = "movies/CREATE_MOVIE_SUCCESS";
export const CREATE_MOVIE_FAIL = "movies/CREATE_MOVIE_FAIL";

export const QUERY_MOVIES = "movies/QUERY_MOVIES";
export const QUERY_MOVIES_SUCCESS = "movies/QUERY_MOVIES_SUCCESS";
export const QUERY_MOVIES_FAIL = "movies/QUERY_MOVIES_FAIL";

export const GET_MOVIE = "movies/GET_MOVIE";
export const GET_MOVIE_SUCCESS = "movies/GET_MOVIE_SUCCESS";
export const GET_MOVIE_FAIL = "movies/GET_MOVIE_FAIL";

export const UPDATE_MOVIE = "movies/UPDATE_MOVIE";
export const UPDATE_MOVIE_SUCCESS = "movies/UPDATE_MOVIE_SUCCESS";
export const UPDATE_MOVIE_FAIL = "movies/UPDATE_MOVIE_FAIL";

export const DELETE_MOVIE = "movies/DELETE_MOVIE";
export const DELETE_MOVIE_SUCCESS = "movies/DELETE_MOVIE_SUCCESS";
export const DELETE_MOVIE_FAIL = "movies/DELETE_MOVIE_FAIL";

//Action Creators
export function createMovie(movie: any) {
  return {
    type: CREATE_MOVIE,
    payload: {
      request: {
        method: "POST",
        url: `/movies`,
        data: movie
      }
    }
  };
}

export function queryMovies(movie: any) {
  return {
    type: QUERY_MOVIES,
    payload: {
      request: {
        url: "/movies",
        params: { year: 1988 }
      }
    }
  };
}

export function getMovie(movie: any) {
  return {
    type: GET_MOVIE,
    payload: {
      request: {
        url: `/movies/${movie.year}/${movie.title}`
      }
    }
  };
}

export function updateMovie(movie: any) {
  return {
    type: UPDATE_MOVIE,
    payload: {
      request: {
        method: "PUT",
        url: `/movies/${movie.year}/${movie.title}`,
        data: movie
      }
    }
  };
}

export function deleteMovie(movie: any) {
  return {
    type: DELETE_MOVIE,
    movieToDelete: movie,
    payload: {
      request: {
        method: "DELETE",
        url: `/movies/${movie.year}/${movie.title}`
      }
    }
  };
}

const defaultState = {
  movies: [],
  movie: null,
  ...StateHelper.getInitialState()
};

//Reducer
export default function reducer(state: any = defaultState, action) {
  switch (action.type) {
    case CREATE_MOVIE:
      return StateHelper.buildLoadingState(state);
    case CREATE_MOVIE_SUCCESS:
      return {
        ...state,
        ...StateHelper.getAfterLoadingState()
      };
    case CREATE_MOVIE_FAIL:
      return StateHelper.buildErrorState(state, action);

    case QUERY_MOVIES:
      return {
        ...state,
        ...StateHelper.getLoadingState(),
        movies: []
      };
    case QUERY_MOVIES_SUCCESS:
      return {
        ...state,
        ...StateHelper.getAfterLoadingState(),
        movies: action.payload.data
      };
    case QUERY_MOVIES_FAIL:
      return StateHelper.buildErrorState(state, action);

    case GET_MOVIE:
      return {
        ...state,
        ...StateHelper.getLoadingState(),
        movie: null
      };
    case GET_MOVIE_SUCCESS:
      return {
        ...state,
        ...StateHelper.getAfterLoadingState(),
        movie: action.payload.data
      };
    case GET_MOVIE_FAIL:
      return StateHelper.buildErrorState(state, action);

    case UPDATE_MOVIE:
      return StateHelper.buildLoadingState(state);
    case UPDATE_MOVIE_SUCCESS:
      return {
        ...state,
        ...StateHelper.getAfterLoadingState()
      };
    case UPDATE_MOVIE_FAIL:
      return StateHelper.buildErrorState(state, action);

    case DELETE_MOVIE:
      return StateHelper.buildLoadingState(state);
    case DELETE_MOVIE_SUCCESS:
      const movieToDelete = action.meta.previousAction.movieToDelete;
      const filteredMovies = state.movies.filter(movie => {
        return (
          movie.title !== movieToDelete.title ||
          movie.year !== movieToDelete.year
        );
      });
      return {
        ...state,
        ...StateHelper.getAfterLoadingState(),
        movies: filteredMovies
      };
    case DELETE_MOVIE_FAIL:
      return StateHelper.buildErrorState(state, action);

    default:
      return state;
  }
}
