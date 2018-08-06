import React from "react";
import MoviesAddEdit from "src/movies/MoviesAddEdit";
import { shallow } from "enzyme";
import { getNavigationMock } from "tests/mocks";

describe("MoviesAddEdit", () => {
  it("renders without crashing", () => {
    const navigation = getNavigationMock();
    shallow(<MoviesAddEdit navigation={navigation} />);
  });
});
