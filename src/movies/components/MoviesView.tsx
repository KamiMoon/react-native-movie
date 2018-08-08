import React, { Component } from "react";
import { connect } from "react-redux";
import { Image } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Left,
  Body,
  H2
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

import { getMovie } from "src/movies/state/MoviesState";
import Movie from "src/movies/model/Movie";

interface Props {
  navigation: any;
  movie: Movie;
  getMovie: any;
}

export class MoviesView extends Component<Props> {
  loadMovie() {
    const { navigation } = this.props;
    const year = navigation.getParam("year", "");
    const title = navigation.getParam("title", "");

    if (year && title) {
      this.props.getMovie({
        year,
        title
      });
    }
  }

  componentDidMount() {
    this.loadMovie();
  }

  render() {
    const { movie } = this.props;

    return (
      <Container>
        {movie && (
          <Content>
            <Card style={{ flex: 0 }}>
              <CardItem>
                <Left>
                  <Body>
                    <H2>{movie.title}</H2>
                    <Text note>{movie.year}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem>
                <Body>
                  <Image
                    source={{ uri: movie.info.image_url }}
                    style={{ height: 500, width: 350, flex: 1 }}
                  />
                  <Text>{movie.info.plot}</Text>
                </Body>
              </CardItem>
            </Card>

            <Card>
              <CardItem>
                <Body>
                  <Grid>
                    <Col>
                      <Row>
                        <Text>Genres:</Text>
                      </Row>
                      <Row>
                        <Text>Release Date:</Text>
                      </Row>
                      <Row>
                        <Text>Run time (secs):</Text>
                      </Row>
                      <Row>
                        <Text>Rating:</Text>
                      </Row>
                      <Row>
                        <Text>Rank:</Text>
                      </Row>
                      <Row>
                        <Text>Directors:</Text>
                      </Row>
                      <Row>
                        <Text>Actors:</Text>
                      </Row>
                    </Col>
                    <Col>
                      <Row>
                        <Text>
                          {movie.info.genres && movie.info.genres.join(", ")}
                        </Text>
                      </Row>
                      <Row>
                        <Text>{movie.info.release_date}</Text>
                      </Row>
                      <Row>
                        <Text>{movie.info.running_time_secs}</Text>
                      </Row>
                      <Row>
                        <Text>{movie.info.rating}</Text>
                      </Row>
                      <Row>
                        <Text>{movie.info.rank}</Text>
                      </Row>
                      <Row>
                        <Text>
                          {movie.info.directors &&
                            movie.info.directors.join(", ")}
                        </Text>
                      </Row>
                      <Row>
                        <Text>
                          {movie.info.actors && movie.info.actors.join(", ")}
                        </Text>
                      </Row>
                    </Col>
                  </Grid>
                </Body>
              </CardItem>
            </Card>
          </Content>
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
  getMovie
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesView);
