import React from "react";
import MoviesView from "src/movies/MoviesView";
import { shallow } from "enzyme";
import { getNavigationMock } from "tests/mocks";

describe("MoviesView", () => {
  it("renders without crashing", () => {
    const navigation = getNavigationMock();
    shallow(<MoviesView navigation={navigation} />);
  });
});
