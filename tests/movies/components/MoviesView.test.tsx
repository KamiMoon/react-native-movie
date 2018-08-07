import React from "react";
import { MoviesView } from "src/movies/components/MoviesView";
import { shallow } from "enzyme";
import { getNavigationMock } from "tests/mocks";

describe("MoviesView", () => {
  it("renders without crashing", () => {
    const navigation = getNavigationMock();

    const props = {
      navigation: getNavigationMock(),
      getMovie: jest.fn(),
      movie: null
    };

    shallow(<MoviesView {...props} />);
  });
});
