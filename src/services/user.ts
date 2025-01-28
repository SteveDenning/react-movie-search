import axios, { AxiosResponse } from "axios";

// Headers
import { headers } from "./headers";

export const getRequestToken = async (): Promise<any> => {
  const environment = process.env.NODE_ENV;
  const redirectTo = environment === "development" ? "http://localhost:3000/" : "https://sd-react-movie-search.web.app/";

  const url = "https://api.themoviedb.org/4/auth/request_token";
  const response: AxiosResponse<any> = await axios.post(
    url,
    {
      redirect_to: redirectTo,
    },
    { ...headers, method: "POST" },
  );

  return response;
};

export const getAccessToken = async (body: any): Promise<any> => {
  const url = "https://api.themoviedb.org/4/auth/access_token";
  const response: AxiosResponse<any> = await axios.post(url, body, { ...headers, method: "POST" });

  return response;
};

export const deleteAccessToken = async (accessToken: string): Promise<any> => {
  const url = "https://api.themoviedb.org/4/auth/access_token";
  const response: AxiosResponse<any> = await axios.delete(url, {
    ...headers,
    method: "DELETE",
    data: {
      access_token: accessToken,
    },
  });

  return response;
};

export const getAccountDetails = async (sessionId: string): Promise<any> => {
  const url = `${process.env.REACT_APP_TMDB_ROOT}/account?session_id=${sessionId}`;
  const response: AxiosResponse<any> = await axios.get(url, headers);

  return response;
};

export const createSessionWithAccessToken = async (body: any): Promise<any> => {
  const url = "https://api.themoviedb.org/3/authentication/session/convert/4";
  const response: AxiosResponse<any> = await axios.post(url, body, { ...headers, method: "POST" });

  return response;
};
