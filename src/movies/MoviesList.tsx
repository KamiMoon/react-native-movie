import React, { Component } from "react";
import { FlatList, StyleSheet, View, Alert } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import Spinner from "src/ui/spinner/Spinner";
import Feedback, {
  FeedbackType,
  getInitialState,
  getLoadingState,
  getAfterLoadingState,
  getError
} from "src/ui/feedback/Feedback";
import MoviesListItem from "src/movies/MoviesListItem";

import Movie from "src/movies/Movie";
import MoviesService, { convertData } from "src/movies/MoviesService";

interface Props {
  navigation: NavigationScreenProp<object>;
}

interface State {
  isLoading?: boolean;
  disableEdit?: boolean;
  feedback?: FeedbackType;
  movies: Array<Movie>;
}

export default class MoviesList extends Component<Props, State> {
  moviesService: MoviesService;

  constructor(props: Props) {
    super(props);

    this.state = {
      ...getInitialState(),
      movies: []
    };

    this.moviesService = new MoviesService();
  }

  componentDidMount() {
    this.loadMovies();
  }

  loadMovies = () => {
    this.setState(getLoadingState());
    //TODO: replace this query
    this.moviesService
      .query({
        year: 1988
      })
      .then(result => {
        this.setState({
          ...getAfterLoadingState(),
          movies: convertData(result.data)
        });
      })
      .catch(e => {
        this.setState(getError(e));
      });
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
    this.setState(getLoadingState());

    this.moviesService
      .remove(movieToDelete)
      .then(result => {
        Alert.alert(`${movieToDelete.title} successfully deleted`);

        const filteredMovies = this.state.movies.filter(movie => {
          return (
            movie.title !== movieToDelete.title ||
            movie.year !== movieToDelete.year
          );
        });

        this.setState({
          ...getAfterLoadingState(),
          movies: filteredMovies
        });
      })
      .catch(e => {
        this.setState(getError(e));
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
      disableEdit={this.state.disableEdit}
      onPress={this.onPressItem}
      onDelete={this.onDeleteItem}
      onEdit={this.onEditItem}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading && <Spinner />}
        {this.state.feedback.show && (
          <Feedback feedback={this.state.feedback} />
        )}
        <FlatList
          data={this.state.movies}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});
