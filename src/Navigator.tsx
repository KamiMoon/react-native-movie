import { createStackNavigator } from "react-navigation";

import Home from "src/Home";
import MoviesList from "src/movies/components/list/MoviesList";
import MoviesView from "src/movies/components/MoviesView";
import MoviesAddEdit from "src/movies/components/MoviesAddEdit";

const Navigator = createStackNavigator(
  {
    Home: { screen: Home },
    MoviesList: { screen: MoviesList },
    MoviesView: { screen: MoviesView },
    MoviesAddEdit: { screen: MoviesAddEdit }
  },
  {
    initialRouteName: "Home"
  }
);

export default Navigator;
