import axios, { AxiosResponse } from "axios";

// Headers
import { headers } from "./headers";

export const getVideos = async (id: string, type: string): Promise<any> => {
  const url = `${process.env.REACT_APP_TMDB_ROOT}/3/${type}/${id}/videos?language=en-US`;
  const response: AxiosResponse<any> = await axios.get(url, headers);

  return response;
};
