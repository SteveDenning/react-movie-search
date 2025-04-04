import axios, { AxiosResponse } from "axios";

// Headers
import { headers } from "./headers";

export const getMedia = async (path: string): Promise<any> => {
  const url = `https://api.themoviedb.org/3/${path}?language=en-US`;
  const response: AxiosResponse<any> = await axios.get(url, headers);

  return response;
};

export const getOmdbMedia = async (title: string): Promise<any> => {
  const url = `https://www.omdbapi.com/?apikey=c43485b9&t=${title}`;
  const response: AxiosResponse<any> = await axios.get(url);

  return response;
};

export const getMediaByID = async (id: string, type: string): Promise<any> => {
  const url = `https://api.themoviedb.org/3/${type}/${id}?append_to_response=videos,recommendations,reviews,images&language=en-US`;

  const response: AxiosResponse<any> = await axios.get(url, headers);

  return response;
};
