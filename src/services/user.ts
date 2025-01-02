import axios, { AxiosResponse } from "axios";

// Headers
import { headers } from "./headers";

export const getRequestToken = async (): Promise<any> => {
  const url = `${process.env.REACT_APP_TMDB_ROOT}/authentication/token/new`;
  const response: AxiosResponse<any> = await axios.get(url, headers);

  return response;
};

export const createSessionWithLogin = async (body: any): Promise<any> => {
  const url = `${process.env.REACT_APP_TMDB_ROOT}/authentication/session/new`;
  const response: AxiosResponse<any> = await axios.post(url, body, { ...headers, method: "POST" });

  return response;
};

export const deleteSession = async (sessionId: string): Promise<any> => {
  const url = `${process.env.REACT_APP_TMDB_ROOT}/authentication/session`;
  const response: AxiosResponse<any> = await axios.delete(url, {
    ...headers,
    method: "DELETE",
    data: {
      session_id: sessionId,
    },
  });

  return response;
};

export const getAccountDetails = async (sessionId: string): Promise<any> => {
  const url = `${process.env.REACT_APP_TMDB_ROOT}/account?session_id=${sessionId}`;
  const response: AxiosResponse<any> = await axios.get(url, headers);

  return response;
};
