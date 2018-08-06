import React from "react";
import Spinner from "src/ui/spinner/Spinner";
import { shallow } from "enzyme";

describe("Spinner", () => {
  it("renders without crashing", () => {
    shallow(<Spinner />);
  });
});
