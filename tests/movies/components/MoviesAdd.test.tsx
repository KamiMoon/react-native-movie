import React from "react";
import { MoviesAdd } from "src/movies/components/MoviesAdd";
import { shallow } from "enzyme";
import { getNavigationMock, ReduxFormProps } from "tests/mocks";

describe("MoviesAdd", () => {
  it("renders without crashing", () => {
    const props = {
      navigation: getNavigationMock(),
      createMovie: jest.fn(),
      ...new ReduxFormProps(),
      handleSubmit: jest.fn()
    };

    shallow(<MoviesAdd {...props} />);
  });
});
