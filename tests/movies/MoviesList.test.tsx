import React from "react";
import MoviesList from "src/movies/MoviesList";
import { shallow } from "enzyme";
import { getNavigationMock } from "tests/mocks";

describe("MoviesList", () => {
  it("renders without crashing", () => {
    const navigation = getNavigationMock();
    shallow(<MoviesList navigation={navigation} />);
  });
});
