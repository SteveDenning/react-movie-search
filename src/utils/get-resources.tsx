import axios from "axios";

const apiUrl = "https://api.themoviedb.org/3";
const authorization =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmZlNTY4YjRjYjgzN2I5NjhiOTQ2ZmI1MmU5YWZlMSIsIm5iZiI6MTcyOTkzODAyNS43NzY1MzEsInN1YiI6IjY3MTBkYmQ3MWI5MTJhZGQyZWRiZDU5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x2CmY6K8b55TaEp_d4BzsxlLZfQLdbb8PuqRdEcdYwQ";

const headers = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: authorization,
  },
};

export const getMedia = (pathName: string) =>
  new Promise((resolve, reject) => {
    const url = `${apiUrl}/${pathName}?page=1&language=en-US`;
    axios
      .get(url, headers)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const getAllMediaFromSearch = (queryString: string) =>
  new Promise((resolve, reject) => {
    const url = `${apiUrl}/search/${queryString}&language=en-US`;
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

// Account requests
// **********************************************************************
export const getRequestToken = () =>
  new Promise((resolve, reject) => {
    const url = "https://api.themoviedb.org/3/authentication/token/new";
    axios
      .get(url, headers)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const createSessionWithLogin = (body) =>
  new Promise((resolve, reject) => {
    const url = "https://api.themoviedb.org/3/authentication/session/new";
    axios
      .post(url, body, { ...headers, method: "POST" })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const deleteSession = (sessionId) =>
  new Promise((resolve, reject) => {
    const url = "https://api.themoviedb.org/3/authentication/session";
    axios
      .delete(url, {
        ...headers,
        method: "DELETE",
        data: {
          session_id: sessionId,
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const getAccountDetails = (sessionId: string) =>
  new Promise((resolve, reject) => {
    const url = `https://api.themoviedb.org/3/account?session_id=${sessionId}`;
    axios
      .get(url, headers)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
