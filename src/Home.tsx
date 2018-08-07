import React from "react";
import { Button, ScrollView } from "react-native";

export interface Props {
  navigation: any;
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
