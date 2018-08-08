import React from "react";
import {
  Container,
  Header,
  Title,
  Button,
  Body,
  Content,
  Text,
  Card,
  CardItem
} from "native-base";

export interface Props {
  navigation: any;
}

export default class Home extends React.Component<Props> {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <Header>
          <Body>
            <Title>Home</Title>
          </Body>
        </Header>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Text>Movie Database App</Text>
              </Body>
            </CardItem>
          </Card>
          <Button
            full
            rounded
            dark
            style={{ marginTop: 10 }}
            onPress={() => navigate("MoviesList")}
          >
            <Text>Search Movies</Text>
          </Button>

          <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() => navigate("MoviesAddEdit", { mode: "Add" })}
          >
            <Text>Add Movie</Text>
          </Button>

          <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() => navigate("ExampleForm")}
          >
            <Text>Example Form</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
