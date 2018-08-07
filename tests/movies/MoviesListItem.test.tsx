import React from "react";
import MoviesListItem from "src/movies/MoviesListItem";
import { shallow } from "enzyme";

describe("MoviesListItem", () => {
  it("renders without crashing", () => {
    shallow(<MoviesListItem />);
  });
});
