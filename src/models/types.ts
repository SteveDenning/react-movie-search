export type ErrorType = {
  code: string;
  message: string;
  param: string;
  type: string;
};

export type GenreType = {
  id: number;
  name: string;
};

export type GenreOptionsType = {
  label: number;
  value: string;
};

export type UserType = {
  access_token: string;
  avatar: {
    tmdb: {
      avatar_path: string;
    };
  };
  id: string;
  name: string;
  username: string;
};

export type NavItemType = {
  label: string;
  path: string;
  icon?: any;
};
