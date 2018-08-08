import React from "react";
import { Right, Button, ListItem, Body, Text } from "native-base";

import Movie from "src/movies/model/Movie";
import MoviesDelete from "src/movies/components/MoviesDelete";

interface Props {
  onPress(movie: Movie);
  onEdit(movie: Movie);
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

  render() {
    const { movie, disableEdit } = this.props;

    return (
      <ListItem style={{ marginLeft: 0 }} onPress={this.onPress}>
        <Body>
          <Text style={{ fontWeight: "bold" }}>{movie.title}</Text>
          <Text>{movie.year}</Text>
        </Body>
        <Right>
          <Button onPress={this.onEdit} disabled={disableEdit}>
            <Text>Edit</Text>
          </Button>
          <MoviesDelete movie={movie} disableEdit={disableEdit} />
        </Right>
      </ListItem>
    );
  }
}
