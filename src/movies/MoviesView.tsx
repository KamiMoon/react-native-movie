import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import Spinner from "src/ui/spinner/Spinner";
import Feedback, {
  FeedbackType,
  getInitialState,
  getLoadingState,
  getAfterLoadingState,
  getError
} from "src/ui/feedback/Feedback";
import Movie from "src/movies/Movie";
import MoviesService from "src/movies/MoviesService";

interface Props {
  navigation: NavigationScreenProp<object>;
}

interface State {
  isLoading?: boolean;
  disableEdit?: boolean;
  feedback?: FeedbackType;
  movie?: Movie;
}

export default class MoviesView extends Component<Props, State> {
  year: number;
  title: string;
  moviesService: MoviesService;

  constructor(props: Props) {
    super(props);

    this.state = {
      ...getInitialState(),
      movie: null
    };

    this.moviesService = new MoviesService();
  }

  loadMovie() {
    const { navigation } = this.props;
    this.year = navigation.getParam("year", "");
    this.title = navigation.getParam("title", "");

    if (this.year && this.title) {
      this.setState(getLoadingState());

      this.moviesService
        .get({
          year: this.year,
          title: this.title
        })
        .then(result => {
          this.setState({
            ...getAfterLoadingState(),
            movie: result.data
          });
        })
        .catch(e => {
          this.setState(getError(e));
        });
    }
  }

  componentDidMount() {
    this.loadMovie();
  }

  render() {
    const movie = this.state.movie;

    return (
      <View style={styles.container}>
        {this.state.isLoading && <Spinner />}
        {this.state.feedback &&
          this.state.feedback.show && (
            <Feedback feedback={this.state.feedback} />
          )}

        {movie && (
          <View>
            <Text>Title: {movie.title}</Text>
            <Text>Year: {movie.year}</Text>
            <Text>
              Directors:
              {movie.info.directors && movie.info.directors.join(", ")}
            </Text>
            <Text>Release Date: {movie.info.release_date}</Text>
            <Text>Rating: {movie.info.rating}</Text>
            <Text>
              Genres: {movie.info.genres && movie.info.genres.join(", ")}
            </Text>
            <Image
              source={{ uri: movie.info.image_url }}
              style={{ width: 200, height: 300 }}
            />
            <Text>Plot: {movie.info.plot}</Text>
            <Text>Rank: {movie.info.rank}</Text>
            <Text>Run time (secs): {movie.info.running_time_secs}</Text>
            <Text>
              Actors: {movie.info.actors && movie.info.actors.join(", ")}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  }
});
