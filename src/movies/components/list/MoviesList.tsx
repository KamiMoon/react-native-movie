import React, { Component } from "react";
import { FlatList } from "react-native";
import { connect } from "react-redux";

import { queryMovies } from "src/movies/state/MoviesState";
import MoviesListItem from "src/movies/components/list/MoviesListItem";
import Movie from "src/movies/model/Movie";

interface Props {
  navigation: any;
  queryMovies: any;
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

  onEditItem = (movie: Movie) => {
    this.props.navigation.navigate("MoviesEdit", {
      year: movie.year,
      title: movie.title
    });
  };

  renderItem = ({ item }) => (
    <MoviesListItem
      movie={item}
      disableEdit={this.props.disableEdit}
      onPress={this.onPressItem}
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
  queryMovies
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesList);
