import React, { useEffect, useState } from "react";
import pluralize from "pluralize";

// Services
import { getAllMediaFromSearch } from "../../services/search";
import { getFavorites } from "../../services/favorites";
import { getGenres } from "../../services/genres";
import useOpenAI from "../../services/openai";

// MUI Components
import { Backdrop, CircularProgress, Container, Fade } from "@mui/material";

// MUI Icons
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

// Components
import AILoader from "../../components/ai-loader";
import Button from "../../components/button";
import Modal from "../../components/modal";
import Select from "../../components/select";
import Tabs from "../../components/tabs";

// Utils
import useCustomGenres from "../../utils/use-custom-genres";
import useDefineMediaType from "../../utils/use-define-media-type";
import { discoverMediaPrompt, failedSearchMessagePrompt } from "../../utils/use-prompts";

// Types
import { ErrorType, GenreType, GenreOptionsType } from "../../models/types";

// Styles
import "./ai-media.scss";

const AIMedia = () => {
  const [error, setError] = useState<ErrorType>(null);
  const [generating, setGenerating] = useState<boolean>(false);
  const [genres, setGenres] = useState<string>(" ");
  const [genreOptions, setGenreOptions] = useState<GenreOptionsType[]>([]);
  const [loadingMessage, setLoadingMessage] = useState<boolean>(false);
  const [mediaType, setMediaType] = useState<string>("movie");
  const [movieGenres, setMovieGenres] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [openModalMessage, setOpenModalMessage] = useState<string>("");
  const [response, setResponse] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState<string>(null);
  const [tvGenres, setTVGenres] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<string>("movies");

  const customGenres = useCustomGenres();
  const mediaLabel = mediaType === "movie" ? pluralize(mediaType) : "TV Shows";
  const user = JSON.parse(sessionStorage.getItem("user") || null);

  if (!user) {
    window.location.href = "/";
  }

  // TODO rewrite this
  const handleMediaTypeObj = () => {
    switch (mediaType) {
      case "multi":
        return { label: "Movies or TV shows", description: "Let AI discover a list of Movies and TV Shows based on selected genres" };
      case "tv":
        return { label: "TV Shows", description: "Let AI discover a list of TV Shows based on the most popular genres from your favourites" };
      default:
        return { label: "Movie", description: "Let AI discover a list of Movies based on the most popular genres from your favourites" };
    }
  };

  const definedType = handleMediaTypeObj();
  const discoverMedia = discoverMediaPrompt(definedType.label, genres);
  const failedSearchMessage = failedSearchMessagePrompt();

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
    useOpenAI(discoverMedia, "json_object")
      .then((response) => {
        const resource = isJSONFormat(response.choices[0]?.message?.content);

        if (resource) {
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

  const getOpenAIMessage = () => {
    useOpenAI(failedSearchMessage)
      .then((response) => {
        const resource = isJSONFormat(response.choices[0]?.message?.content);

        if (resource) {
          setOpenModalMessage(resource);
          setOpen(true);
          setLoadingMessage(false);
        }
      })
      .catch((error: ErrorType) => {
        console.error("Open AI message::", error);
        setError(error);
        setLoadingMessage(false);
      });
  };

  const getMediaBySearchTerm = (query: string) => {
    getAllMediaFromSearch(`${mediaType}?query=${query}`)
      .then((response: any) => {
        const results = response.data.results;

        if (!results.length) {
          setOpenModalMessage("");
          setLoadingMessage(true);
          getOpenAIMessage();
          return;
        }
        const mediaType = useDefineMediaType(results[0]);

        if (results[0].id) {
          window.location.href = `/details/${mediaType}/${results[0].id}`;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getGenreOptions = (mediaType: string) => {
    getGenres(mediaType).then((response) => {
      getFavoritesList(mediaType, response.data.genres);

      const mappedGenres = response.data.genres.map((genre: GenreType) => ({
        label: genre.name,
        value: genre.id,
      }));

      if (mediaType === "movie") {
        const updatedGenres = mappedGenres.concat(customGenres).sort((a, b) => {
          return a.label < b.label ? -1 : a.label > b.label ? 1 : 0;
        });
        setGenreOptions(updatedGenres);
      }
    });
  };

  const getFullListOfGenreNames = (genreIds: any[], genres) => {
    let names = [];

    genreIds.map((genre) => {
      const genreName = genres.find((item: GenreType) => item.id === genre)?.name;
      if (genreName) {
        names.push(genreName);
      }
    });

    const updatedGenres = names.sort((a, b) => {
      return a < b ? -1 : a > b ? 1 : 0;
    });

    return updatedGenres.join(", ");
  };

  const getGenresByName = (genreIds: number[], genres: GenreType[], type: string) => {
    if (genres) {
      const update = getFullListOfGenreNames(genreIds, genres);

      if (type === "movie") {
        setGenres(update);
        setMovieGenres(update);
      } else {
        setTVGenres(update);
      }
    }
  };

  const getFavoritesList = (type: string, genres: GenreType[]) => {
    if (user) {
      getFavorites(user.account_id, type)
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

  const renderGenerateButton = (disabled: boolean) => {
    return (
      <>
        {!generating && (
          <Button
            onClick={getOpenAI}
            className="glow button--icon-button fade-in"
            disabled={disabled}
          >
            <AutoAwesomeIcon /> Generate
          </Button>
        )}
      </>
    );
  };

  useEffect(() => {
    getGenreOptions("movie");
    getGenreOptions("tv");
  }, []);

  const handleMediaTypeChange = (event: any) => {
    setSelectedGenres(event);
    const genreNames = event.map((genre: GenreOptionsType) => genre.label).join(", ");
    setGenres(genreNames);
  };

  return (
    <div
      className="ai-media"
      data-testid="ai-media"
    >
      <div className="ai-media__header">
        <h2 className="ai-media__title">
          <AutoAwesomeIcon />
          {definedType.description}
          <AutoAwesomeIcon />
        </h2>

        <Container>
          <Tabs
            tabs={[
              { label: "Movies", value: "movies" },
              { label: "TV", value: "tv" },
              { label: "Genres", value: "multi" },
            ]}
            onClick={(event) => handleChange(event)}
            initialSelection="movies"
          />
        </Container>
      </div>
      <Container>
        <div>
          {selectedTab === "multi" ? (
            <div className="ai-media__selected-genres">
              <div className="ai-media__selected-genres-inner">
                <Select
                  id="genres"
                  label="Select genres"
                  value={selectedGenres}
                  onChange={handleMediaTypeChange}
                  options={genreOptions}
                  searchable={false}
                  isMulti
                  animated
                />
              </div>

              {selectedGenres?.length > 2 ? renderGenerateButton(false) : <p className="fade-in">Select three or more genres</p>}
            </div>
          ) : (
            <>
              <div className="ai-media__genres">
                {mediaLabel !== "Movies or TV shows" && !!genres.length && (
                  <>
                    <h3>Your collective genres</h3>
                    <p>{[...new Set(genres?.split(" "))].join(" ")}</p>
                  </>
                )}
              </div>

              <div className="ai-media__generate-action">
                {genres?.length ? (
                  !generating && renderGenerateButton(false)
                ) : (
                  <p className="ai-media__warning-message fade-in">
                    No favorite {mediaType}? Guess you&#39;re just winging it. Add at least one from{" "}
                    <Button
                      variant="link"
                      onClick={() =>
                        (window.location.href = `/media-listing/${mediaType === "movies" ? pluralize.singular(mediaType) : mediaType}/popular?page=1`)
                      }
                    >
                      <span style={{ textTransform: "capitalize" }}> {mediaType === "movie" ? pluralize(mediaType) : mediaType + " shows"}</span>
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
                  <div className="ai-media__genres">
                    <h3>Most popular genres</h3>
                    {response?.popular && <p>{response.popular.join(", ")}</p>}
                  </div>
                  <ul className="ai-media__list">
                    {response?.media.map((item: any, index: number) => {
                      return (
                        <li
                          key={index}
                          className="ai-media__list-item"
                        >
                          <Button
                            color="lilac"
                            onClick={() => getMediaBySearchTerm(item.name)}
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
      <Modal
        id="voice-input"
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      >
        <p style={{ textAlign: "center" }}>{openModalMessage}</p>
      </Modal>
      <Backdrop open={loadingMessage}>
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  );
};

export default AIMedia;
