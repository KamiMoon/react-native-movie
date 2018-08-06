import React from "react";
import MoviesList from "src/movies/MoviesList";
import { shallow } from "enzyme";

describe("MoviesList", () => {
  it("renders without crashing", () => {
    shallow(<MoviesList />);
  });
});
