import React from "react";
import { MoviesEdit } from "src/movies/components/MoviesEdit";
import { shallow } from "enzyme";
import { getNavigationMock } from "tests/mocks";

describe("MoviesEdit", () => {
  it("renders without crashing", () => {
    const props = {
      navigation: getNavigationMock(),
      getMovie: jest.fn(),
      createMovie: jest.fn(),
      updateMovie: jest.fn()
    };

    shallow(<MoviesEdit {...props} />);
  });
});
