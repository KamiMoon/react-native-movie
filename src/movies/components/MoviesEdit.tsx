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

import { getMovie, updateMovie } from "src/movies/state/MoviesState";

import Movie from "src/movies/model/Movie";

interface Props {
  navigation: any;
  isLoading?: boolean;
  disableEdit?: boolean;

  getMovie: any;
  updateMovie: any;
}

interface State {
  movie?: Movie;
}

export class MoviesEdit extends Component<Props, State> {
  year: number;
  title: string;

  constructor(props: Props) {
    super(props);

    const { navigation } = this.props;
    this.year = navigation.getParam("year", "");
    this.title = navigation.getParam("title", "");

    this.state = {};
  }

  loadMovie() {
    if (this.year && this.title) {
      this.props
        .getMovie({ year: this.year, title: this.title })
        .then(result => {
          this.setState({
            movie: result.payload.data
          });
        });
    }
  }

  componentDidMount() {
    this.loadMovie();
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
    this.props.navigation.navigate("MoviesList", {});
  };

  updateMovie = () => {
    const movie = this.state.movie;

    this.props.updateMovie(movie).then(result => {
      Alert.alert(
        "Success",
        `Updated movie ${movie.title}.`,
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
    this.updateMovie();
  };

  render() {
    const movie = this.state.movie;
    const { disableEdit } = this.props;

    return (
      <Container>
        <Header>
          <Body>{movie && <Title>Edit {movie.title}</Title>}</Body>
        </Header>

        {movie ? (
          <Content>
            <Form>
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
        ) : (
          <Content />
        )}
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
  getMovie,
  updateMovie
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesEdit);
