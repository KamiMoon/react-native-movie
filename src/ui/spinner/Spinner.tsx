import React, { Component } from "react";
import { connect } from "react-redux";

import { View, ActivityIndicator } from "react-native";
import styles from "./Spinner.styles";

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

export default connect(mapStateToProps)(LoadingSpinner);
