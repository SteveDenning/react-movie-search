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

export type GenreType = {
  id: number;
  name: string;
};

export type ErrorType = {
  code: string;
  message: string;
  param: string;
  type: string;
};
