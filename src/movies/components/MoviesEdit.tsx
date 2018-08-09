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
  Text,
  Title
} from "native-base";
import {
  Field,
  InjectedFormProps,
  reduxForm,
  TextInput,
  pFloat,
  pInt,
  vInt,
  vFloat
} from "src/ui/form";
import Feedback from "src/ui/feedback/Feedback";

import { getMovie, updateMovie } from "src/movies/state/MoviesState";
import Movie from "src/movies/model/Movie";

interface Props {
  navigation: any;
  getMovie: any;
  updateMovie: any;
  movie: Movie;
}

export class MoviesEdit extends Component<
  Props & InjectedFormProps<any, Props>
> {
  loadMovie() {
    const { navigation } = this.props;
    const year = navigation.getParam("year", "");
    const title = navigation.getParam("title", "");

    if (year && title) {
      this.props.getMovie({ year: year, title: title });
    }
  }

  componentDidMount() {
    this.loadMovie();
  }

  goToList = () => {
    this.props.navigation.navigate("MoviesList", {});
  };

  updateMovie = (movie: Movie) => {
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

  onSave = values => {
    return this.updateMovie({ ...values.movie });
  };

  render() {
    const { handleSubmit, submitting, movie } = this.props;

    return (
      <Container>
        <Header>
          <Body>{movie && <Title>Edit {movie.title}</Title>}</Body>
        </Header>

        {movie ? (
          <Content>
            <Form>
              <Field
                name="movie.info.rating"
                label="Rating:"
                keyboardType="numeric"
                component={TextInput}
                parse={pFloat}
                validate={[vInt]}
              />
              <Field
                name="movie.info.plot"
                label="Plot:"
                multiline={true}
                numberOfLines={4}
                component={TextInput}
              />
              <Field
                name="movie.info.rank"
                label="Rank:"
                keyboardType="numeric"
                component={TextInput}
                parse={pInt}
                validate={[vFloat]}
              />
            </Form>

            <Feedback />

            <Button
              block
              style={{ margin: 15, marginTop: 50 }}
              onPress={handleSubmit(this.onSave)}
              disabled={submitting}
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

const MoviesEditForm = reduxForm({
  form: "MoviesEdit"
})(MoviesEdit);

const mapStateToProps = state => {
  return {
    initialValues: state.movies.movie ? { movie: state.movies.movie } : null,
    movie: state.movies.movie
  };
};

const mapDispatchToProps = {
  getMovie,
  updateMovie
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesEditForm);
