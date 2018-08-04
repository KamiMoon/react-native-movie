import React, { Component } from "react";
import { Text, View, TouchableOpacity, Button } from "react-native";

export default class MoviesListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPress(this.props.id);
  };

  _onEdit = () => {
    this.props.onEdit(this.props.id);
  };

  _onDelete = () => {
    this.props.onDelete(this.props.id);
  };

  render() {
    const textColor = this.props.selected ? "red" : "black";
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View>
          <Text style={{ color: textColor }}>{this.props.title}</Text>
          <Button onPress={this._onEdit} title="Edit" />
          <Button onPress={this._onDelete} title="Delete" />
        </View>
      </TouchableOpacity>
    );
  }
}
