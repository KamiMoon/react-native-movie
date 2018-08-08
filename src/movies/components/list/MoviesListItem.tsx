import React from "react";
import { Right, Button, ListItem, Body, Text } from "native-base";

import Movie from "src/movies/model/Movie";

interface Props {
  onPress(movie: Movie);
  onEdit(movie: Movie);
  onDelete(movie: Movie);
  movie: Movie;
  disableEdit: boolean;
}

export default class MoviesListItem extends React.PureComponent<Props> {
  onPress = () => {
    this.props.onPress(this.props.movie);
  };

  onEdit = () => {
    this.props.onEdit(this.props.movie);
  };

  onDelete = () => {
    this.props.onDelete(this.props.movie);
  };

  render() {
    return (
      <ListItem style={{ marginLeft: 0 }} onPress={this.onPress}>
        <Body>
          <Text style={{ fontWeight: "bold" }}>{this.props.movie.title}</Text>
          <Text>{this.props.movie.year}</Text>
        </Body>
        <Right>
          <Button onPress={this.onEdit} disabled={this.props.disableEdit}>
            <Text>Edit</Text>
          </Button>
          <Button
            danger
            onPress={this.onDelete}
            disabled={this.props.disableEdit}
          >
            <Text>Delete</Text>
          </Button>
        </Right>
      </ListItem>
    );
  }
}
