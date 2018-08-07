import MoviesService from "src/movies/MoviesService";

const moviesService = new MoviesService();

const movie = {
  year: 1988,
  title: "Some stuff"
};

describe("MoviesService", () => {
  it("creates a movie", () => {
    return moviesService.create(movie).then(response => {
      expect(response).toEqual({});
    });
  });

  it("queries a movie", () => {
    return moviesService.query(movie).then(response => {
      expect(response).toEqual({});
    });
  });

  it("gets a movie", () => {
    return moviesService.get(movie).then(response => {
      expect(response).toEqual({});
    });
  });

  it("updates a movie", () => {
    return moviesService.update(movie).then(response => {
      expect(response).toEqual({});
    });
  });

  it("removes a movie", () => {
    return moviesService.remove(movie).then(response => {
      expect(response).toEqual({});
    });
  });
});
