import React, { Component } from "react";
import { connect } from "react-redux";

import { View, Text, StyleSheet } from "react-native";

export interface FeedbackType {
  title?: string;
  msg?: string;
}

interface Props {
  show?: boolean;
  feedback?: FeedbackType;
}

//TODO: color based on type/tile/msg
export class Feedback extends Component<Props> {
  render() {
    if (!this.props.show) {
      return <View />;
    }

    const feedback = this.props.feedback;

    return (
      <View>
        {feedback && (
          <View style={styles.container}>
            <Text style={styles.title}>{feedback.title}</Text>
            <Text style={styles.msg}>{feedback.msg}</Text>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.feedback
});

export default connect(mapStateToProps)(Feedback);

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  },
  title: {
    fontSize: 19,
    fontWeight: "bold",
    color: "red"
  },
  msg: {
    color: "red"
  }
});
