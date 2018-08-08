import React from "react";
import { connect } from "react-redux";
import { Alert } from "react-native";
import { Button, Text } from "native-base";

import { deleteMovie } from "src/movies/state/MoviesState";
import Movie from "src/movies/model/Movie";

interface Props {
  movie: Movie;
  disableEdit: boolean;
  deleteMovie: any;
}

export class MoviesDelete extends React.Component<Props> {
  deleteMovie = (movieToDelete: Movie) => {
    this.props.deleteMovie(movieToDelete).then(() => {
      Alert.alert(`${movieToDelete.title} successfully deleted`);
    });
  };

  onDeleteItem = () => {
    const { movie } = this.props;

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

  render() {
    const { disableEdit } = this.props;

    return (
      <Button danger onPress={this.onDeleteItem} disabled={disableEdit}>
        <Text>Delete</Text>
      </Button>
    );
  }
}

const mapDispatchToProps = {
  deleteMovie
};

export default connect(
  null,
  mapDispatchToProps
)(MoviesDelete);
