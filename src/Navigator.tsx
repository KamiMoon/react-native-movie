import { createStackNavigator } from "react-navigation";

import Home from "src/Home";
import MoviesList from "src/movies/components/list/MoviesList";
import MoviesView from "src/movies/components/MoviesView";
import MoviesAdd from "src/movies/components/MoviesAdd";
import MoviesEdit from "src/movies/components/MoviesEdit";
import ExampleForm from "src/movies/ExampleForm";

const Navigator = createStackNavigator(
  {
    Home: { screen: Home },
    MoviesList: { screen: MoviesList },
    MoviesView: { screen: MoviesView },
    MoviesAdd: { screen: MoviesAdd },
    MoviesEdit: { screen: MoviesEdit },
    ExampleForm: { screen: ExampleForm }
  },
  {
    initialRouteName: "Home"
  }
);

export default Navigator;
