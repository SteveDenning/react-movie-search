import axios, { AxiosResponse } from "axios";

// Headers
import { headers } from "./headers";

export const getAllMediaFromSearch = async (queryString: string): Promise<any> => {
  const url = `${process.env.REACT_APP_TMDB_ROOT}/search/${queryString}&language=en-US`;
  const response: AxiosResponse<any> = await axios.get(url, headers);

  return response;
};
