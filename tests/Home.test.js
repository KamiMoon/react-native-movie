import React from "react";
import Home from "src/Home";
import { shallow } from "enzyme";
import { getNavigationMock } from "tests/mocks";

describe("Home", () => {
  it("renders without crashing", () => {
    const navigation = getNavigationMock();

    shallow(<Home navigation={navigation} />);
  });
});
