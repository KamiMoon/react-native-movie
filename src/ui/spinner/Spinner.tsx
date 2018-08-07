import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

export default class Spinner extends Component {
  render() {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator />
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
