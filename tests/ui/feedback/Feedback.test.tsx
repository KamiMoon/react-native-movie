import React from "react";
import { Feedback } from "src/ui/feedback/Feedback";
import { shallow } from "enzyme";

describe("Feedback", () => {
  it("renders without crashing", () => {
    shallow(<Feedback />);
  });
});
