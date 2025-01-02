import axios, { AxiosResponse } from "axios";
import pluralize from "pluralize";

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
export const getFavorites = async (userId: string, type: string): Promise<any> => {
  if (userId && type) {
    const url = `${apiUrl}/account/${userId}/favorite/${type === "movie" ? pluralize(type) : type}?language=en-US&page=1&sort_by=created_at.desc`;
    const response: AxiosResponse<any> = await await axios.get(url, headers);
    return response;
  }
};

export const updateFavorite = async (userId: string, body): Promise<any> => {
  const url = `${apiUrl}/account/${userId}/favorite`;
  const response: AxiosResponse<any> = await await axios.post(url, body, { ...headers, method: "POST" });

  return response;
};
