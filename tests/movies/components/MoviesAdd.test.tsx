import React from "react";
import { MoviesAdd } from "src/movies/components/MoviesAdd";
import { shallow } from "enzyme";
import { getNavigationMock } from "tests/mocks";

describe("MoviesAdd", () => {
  it("renders without crashing", () => {
    const props = {
      navigation: getNavigationMock(),
      createMovie: jest.fn()
    };

    shallow(<MoviesAdd {...props} />);
  });
});
