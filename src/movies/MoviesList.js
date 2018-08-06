import React, { Component } from "react";
import { FlatList, StyleSheet, View, Alert } from "react-native";

import Spinner from "../ui/spinner/Spinner";
import Feedback from "../ui/feedback/Feedback";
import MoviesListItem from "./MoviesListItem";
import MoviesService, { convertData } from "./MoviesService";

export default class MoviesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      disableEdit: false,
      feedback: {
        show: false
      },
      movies: []
    };

    this.moviesService = new MoviesService();
  }

  componentDidMount() {
    this.loadMovies();
  }

  loadMovies = () => {
    this.setState({
      isLoading: true,
      disableEdit: true,
      feedback: {}
    });
    //TODO: replace this query
    this.moviesService
      .query({
        year: 1988
      })
      .then(result => {
        this.setState({
          isLoading: false,
          disableEdit: false,
          movies: convertData(result.data)
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
  };

  keyExtractor = (movie, index) => movie.year + "__" + movie.title;

  onPressItem = movie => {
    this.props.navigation.navigate("MoviesView", {
      year: movie.year,
      title: movie.title
    });
  };

  deleteMovie = movieToDelete => {
    this.setState({
      isLoading: true,
      disableEdit: true,
      feedback: {}
    });

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
          isLoading: false,
          disableEdit: false,
          movies: filteredMovies
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
