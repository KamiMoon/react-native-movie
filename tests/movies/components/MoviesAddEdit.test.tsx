import React from "react";
import { MoviesAddEdit } from "src/movies/components/MoviesAddEdit";
import { shallow } from "enzyme";
import { getNavigationMock } from "tests/mocks";

describe("MoviesAddEdit", () => {
  it("renders without crashing", () => {
    const props = {
      navigation: getNavigationMock(),
      getMovie: jest.fn(),
      createMovie: jest.fn(),
      updateMovie: jest.fn()
    };

    shallow(<MoviesAddEdit {...props} />);
  });
});
