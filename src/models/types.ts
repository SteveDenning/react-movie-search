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
  avatar: {
    tmdb: {
      avatar_path: string;
    };
  };
  id: string;
  name: string;
  username: string;
};
