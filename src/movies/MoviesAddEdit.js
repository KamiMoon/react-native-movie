import React, { Component } from "react";
import { Text, TextInput, View, Button } from "react-native";
import MoviesService from "./MoviesService";

export default class MoviesAdd extends Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    this.year = navigation.getParam("year", "");
    this.title = navigation.getParam("title", "");
    this.mode = navigation.getParam("mode", "");

    this.state = {
      loaded: false,
      movie: {
        year: "",
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
      this.moviesService
        .get({
          year: this.year,
          title: this.title
        })
        .then(result => {
          console.log(result);

          this.setState({
            loaded: true,
            movie: result.data
          });
        })
        .catch(e => {
          console.error(e);
        });
    }
  }

  componentDidMount() {
    if (this.mode === "Edit") {
      this.loadMovie();
    } else {
      this.setState({
        loaded: true
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

  onSave = () => {
    if (this.mode === "Edit") {
      this.moviesService
        .update(this.state.movie)
        .then(result => {
          console.log("updated movie successfully");
        })
        .catch(e => {
          console.error(e);
        });
    } else {
      this.moviesService
        .create(this.state.movie)
        .then(result => {
          console.log("create movie successfully");
        })
        .catch(e => {
          console.error(e);
        });
    }
  };

  render() {
    const mode = this.mode;
    const movie = this.state.movie;
    const loaded = this.state.loaded;

    return (
      <View style={{ padding: 10 }}>
        <View>
          <Text>{mode} Movie</Text>
        </View>
        {loaded && (
          <View>
            {mode !== "Edit" && (
              <View>
                <TextInput
                  placeholder="Title"
                  value={movie.title}
                  onChangeText={this.onChangeText.bind(this, "movie.title")}
                />
                <TextInput
                  placeholder="Year"
                  keyboardType="numeric"
                  value={"" + movie.year}
                  onChangeText={text => {
                    //TODO: this is bad
                    text = parseInt(text, 10) || "";
                    this.onChangeText("movie.year", text);
                  }}
                />
              </View>
            )}

            <View>
              <TextInput
                placeholder="Rating"
                keyboardType="numeric"
                value={"" + movie.info.rating}
                onChangeText={text => {
                  //TODO: this is bad
                  text = parseFloat(text) || "";
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
                  text = parseInt(text, 10) || "";
                  this.onChangeText("movie.info.rank", text);
                }}
              />
            </View>

            <View>
              <Button onPress={this.onSave} title="Save" />
            </View>
          </View>
        )}
      </View>
    );
  }
}

// skip this line if using Create React Native App
//AppRegistry.registerComponent("AwesomeProject", () => PizzaTranslator);
