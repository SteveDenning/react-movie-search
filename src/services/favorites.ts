import axios, { AxiosResponse } from "axios";
import pluralize from "pluralize";

// Headers
import { headers } from "./headers";

export const getFavorites = async (user: any, type: string): Promise<any> => {
  if (user && type) {
    const url = `https://api.themoviedb.org/3/account/${user.account_id}/favorite/${
      type === "movie" ? pluralize(type) : type
    }?language=en-US&page=1&sort_by=created_at.desc&session_id=${user.session_id}`;
    const response: AxiosResponse<any> = await axios.get(url, headers);

    return response;
  }
};

export const updateFavorite = async (user: any, body): Promise<any> => {
  if (user) {
    const url = `https://api.themoviedb.org/3/account/${user.account_id}/favorite?session_id=${user.session_id}`;
    const response: AxiosResponse<any> = await axios.post(url, body, { ...headers, method: "POST" });

    return response;
  }
};
