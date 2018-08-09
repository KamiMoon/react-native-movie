import React from "react";
import Movie from "src/movies/model/Movie";
import { MoviesEdit } from "src/movies/components/MoviesEdit";
import { shallow } from "enzyme";
import { getNavigationMock, ReduxFormProps } from "tests/mocks";

describe("MoviesEdit", () => {
  it("renders without crashing", () => {
    const props = {
      navigation: getNavigationMock(),
      getMovie: jest.fn(),
      updateMovie: jest.fn(),
      movie: {} as Movie,
      ...new ReduxFormProps(),
      handleSubmit: jest.fn()
    };

    shallow(<MoviesEdit {...props} />);
  });
});
