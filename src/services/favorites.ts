import axios, { AxiosResponse } from "axios";
import pluralize from "pluralize";

// Headers
import { headers } from "./headers";

export const getFavorites = async (userId: string, type: string): Promise<any> => {
  if (userId && type) {
    const url = `${process.env.REACT_APP_TMDB_ROOT}/account/${userId}/favorite/${
      type === "movie" ? pluralize(type) : type
    }?language=en-US&page=1&sort_by=created_at.desc`;
    const response: AxiosResponse<any> = await axios.get(url, headers);
    return response;
  }
};

export const updateFavorite = async (userId: string, body): Promise<any> => {
  const url = `${process.env.REACT_APP_TMDB_ROOT}/account/${userId}/favorite`;
  const response: AxiosResponse<any> = await axios.post(url, body, { ...headers, method: "POST" });

  return response;
};
