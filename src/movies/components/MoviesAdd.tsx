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
  vRequired,
  vInt,
  vFloat
} from "src/ui/form";
import Feedback from "src/ui/feedback/Feedback";

import { createMovie } from "src/movies/state/MoviesState";
import Movie from "src/movies/model/Movie";

const initialState = {
  movie: {
    year: 1988
  }
};

interface Props {
  navigation: any;
  createMovie: any;
}

export class MoviesAdd extends Component<
  Props & InjectedFormProps<any, Props>
> {
  goToList = () => {
    this.props.navigation.navigate("MoviesList");
  };

  addMovie = (movie: Movie) => {
    return this.props.createMovie(movie).then(result => {
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

  onSave = values => {
    return this.addMovie({ ...values.movie });
  };

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <Container>
        <Header>
          <Body>
            <Title>Add Movie</Title>
          </Body>
        </Header>
        <Content>
          <Form>
            <Field
              name="movie.title"
              label="Title:"
              component={TextInput}
              validate={[vRequired]}
            />
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
      </Container>
    );
  }
}

const mapDispatchToProps = {
  createMovie
};

const ConnectedForm = connect(
  null,
  mapDispatchToProps
)(MoviesAdd);

export default reduxForm({
  form: "MoviesAdd",
  initialValues: initialState
})(ConnectedForm);
