import React, { Component } from "react";
import { Text, View, TouchableOpacity, Button } from "react-native";

interface Props {
  onPress?: any;
  onEdit?: any;
  onDelete?: any;
  movie?: any;
  disableEdit?: boolean;
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
      <View>
        {this.props.movie && (
          <TouchableOpacity onPress={this.onPress}>
            <View>
              <Text>{this.props.movie.title}</Text>
              <Text>{this.props.movie.year}</Text>
            </View>
          </TouchableOpacity>
        )}
        {this.props.movie && (
          <View>
            <Button
              onPress={this.onEdit}
              title="Edit"
              disabled={this.props.disableEdit}
            />
            <Button
              onPress={this.onDelete}
              title="Delete"
              disabled={this.props.disableEdit}
            />
          </View>
        )}
      </View>
    );
  }
}
