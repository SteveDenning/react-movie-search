import React, { useEffect, useState } from "react";
import pluralize from "pluralize";

// Services
import { getAllMediaFromSearch } from "../../services/search";
import { getFavorites } from "../../services/favorites";
import { getGenres } from "../../services/genres";
import useOpenAI from "../../services/openai";

// MUI Components
import { Container, Fade } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

// Components
import AILoader from "../../components/ai-loader";
import Button from "../../components/button";
import Tabs from "../../components/tabs";

// Types
import { ErrorType, GenreType } from "../../models/types";

// Styles
import "./ai-media.scss";

interface Props {
  children?: React.ReactNode;
}

const AIMedia: React.FC<Props> = () => {
  const [response, setResponse] = useState(null);
  const [generating, setGenerating] = useState<boolean>(false);
  const [mediaType, setMediaType] = useState<string>("movie");
  const [linkType, setLinkType] = useState<string>("tv");
  const [error, setError] = useState<ErrorType>(null);
  const [movieGenres, setMovieGenres] = useState<string>("");
  const [tvGenres, setTVGenres] = useState<string>("");
  const [selectedGenres, setSelectedGenres] = useState<string>("horror");
  const [genres, setGenres] = useState<string>(" ");
  const [selectedTab, setSelectedTab] = useState("movies");

  const mediaLabel = mediaType === "movie" ? pluralize(mediaType) : "TV Shows";
  const user = JSON.parse(sessionStorage.getItem("user") || null);

  if (!user) {
    window.location.href = "/";
  }

  const handleMediaTypeLabel = () => {
    switch (mediaType) {
      case "select":
        return { label: "Movies or TV shows", description: "Let AI discover a list of Movies and TV Shows based on selected genres" };
      case "tv":
        return { label: "TV Shows", description: "Let AI discover a list of TV Shows based on genres from your favourites" };
      default:
        return { label: "Movie", description: "Let AI discover a list of Movies based on genres from your favourites" };
    }
  };

  const prompt = `Give me a random list of 20 ${
    handleMediaTypeLabel().label
  } that must have the following genres only: ${genres}, they must be different each time and span over the last 20 years with one from each year and give me the year. These must be in an array of JSON objects called media, each object should have a name key with the name as the value`;

  const isJSONFormat = (obj: any) => {
    try {
      return JSON.parse(obj);
    } catch (e) {
      return false;
    }
  };

  const getOpenAI = () => {
    setGenerating(true);
    setResponse(null);
    useOpenAI(prompt)
      .then((response) => {
        const resource = isJSONFormat(response.choices[0]?.message?.content);

        if (resource) {
          setLinkType(mediaType);
          setResponse(resource);
          setGenerating(false);
        }
      })
      .catch((error: ErrorType) => {
        console.error("Open AI::", error);
        setResponse(null);
        setGenerating(false);
        setError(error);
      });
  };

  const getMediaBySearchTerm = (query: string, mediaType: string) => {
    getAllMediaFromSearch(`${mediaType}?query=${query}`)
      .then((response: any) => {
        if (response.data.results[0].id) {
          window.location.href = `/details/${mediaType}/${response.data.results[0].id}`;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getGenresForMedia = (mediaType: string) => {
    getGenres(mediaType).then((response) => {
      getFavoritesList(mediaType, response.data.genres);
    });
  };

  const getGenresByName = (genreIds: number[], genres: GenreType[], type: string) => {
    if (genres) {
      const allGenres = genres.filter((genre: GenreType) => genreIds.includes(genre.id));
      const genreNames = allGenres.map((genre: GenreType) => genre.name).join(", ");

      if (type === "movie") {
        setGenres(genreNames);
        setMovieGenres(genreNames);
      } else {
        setTVGenres(genreNames);
      }
    }
  };

  const getFavoritesList = (type: string, genres: GenreType[]) => {
    if (user) {
      getFavorites(user.id, type)
        .then((response) => {
          const allIds = response.data.results.flatMap((item) => item.genre_ids);
          getGenresByName(allIds, genres, type);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleChange = (tab: { label: string; value: string }) => {
    setMediaType(tab.value);
    setResponse(null);
    setSelectedTab(tab.value);

    switch (tab.value) {
      case "movies":
        setGenres(movieGenres);
        break;
      case "tv":
        setGenres(tvGenres);
        break;
      default:
        setGenres(selectedGenres);
        break;
    }
  };

  const renderGenerateButton = () => {
    return (
      <>
        {!generating && (
          <Button
            onClick={getOpenAI}
            className="glow button--icon-button fade-in"
          >
            <AutoAwesomeIcon /> Generate
          </Button>
        )}
      </>
    );
  };

  useEffect(() => {
    getGenresForMedia("movie");
    getGenresForMedia("tv");
  }, []);

  return (
    <div
      className="ai-media"
      data-testid="ai-media"
    >
      <div className="ai-media__header">
        <h2 className="ai-media__title">
          <AutoAwesomeIcon />
          {handleMediaTypeLabel().description}
          <AutoAwesomeIcon />
        </h2>

        <Container>
          <Tabs
            tabs={[
              { label: "Movies", value: "movies" },
              { label: "TV", value: "tv" },
              { label: "Select Genres", value: "select" },
            ]}
            onClick={(event) => handleChange(event)}
            initialSelection="movies"
          />
        </Container>
      </div>
      <Container>
        <div>
          {selectedTab === "select" ? (
            <div className="ai-media__select-genres">
              <div>
                <p>Select Genres: {selectedGenres}</p>
                {renderGenerateButton()}
              </div>
            </div>
          ) : (
            <>
              <p style={{ textAlign: "center" }}>{genres}</p>
              <div className="ai-media__generate-action">
                {genres.length ? (
                  !generating && renderGenerateButton()
                ) : (
                  <p className="ai-media__warning-message fade-in">
                    No favorite {mediaLabel}? Guess you&#39;re just winging it. Add at least one from{" "}
                    <Button
                      variant="link"
                      onClick={() => (window.location.href = `/media-listing/${mediaType}/popular?page=1`)}
                    >
                      {mediaLabel}
                    </Button>{" "}
                    to unlock this feature!
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        <div className="ai-media__list-wrapper">
          {generating ? (
            <AILoader />
          ) : (
            response?.media.length && (
              <Fade in={!!response?.media.length}>
                <div>
                  <ul className="ai-media__list">
                    {response?.media.map((item, i) => {
                      return (
                        <li
                          key={i}
                          className="ai-media__list-item"
                        >
                          <Button
                            color="lilac"
                            onClick={() => getMediaBySearchTerm(item.name, linkType)}
                          >
                            {item.name}
                          </Button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Fade>
            )
          )}
          {error && (
            <p
              className="error"
              data-testid="search-results-error"
            >
              There was a problem getting the results - please try again later
            </p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default AIMedia;
