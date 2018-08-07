import axios from "axios";

//TODO: don't hardcode here

//local
//const url = "http://192.168.0.8:8000";

//prod
const url = "https://dujxlnj50a.execute-api.us-east-2.amazonaws.com/Prod";

import Movie from "src/movies/Movie";

export function convertData(data: Array<Movie>) {
  //generate an id
  return data.map(item => {
    return {
      ...item,
      id: item.year + "__" + item.title
    };
  });
}

export default class MoviesService {
  create(movie: Movie) {
    return axios.post(`${url}/movies`, movie);
  }

  //TODO: get rid of hardcode
  query(movie: any) {
    return axios.get(`${url}/movies`, { params: { year: 1988 } });
  }

  get(movie: Movie) {
    return axios.get(`${url}/movies/${movie.year}/${movie.title}`);
  }

  update(movie: Movie) {
    return axios.put(`${url}/movies/${movie.year}/${movie.title}`, movie);
  }

  remove(movie: Movie) {
    return axios.delete(`${url}/movies/${movie.year}/${movie.title}`);
  }
}
