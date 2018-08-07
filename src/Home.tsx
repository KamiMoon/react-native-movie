import React from "react";
import { Button, ScrollView } from "react-native";

import { NavigationScreenProp } from "react-navigation";

export interface Props {
  navigation: NavigationScreenProp<object>;
}

export default class Home extends React.Component<Props> {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <ScrollView>
        <Button
          title="Search Movies"
          onPress={() => navigate("MoviesList", {})}
        />
        <Button
          title="Add Movie"
          onPress={() => navigate("MoviesAddEdit", { mode: "Add" })}
        />
      </ScrollView>
    );
  }
}
