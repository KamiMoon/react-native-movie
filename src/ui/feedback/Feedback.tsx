import React, { Component } from "react";
import { connect } from "react-redux";

import { View, Text } from "react-native";

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
          <View>
            <Text>{feedback.title}</Text>
            <Text>{feedback.msg}</Text>
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
