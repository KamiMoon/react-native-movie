export function getNavigationMock() {
  return {
    navigate: jest.fn(),
    getParam: jest.fn()
  };
}
