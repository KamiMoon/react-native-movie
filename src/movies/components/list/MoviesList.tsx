import React, { Component } from "react";
import { FlatList, Alert } from "react-native";
import { connect } from "react-redux";

import { queryMovies, deleteMovie } from "src/movies/state/MoviesState";
import MoviesListItem from "src/movies/components/list/MoviesListItem";
import Movie from "src/movies/model/Movie";

interface Props {
  navigation: any;
  queryMovies: any;
  deleteMovie: any;
  movies: any;
  isLoading?: boolean;
  disableEdit?: boolean;
}

export class MoviesList extends Component<Props> {
  componentDidMount() {
    this.loadMovies();
  }

  loadMovies = () => {
    this.props.queryMovies();
  };

  keyExtractor = (movie: Movie, index: number): string =>
    movie.year + "__" + movie.title;

  onPressItem = (movie: Movie) => {
    this.props.navigation.navigate("MoviesView", {
      year: movie.year,
      title: movie.title
    });
  };

  deleteMovie = (movieToDelete: Movie) => {
    this.props.deleteMovie(movieToDelete).then(result => {
      Alert.alert(`${movieToDelete.title} successfully deleted`);
    });
  };

  onDeleteItem = (movie: Movie) => {
    Alert.alert(
      "Warning",
      `Are you sure you want to delete ${movie.title}?`,
      [
        {
          text: "Yes",
          onPress: () => {
            this.deleteMovie(movie);
          }
        },
        {
          text: "No",
          onPress: () => console.log("No Pressed"),
          style: "cancel"
        }
      ],
      { cancelable: true }
    );
  };

  onEditItem = (movie: Movie) => {
    this.props.navigation.navigate("MoviesAddEdit", {
      mode: "Edit",
      year: movie.year,
      title: movie.title
    });
  };

  renderItem = ({ item }) => (
    <MoviesListItem
      movie={item}
      disableEdit={this.props.disableEdit}
      onPress={this.onPressItem}
      onDelete={this.onDeleteItem}
      onEdit={this.onEditItem}
    />
  );

  render() {
    const { movies } = this.props;

    return (
      <FlatList
        data={movies}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.movies
  };
};

const mapDispatchToProps = {
  queryMovies,
  deleteMovie
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesList);
