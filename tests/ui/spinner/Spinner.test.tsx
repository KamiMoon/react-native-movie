import React from "react";
import { LoadingSpinner } from "src/ui/spinner/Spinner";
import { shallow } from "enzyme";

describe("Spinner", () => {
  it("renders without crashing", () => {
    shallow(<LoadingSpinner />);
  });
});
