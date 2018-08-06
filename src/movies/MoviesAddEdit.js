import React, { Component } from "react";
import { Text, TextInput, View, Button, Alert } from "react-native";

import Spinner from "../ui/spinner/Spinner";
import Feedback from "../ui/feedback/Feedback";
import MoviesService from "./MoviesService";

export default class MoviesAdd extends Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    this.year = navigation.getParam("year", "");
    this.title = navigation.getParam("title", "");
    this.mode = navigation.getParam("mode", "");

    this.state = {
      isLoading: true,
      disableEdit: false,
      feedback: {
        show: false
      },
      movie: {
        year: "1988",
        title: "",
        info: {
          rating: "",
          plot: "",
          rank: ""
        }
      }
    };

    this.moviesService = new MoviesService();
  }

  //TODO:  duplicate code with MovieView.js
  loadMovie() {
    if (this.year && this.title) {
      this.setState({
        isLoading: true,
        disableEdit: true,
        feedback: {}
      });

      this.moviesService
        .get({
          year: this.year,
          title: this.title
        })
        .then(result => {
          this.setState({
            isLoading: false,
            disableEdit: false,
            movie: result.data
          });
        })
        .catch(e => {
          this.setState({
            isLoading: false,
            disableEdit: false,
            feedback: {
              show: true,
              title: "Error",
              msg: e.toString()
            }
          });
        });
    }
  }

  componentDidMount() {
    if (this.mode === "Edit") {
      this.loadMovie();
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  onChangeText = (property, text) => {
    console.log(text);
    console.log(property);

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

    this.setState({
      isLoading: true,
      disableEdit: true,
      feedback: {}
    });

    this.moviesService
      .create(movie)
      .then(result => {
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
      })
      .catch(e => {
        this.setState({
          isLoading: false,
          disableEdit: false,
          feedback: {
            show: true,
            title: "Error",
            msg: e.toString()
          }
        });
      });
  };

  updateMovie = () => {
    const movie = this.state.movie;

    this.setState({
      isLoading: true,
      disableEdit: true,
      feedback: {}
    });

    this.moviesService
      .update(movie)
      .then(result => {
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
      })
      .catch(e => {
        this.setState({
          isLoading: false,
          disableEdit: false,
          feedback: {
            show: true,
            title: "Error",
            msg: e.toString()
          }
        });
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

    return (
      <View style={{ padding: 10 }}>
        {this.state.isLoading && <Spinner />}
        {this.state.feedback.show && (
          <Feedback feedback={this.state.feedback} />
        )}
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
                text = parseFloat(text) || 0.0;
                this.onChangeText("movie.info.rating", text);
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
                text = parseInt(text, 10) || 0;
                this.onChangeText("movie.info.rank", text);
              }}
            />
          </View>

          <View>
            <Button
              onPress={this.onSave}
              title="Save"
              disabled={this.state.disableEdit}
            />
          </View>
        </View>
      </View>
    );
  }
}

// skip this line if using Create React Native App
//AppRegistry.registerComponent("AwesomeProject", () => PizzaTranslator);
