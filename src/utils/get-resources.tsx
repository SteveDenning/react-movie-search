import axios from "axios";

const apiUrl = "https://api.themoviedb.org/3";
const headers = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmZlNTY4YjRjYjgzN2I5NjhiOTQ2ZmI1MmU5YWZlMSIsIm5iZiI6MTcyOTkzODAyNS43NzY1MzEsInN1YiI6IjY3MTBkYmQ3MWI5MTJhZGQyZWRiZDU5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x2CmY6K8b55TaEp_d4BzsxlLZfQLdbb8PuqRdEcdYwQ",
  },
};

export const getAllMedia = (queryString: string) =>
  new Promise((resolve, reject) => {
    const url = `${apiUrl}/search/multi${queryString}&language=en-US`;
    axios
      .get(url, headers)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const getMediaByID = (id: string, type: string) =>
  new Promise((resolve, reject) => {
    const url = `${apiUrl}/${type}/${id}?language=en-US`;
    axios
      .get(url, headers)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

// **********************************************************************

export const getLatestReleases = (path: string, query = "?page=1") =>
  new Promise((resolve, reject) => {
    const url = `${apiUrl}/${path}${query}&language=en-US`;

    axios
      .get(url, headers)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const getVideos = (id: string, type: string) =>
  new Promise((resolve, reject) => {
    const url = `${apiUrl}/${type}/${id}/videos?language=en-US`;
    axios
      .get(url, headers)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const getCredits = (id: string, type: string) =>
  new Promise((resolve, reject) => {
    const url = `${apiUrl}/${type}/${id}/credits?language=en-US`;
    axios
      .get(url, headers)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const getMedia = (pathName: string) =>
  new Promise((resolve, reject) => {
    const url = `${apiUrl}/${pathName}?page=1`;
    axios
      .get(url, headers)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
