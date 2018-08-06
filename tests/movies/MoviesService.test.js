import MoviesService from "src/movies/MoviesService";

describe("MoviesService", () => {
  it("can be created", () => {
    const moviesService = new MoviesService();
    expect(moviesService).toBeTruthy();
  });
});
