import axios, { AxiosResponse } from "axios";

// Headers
import { headers } from "./headers";

export const getGenres = async (mediaType: string): Promise<any> => {
  const url = `${process.env.REACT_APP_TMDB_ROOT}/genre/${mediaType}/list?language=en-US`;
  const response: AxiosResponse<any> = await axios.get(url, headers);

  return response;
};
