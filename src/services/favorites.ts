import axios, { AxiosResponse } from "axios";
import pluralize from "pluralize";

// Headers
import { headers } from "./headers";

const sessionId = sessionStorage.getItem("session_id");

export const getFavorites = async (userId: string, type: string): Promise<any> => {
  if (userId && type) {
    const url = `https://api.themoviedb.org/3/account/${userId}/favorite/${
      type === "movie" ? pluralize(type) : type
    }?language=en-US&page=1&sort_by=created_at.desc&session_id=${sessionId}`;
    const response: AxiosResponse<any> = await axios.get(url, headers);

    return response;
  }
};

export const updateFavorite = async (userId: string, body): Promise<any> => {
  const url = `https://api.themoviedb.org/3/account/${userId}/favorite?session_id=${sessionId}`;
  const response: AxiosResponse<any> = await axios.post(url, body, { ...headers, method: "POST" });

  return response;
};
