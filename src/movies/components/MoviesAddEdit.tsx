import React, { Component } from "react";
import { Text, TextInput, View, Button, Alert } from "react-native";

import { connect } from "react-redux";
import {
  getMovie,
  createMovie,
  updateMovie
} from "src/movies/state/MoviesState";

import Feedback, { FeedbackType } from "src/ui/feedback/Feedback";
import Movie from "src/movies/model/Movie";

interface Props {
  navigation: any;
  isLoading?: boolean;
  disableEdit?: boolean;
  feedback?: FeedbackType;

  getMovie: any;
  createMovie: any;
  updateMovie: any;
}

interface State {
  movie?: Movie;
}

export class MoviesAddEdit extends Component<Props, State> {
  year: number;
  title: string;
  mode: string;

  constructor(props: Props) {
    super(props);

    const { navigation } = this.props;
    this.year = navigation.getParam("year", "");
    this.title = navigation.getParam("title", "");
    this.mode = navigation.getParam("mode", "");

    this.state = {
      movie: {
        year: 1988,
        title: "",
        info: {
          rating: "",
          plot: "",
          rank: ""
        }
      }
    };
  }

  //TODO:  duplicate code with MovieView.js
  loadMovie() {
    if (this.year && this.title) {
      // this.setState(getLoadingState());
      // this.moviesService
      //   .get({
      //     year: this.year,
      //     title: this.title
      //   })
      //   .then(result => {
      //     this.setState({
      //       ...getAfterLoadingState(),
      //       movie: result.data
      //     });
      //   })
      //   .catch(e => {
      //     this.setState(getError(e));
      //   });

      this.props
        .getMovie({ year: this.year, title: this.title })
        .then(result => {
          this.setState({
            movie: result.payload.data
          });
        });
    }
  }

  componentDidMount() {
    if (this.mode === "Edit") {
      this.loadMovie();
    }
  }

  onChangeText = (property, text) => {
    const newState = { ...this.state };

    const properties = property.split(".");

    //TOOD: better
    if (properties.length === 2) {
      newState[properties[0]][properties[1]] = text;
    } else if (properties.length === 3) {
      newState[properties[0]][properties[1]][properties[2]] = text;
    }

    this.setState(newState, () => {
      console.log(this.state);
    });
  };

  goToList = () => {
    this.props.navigation.navigate("MoviesList", {});
  };

  addMovie = () => {
    const movie = this.state.movie;

    // this.setState(getLoadingState());

    // this.moviesService
    //   .create(movie)
    //   .then(result => {
    //     Alert.alert(
    //       "Success",
    //       `Created movie ${movie.title}.`,
    //       [
    //         {
    //           text: "OK",
    //           onPress: this.goToList
    //         }
    //       ],
    //       { cancelable: false }
    //     );
    //   })
    //   .catch(e => {
    //     this.setState(getError(e));
    //   });

    this.props.createMovie(movie).then(result => {
      Alert.alert(
        "Success",
        `Created movie ${movie.title}.`,
        [
          {
            text: "OK",
            onPress: this.goToList
          }
        ],
        { cancelable: false }
      );
    });
  };

  updateMovie = () => {
    const movie = this.state.movie;

    // this.setState(getLoadingState());

    // this.moviesService
    //   .update(movie)
    //   .then(result => {
    //     Alert.alert(
    //       "Success",
    //       `Updated movie ${movie.title}.`,
    //       [
    //         {
    //           text: "OK",
    //           onPress: this.goToList
    //         }
    //       ],
    //       { cancelable: false }
    //     );
    //   })
    //   .catch(e => {
    //     this.setState(getError(e));
    //   });

    this.props.updateMovie(movie).then(result => {
      Alert.alert(
        "Success",
        `Updated movie ${movie.title}.`,
        [
          {
            text: "OK",
            onPress: this.goToList
          }
        ],
        { cancelable: false }
      );
    });
  };

  onSave = () => {
    if (this.mode === "Edit") {
      this.updateMovie();
    } else {
      this.addMovie();
    }
  };

  render() {
    const mode = this.mode;
    const movie = this.state.movie;

    const { feedback, isLoading, disableEdit } = this.props;

    return (
      <View style={{ padding: 10 }}>
        {feedback && feedback.show && <Feedback feedback={feedback} />}
        <View>
          <Text>{mode} Movie</Text>
        </View>
        <View>
          {mode !== "Edit" && (
            <View>
              <TextInput
                placeholder="Title"
                value={movie.title}
                onChangeText={this.onChangeText.bind(this, "movie.title")}
              />
              {/* <TextInput
                placeholder="Year"
                keyboardType="numeric"
                value={"" + movie.year}
                onChangeText={text => {
                  //TODO: this is bad
                  text = parseInt(text, 10) || "";
                  this.onChangeText("movie.year", text);
                }}
              /> */}
            </View>
          )}
          {mode == "Edit" && (
            <View>
              <Text>{movie.title}</Text>
            </View>
          )}
          <View>
            <TextInput
              placeholder="Rating"
              keyboardType="numeric"
              value={"" + movie.info.rating}
              onChangeText={text => {
                //TODO: this is bad
                const converted = parseFloat(text) || 0.0;
                this.onChangeText("movie.info.rating", converted);
              }}
            />

            <TextInput
              placeholder="Plot"
              value={movie.info.plot}
              multiline={true}
              numberOfLines={4}
              onChangeText={this.onChangeText.bind(this, "movie.info.plot")}
            />

            <TextInput
              placeholder="Rank"
              keyboardType="numeric"
              value={"" + movie.info.rank}
              onChangeText={text => {
                //TODO: this is bad
                const converted = parseInt(text, 10) || 0;
                this.onChangeText("movie.info.rank", converted);
              }}
            />
          </View>

          <View>
            <Button onPress={this.onSave} title="Save" disabled={disableEdit} />
          </View>
        </View>
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
  getMovie,
  createMovie,
  updateMovie
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesAddEdit);
