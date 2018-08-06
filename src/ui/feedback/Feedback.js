import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

//TODO: color based on type/tile/msg
export default class Feedback extends Component {
  render() {
    const feedback = this.props.feedback;

    return (
      <View>
        <Text>{feedback.title}</Text>
        <Text>{feedback.msg}</Text>
      </View>
    );
  }
}

//TODO: movie these?

export function getInitialState() {
  return {
    isLoading: true,
    disableEdit: false,
    feedback: {
      show: false
    }
  };
}

export function getLoadingState() {
  return {
    isLoading: true,
    disableEdit: true,
    feedback: {}
  };
}

export function getAfterLoadingState() {
  return {
    isLoading: false,
    disableEdit: false
  };
}

export function getError(e) {
  const errorMsg =
    e.response && e.response.data && e.response.data.message
      ? e.response.data.message
      : e.toString();

  return {
    isLoading: false,
    disableEdit: false,
    feedback: {
      show: true,
      title: "Error",
      msg: errorMsg
    }
  };
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
