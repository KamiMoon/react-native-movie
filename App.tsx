import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";

import store from "src/state/storeInstance";
import Navigator from "src/Navigator";

import Spinner from "src/ui/spinner/Spinner";
import Feedback from "src/ui/feedback/Feedback";

export default class extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Feedback />
          <Navigator />
          <Spinner />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
    //marginTop: 10
  }
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });
