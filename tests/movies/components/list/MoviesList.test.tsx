import React from "react";
import { MoviesList } from "src/movies/components/list/MoviesList";
import { shallow } from "enzyme";
import { getNavigationMock } from "tests/mocks";

describe("MoviesList", () => {
  it("renders without crashing", () => {
    const props = {
      navigation: getNavigationMock(),
      queryMovies: jest.fn(),
      deleteMovie: jest.fn(),
      movies: []
    };

    shallow(<MoviesList {...props} />);
  });
});
