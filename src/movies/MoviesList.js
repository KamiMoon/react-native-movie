import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert
} from "react-native";

import MoviesListItem from "./MoviesListItem";

const data = [
  { id: "Devin" },
  { id: "Jackson" },
  { id: "James" },
  { id: "Joel" },
  { id: "John" },
  { id: "Jillian" },
  { id: "Jimmy" },
  { id: "Julie" },
  { id: "A" },
  { id: "B" },
  { id: "C" },
  { id: "D" },
  { id: "E" },
  { id: "F" },
  { id: "G" },
  { id: "H" },
  { id: "I" },
  { id: "J" },
  { id: "K" },
  { id: "L" }
];

export default class MoviesList extends Component {
  constructor(props) {
    super(props);
  }

  _keyExtractor = (item, index) => item.id;

  _onPressItem = id => {
    this.props.navigation.navigate("MoviesView", { id });
  };

  _onDeleteItem = id => {
    Alert.alert("deleted");
  };

  _onEditItem = id => {
    this.props.navigation.navigate("MoviesAddEdit", { mode: "Edit", id });
  };

  _renderItem = ({ item }) => (
    <MoviesListItem
      id={item.id}
      onPress={this._onPressItem}
      onDelete={this._onDeleteItem}
      onEdit={this._onEditItem}
      title={item.id}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
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
