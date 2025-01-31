import axios, { AxiosResponse } from "axios";

// Headers
import { headers } from "./headers";

export const getGenres = async (mediaType: string): Promise<any> => {
  const url = `https://api.themoviedb.org/3/genre/${mediaType}/list?language=en-US`;
  const response: AxiosResponse<any> = await axios.get(url, headers);

  return response;
};
