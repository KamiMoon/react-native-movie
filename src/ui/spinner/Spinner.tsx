import React, { Component } from "react";
import { connect } from "react-redux";

import { StyleSheet, View, ActivityIndicator } from "react-native";

interface Props {
  showLoadingSpinner?: boolean;
}

export class LoadingSpinner extends Component<Props> {
  render() {
    if (!this.props.showLoadingSpinner) {
      return <View />;
    }

    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  showLoadingSpinner: state.loadingSpinner.show
});

export const showLoadingSpinner = () => ({
  type: "SHOW_LOADING_SPINNER"
});

export const hideLoadingSpinner = () => ({
  type: "HIDE_LOADING_SPINNER"
});

export function loadingSpinnerReducer(state = { show: false }, action) {
  if (action.type === "SHOW_LOADING_SPINNER") {
    return {
      show: true
    };
  } else if (action.type === "HIDE_LOADING_SPINNER") {
    return {
      show: false
    };
  }

  return state;
}

export default connect(mapStateToProps)(LoadingSpinner);

const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});
