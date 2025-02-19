import axios, { AxiosResponse } from "axios";

// Headers
import { headers } from "./headers";

export const getAllMediaFromSearch = async (queryString: string): Promise<any> => {
  const url = `https://api.themoviedb.org/3/search/${queryString}&language=en-US`;
  const response: AxiosResponse<any> = await axios.get(url, headers);

  return response;
};
