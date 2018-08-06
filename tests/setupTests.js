import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// This will mutate `react-native`'s require cache with `react-native-mock`'s.
require("react-native-mock-render/mock"); // <-- side-effects!!!

Enzyme.configure({ adapter: new Adapter() });

jest.mock("axios", () => {
  const mockAxios = {
    post: jest.fn().mockImplementation((url, obj) => Promise.resolve({})),
    get: jest.fn().mockImplementation(url => Promise.resolve({})),
    put: jest.fn().mockImplementation((url, obj) => Promise.resolve({})),
    delete: jest.fn().mockImplementation(url => Promise.resolve({}))
  };

  return mockAxios;
});
