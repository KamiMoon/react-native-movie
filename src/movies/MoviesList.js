import React, { Component } from "react";
import { FlatList, StyleSheet, View, Alert } from "react-native";

import MoviesListItem from "./MoviesListItem";
import MoviesService, { convertData } from "./MoviesService";

export default class MoviesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: []
    };

    this.moviesService = new MoviesService();
  }

  componentDidMount() {
    console.log("component did mount");

    this.moviesService
      .query({
        year: 1988
      })
      .then(result => {
        console.log(result);

        this.setState({
          movies: convertData(result.data)
        });
      })
      .catch(e => {
        console.error(e);
      });
  }

  keyExtractor = (movie, index) => movie.year + "__" + movie.title;

  onPressItem = movie => {
    this.props.navigation.navigate("MoviesView", {
      year: movie.year,
      title: movie.title
    });
  };

  deleteMovie = movie => {
    this.moviesService
      .remove(movie)
      .then(result => {
        console.log("movie deleted successfully");
      })
      .catch(e => {
        console.error(e);
      });
  };

  onDeleteItem = movie => {
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

  onEditItem = movie => {
    this.props.navigation.navigate("MoviesAddEdit", {
      mode: "Edit",
      year: movie.year,
      title: movie.title
    });
  };

  renderItem = ({ item }) => (
    <MoviesListItem
      movie={item}
      onPress={this.onPressItem}
      onDelete={this.onDeleteItem}
      onEdit={this.onEditItem}
    />
  );

  render() {
    return (
      <View style={styles.container}>
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
