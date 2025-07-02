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

export type NavItemType = {
  label: string;
  path: string;
  icon?: any;
};

export type ResponsiveOptionsType = {
  breakpoint: number;
  settings: {
    slidesToShow?: number;
    slidesToScroll?: number;
    dots?: boolean;
    arrows?: boolean;
  };
};

export type SuggestionType = {
  id: string;
  first_air_date: string;
  media_type: string;
  name: string;
  original_title: string;
  release_date: string;
};

export type UserType = {
  access_token: string;
  account_id: string;
  avatar: {
    gravatar: {
      hash: string;
    };
    tmdb?: {
      avatar_path?: string;
    };
  };
  id: number;
  include_adult: boolean;
  admin: boolean;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  session_id: string;
  username: string;
};
