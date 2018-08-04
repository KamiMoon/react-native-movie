import React, { Component } from "react";
import { AppRegistry, Text, TextInput, View, Button } from "react-native";

export default class MoviesAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      year: "",
      title: ""
    };
  }

  onChangeText = (text, property) => {
    this.setState({
      ...this.state,
      [property]: text
    });
  };

  onSave = () => {
    console.log("saved");
  };

  render() {
    const { navigation } = this.props;
    const id = navigation.getParam("id", "");
    const mode = navigation.getParam("mode", "Add");

    return (
      <View style={{ padding: 10 }}>
        <View>
          <Text>{mode} Movie</Text>
        </View>
        <View>
          <TextInput
            style={{ height: 40 }}
            placeholder="Title"
            onChangeText={this.onChangeText.bind("title")}
          />
          <TextInput
            style={{ height: 40 }}
            placeholder="Year"
            onChangeText={this.onChangeText.bind("year")}
          />
        </View>
        <View>
          <Button onPress={this.onSave} title="Save" />
        </View>
      </View>
    );
  }
}

// skip this line if using Create React Native App
//AppRegistry.registerComponent("AwesomeProject", () => PizzaTranslator);
