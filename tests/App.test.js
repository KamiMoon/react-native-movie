import React from "react";
import App from "../App";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  //const rendered = renderer.create(<App />).toJSON();
  //expect(rendered).toBeTruthy();

  shallow(<App />);
});
