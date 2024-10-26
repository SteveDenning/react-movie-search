import axios from "axios";

const headers = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmZlNTY4YjRjYjgzN2I5NjhiOTQ2ZmI1MmU5YWZlMSIsIm5iZiI6MTcyOTkzODAyNS43NzY1MzEsInN1YiI6IjY3MTBkYmQ3MWI5MTJhZGQyZWRiZDU5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x2CmY6K8b55TaEp_d4BzsxlLZfQLdbb8PuqRdEcdYwQ",
  },
};

export const getMediaById = (id: string) =>
  new Promise((resolve, reject) => {
    const url = `XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX${id}?language=en-US&api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
    axios
      .get(url, headers)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const getMedia = (keyword: string) =>
  new Promise((resolve, reject) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=1`;
    axios
      .get(url, headers)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
