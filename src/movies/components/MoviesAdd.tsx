import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert } from "react-native";
import {
  Body,
  Button,
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Text,
  Title
} from "native-base";

import { createMovie } from "src/movies/state/MoviesState";

import Movie from "src/movies/model/Movie";

interface Props {
  navigation: any;
  isLoading?: boolean;
  disableEdit?: boolean;

  createMovie: any;
}

interface State {
  movie?: Movie;
}

export class MoviesAdd extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      movie: {
        year: 1988,
        title: "",
        info: {
          rating: "",
          plot: "",
          rank: ""
        }
      }
    };
  }

  onChangeText = (property, text) => {
    const newState = { ...this.state };

    const properties = property.split(".");

    //TOOD: better
    if (properties.length === 2) {
      newState[properties[0]][properties[1]] = text;
    } else if (properties.length === 3) {
      newState[properties[0]][properties[1]][properties[2]] = text;
    }

    this.setState(newState, () => {
      console.log(this.state);
    });
  };

  goToList = () => {
    this.props.navigation.navigate("MoviesList");
  };

  addMovie = () => {
    const movie = this.state.movie;

    this.props.createMovie(movie).then(result => {
      Alert.alert(
        "Success",
        `Created movie ${movie.title}.`,
        [
          {
            text: "OK",
            onPress: this.goToList
          }
        ],
        { cancelable: false }
      );
    });
  };

  onSave = () => {
    this.addMovie();
  };

  render() {
    const movie = this.state.movie;
    const { disableEdit } = this.props;

    return (
      <Container>
        <Header>
          <Body>
            <Title>Add Movie</Title>
          </Body>
        </Header>

        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Title</Label>
              <Input
                value={movie.title}
                onChangeText={this.onChangeText.bind(this, "movie.title")}
              />
            </Item>
            <Item stackedLabel>
              <Label>Rating</Label>
              <Input
                keyboardType="numeric"
                value={"" + movie.info.rating}
                onChangeText={text => {
                  //TODO: this is bad
                  const converted = parseFloat(text) || 0.0;
                  this.onChangeText("movie.info.rating", converted);
                }}
              />
            </Item>
            <Item stackedLabel>
              <Label>Plot</Label>
              <Input
                value={movie.info.plot}
                multiline={true}
                numberOfLines={4}
                onChangeText={this.onChangeText.bind(this, "movie.info.plot")}
              />
            </Item>
            <Item stackedLabel>
              <Label>Rank</Label>
              <Input
                keyboardType="numeric"
                value={"" + movie.info.rank}
                onChangeText={text => {
                  //TODO: this is bad
                  const converted = parseInt(text, 10) || 0;
                  this.onChangeText("movie.info.rank", converted);
                }}
              />
            </Item>
          </Form>
          <Button
            block
            style={{ margin: 15, marginTop: 50 }}
            onPress={this.onSave}
            disabled={disableEdit}
          >
            <Text>Save</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.movies
  };
};

const mapDispatchToProps = {
  createMovie
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesAdd);
