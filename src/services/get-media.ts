import axios, { AxiosResponse } from "axios";

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

export const getMedia = async (path: string): Promise<any> => {
  const url = `${apiUrl}/${path}?page=1&language=en-US`;
  const response: AxiosResponse<any> = await await axios.get(url, headers);

  return response;
};
