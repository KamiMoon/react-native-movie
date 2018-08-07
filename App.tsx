import React from "react";
import { StyleSheet} from "react-native";

import { createStackNavigator } from "react-navigation";

import Home from "./src/Home";
import MoviesList from "./src/movies/MoviesList";
import MoviesView from "./src/movies/MoviesView";
import MoviesAddEdit from "./src/movies/MoviesAddEdit";

const App = createStackNavigator(
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

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
