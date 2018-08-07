import React from "react";
import MoviesListItem from "src/movies/components/list/MoviesListItem";
import { shallow } from "enzyme";

describe("MoviesListItem", () => {
  it("renders without crashing", () => {
    const props = {
      onPress: jest.fn(),
      onEdit: jest.fn(),
      onDelete: jest.fn(),
      movie: {
        year: 1988,
        title: "Some Title"
      },
      disableEdit: true
    };

    shallow(<MoviesListItem {...props} />);
  });
});
