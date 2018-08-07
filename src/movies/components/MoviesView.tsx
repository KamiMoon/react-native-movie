import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { connect } from "react-redux";

import styles from "./MoviesView.styles";
import { getMovie } from "src/movies/state/MoviesState";
import Movie from "src/movies/model/Movie";

interface Props {
  navigation: any;
  movie: Movie;
  getMovie: any;
}

export class MoviesView extends Component<Props> {
  loadMovie() {
    const { navigation } = this.props;
    const year = navigation.getParam("year", "");
    const title = navigation.getParam("title", "");

    if (year && title) {
      this.props.getMovie({
        year,
        title
      });
    }
  }

  componentDidMount() {
    this.loadMovie();
  }

  render() {
    const { movie } = this.props;

    return (
      <View style={styles.container}>
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

const mapStateToProps = state => {
  return {
    ...state.movies
  };
};

const mapDispatchToProps = {
  getMovie
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesView);
