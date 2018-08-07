import React, { Component } from "react";
import { FlatList, View, Alert } from "react-native";
import { connect } from "react-redux";

import { queryMovies, deleteMovie } from "src/movies/state/MoviesState";
import Feedback, { FeedbackType } from "src/ui/feedback/Feedback";
import styles from "./MoviesList.styles";
import MoviesListItem from "src/movies/components/list/MoviesListItem";
import Movie from "src/movies/model/Movie";

interface Props {
  navigation: any;
  queryMovies: any;
  deleteMovie: any;
  movies: any;
  isLoading?: boolean;
  disableEdit?: boolean;
  feedback?: FeedbackType;
}

export class MoviesList extends Component<Props> {
  componentDidMount() {
    this.loadMovies();
  }

  loadMovies = () => {
    //this.setState(getLoadingState());

    //this.props.dispatch(showLoadingSpinner());

    //TODO: replace this query
    // this.moviesService
    //   .query({
    //     year: 1988
    //   })
    //   .then(result => {
    //     this.setState({
    //       ...getAfterLoadingState(),
    //       movies: convertData(result.data)
    //     });
    //   })
    //   .catch(e => {
    //     this.setState(getError(e));
    //   });

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
    // this.setState(getLoadingState());
    // this.moviesService
    //   .remove(movieToDelete)
    //   .then(result => {
    //     Alert.alert(`${movieToDelete.title} successfully deleted`);
    //     const filteredMovies = this.props.movies.filter(movie => {
    //       return (
    //         movie.title !== movieToDelete.title ||
    //         movie.year !== movieToDelete.year
    //       );
    //     });
    //     this.setState({
    //       ...getAfterLoadingState()
    //       //movies: filteredMovies
    //     });
    //   })
    //   .catch(e => {
    //     this.setState(getError(e));
    //   });

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
    const { feedback } = this.props;

    return (
      <View style={styles.container}>
        {feedback && feedback.show && <Feedback feedback={feedback} />}
        <FlatList
          data={this.props.movies}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
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
