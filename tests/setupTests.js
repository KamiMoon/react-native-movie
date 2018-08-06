import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// This will mutate `react-native`'s require cache with `react-native-mock`'s.
require("react-native-mock-render/mock"); // <-- side-effects!!!

Enzyme.configure({ adapter: new Adapter() });
