import axios from "axios";

// return a promise

export const getMedia = () =>
  new Promise((resolve, reject) => {
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=true&language=en-US&page=1&sort_by=popularity.desc&year=2000&api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
    axios
      .get(url)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
