import axios from "axios";

//TODO: don't hardcode here

//local
const url = "http://192.168.0.8:8000";

//prod
//const url = "https://dujxlnj50a.execute-api.us-east-2.amazonaws.com/Prod";

export function convertData(data) {
  //generate an id
  return data.map(item => {
    return {
      ...item,
      id: item.year + "__" + item.title
    };
  });
}

export default class MoviesService {
  create(movie) {
    return axios.post(`${url}/movies`, movie);
  }

  query(movie) {
    return axios.get(`${url}/movies`, { params: { year: 1988 } });
  }

  get(movie) {
    return axios.get(`${url}/movies/${movie.year}/${movie.title}`);
  }

  update(movie) {
    return axios.put(`${url}/movies/${movie.year}/${movie.title}`, movie);
  }

  remove(movie) {
    return axios.delete(`${url}/movies/${movie.year}/${movie.title}`);
  }
}
