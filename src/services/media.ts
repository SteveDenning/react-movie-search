import axios, { AxiosResponse } from "axios";

// Headers
import { headers } from "./headers";

export const getMedia = async (path: string): Promise<any> => {
  const url = `${process.env.REACT_APP_TMDB_ROOT}/${path}?page=1&language=en-US`;
  const response: AxiosResponse<any> = await axios.get(url, headers);

  return response;
};

export const getMediaByID = async (id: string, type: string): Promise<any> => {
  const url = `${process.env.REACT_APP_TMDB_ROOT}/${type}/${id}?language=en-US`;

  const response: AxiosResponse<any> = await axios.get(url, headers);

  return response;
};
