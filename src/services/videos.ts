import axios, { AxiosResponse } from "axios";

// Headers
import { headers } from "./headers";

export const getVideos = async (id: string, type: string): Promise<any> => {
  const url = `https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`;
  const response: AxiosResponse<any> = await axios.get(url, headers);

  return response;
};
