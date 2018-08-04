import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

export default class MoviesList extends Component {
  render() {
    const { navigation } = this.props;
    const id = navigation.getParam("id", "");

    return (
      <View style={styles.container}>
        <Text>View Movie: {id}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  }
});
