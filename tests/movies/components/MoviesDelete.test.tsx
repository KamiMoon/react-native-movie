import React from "react";
import Movie from "src/movies/model/Movie";

import { MoviesDelete } from "src/movies/components/MoviesDelete";
import { shallow } from "enzyme";

describe("MoviesDelete", () => {
  it("renders without crashing", () => {
    const props = {
      movie: {} as Movie,
      disableEdit: false,
      deleteMovie: jest.fn()
    };

    shallow(<MoviesDelete {...props} />);
  });
});
