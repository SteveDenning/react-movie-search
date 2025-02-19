import React, { useEffect, useState } from "react";
import pluralize from "pluralize";

// Components
import AILoader from "../../components/ai-loader";
import Button from "../../components/button";
import Modal from "../../components/modal";
import SectionHeading from "../../components/section-heading";
import Select from "../../components/select";
import Tabs from "../../components/tabs";

// Config
import { config } from "../../config/routes";

// MUI Components
import { Backdrop, CircularProgress, Container, Fade } from "@mui/material";

// MUI Icons
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

// Services
import { getAllMediaFromSearch } from "../../services/search";
import { getFavorites } from "../../services/favorites";
import { getGenres } from "../../services/genres";
import useOpenAI from "../../services/openai";

// Types
import { ErrorType, GenreType, GenreOptionsType } from "../../models/types";

// Utils
import useCustomGenres from "../../utils/use-custom-genres";
import useDefineMediaType from "../../utils/use-define-media-type";
import { discoverMediaPrompt, failedSearchMessagePrompt } from "../../utils/use-prompts";

// Styles
import "./ai-media.scss";

const AIMedia = () => {
  const [error, setError] = useState<ErrorType>(null);
  const [generating, setGenerating] = useState<boolean>(false);
  const [genres, setGenres] = useState<string>(" ");
  const [genreOptions, setGenreOptions] = useState<GenreOptionsType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [mediaType, setMediaType] = useState<string>("movie");
  const [movieGenres, setMovieGenres] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [openModalMessage, setOpenModalMessage] = useState<string>("");
  const [resources, setResources] = useState(null);
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

  const isJSONFormat = (obj: any) => {
    try {
      return JSON.parse(obj);
    } catch (e) {
      return false;
    }
  };

  const getOpenAI = () => {
    setGenerating(true);
    setResources(null);
    useOpenAI(discoverMedia, "json_object")
      .then((response) => {
        const resource = isJSONFormat(response.choices[0]?.message?.content);

        if (resource) {
          setResources(resource);
          setGenerating(false);
        }
      })
      .catch((error: ErrorType) => {
        console.error("Open AI::", error);
        setResources(null);
        setGenerating(false);
        setError(error);
      });
  };

  const getOpenAIMessage = () => {
    useOpenAI(failedSearchMessagePrompt)
      .then((response) => {
        const resource = isJSONFormat(response.choices[0]?.message?.content);

        if (resource) {
          setOpenModalMessage(resource);
          setOpen(true);
          setLoading(false);
        }
      })
      .catch((error: ErrorType) => {
        console.error("Open AI message::", error);
        setError(error);
        setLoading(false);
      });
  };

  const getMediaBySearchTerm = (query: string) => {
    setLoading(true);
    getAllMediaFromSearch(`${mediaType}?query=${query}`)
      .then((response: any) => {
        const results = response.data.results;

        if (!results.length) {
          setOpenModalMessage("");
          getOpenAIMessage();
          return;
        }
        const mediaType = useDefineMediaType(results[0]);

        if (results[0].id) {
          window.location.href = `/details/${mediaType}/${results[0].id}`;
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
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
    setResources(null);
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
      <Container>
        <SectionHeading
          heading="AI Media"
          backButton
        />
        <div className="ai-media__header">
          <h2 className="ai-media__title">
            <AutoAwesomeIcon />
            {definedType.description}
            <AutoAwesomeIcon />
          </h2>
          <Tabs
            tabs={[
              { label: "Movies", value: "movies" },
              { label: "TV", value: "tv" },
              { label: "Genres", value: "multi" },
            ]}
            onClick={(event) => handleChange(event)}
            initialSelection="movies"
          />
        </div>
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

              {selectedGenres?.length >= 2 ? renderGenerateButton(false) : <p className="fade-in">Select two or more genres</p>}
            </div>
          ) : (
            <>
              <div className="ai-media__genres">
                {mediaLabel !== "Movies or TV shows" && !!genres.length && !resources?.media.length && (
                  <>
                    <h3 className="ai-media__genres-heading">Your collective genres</h3>
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
                        (window.location.href = `${config.mediaListing.path}/${
                          mediaType === "movies" ? pluralize.singular(mediaType) : mediaType
                        }/popular?page=1`)
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
            resources?.media.length && (
              <Fade in={!!resources?.media.length}>
                <div>
                  <div className="ai-media__genres">
                    <h3>Most popular genres</h3>
                    {resources?.popular && <p>{resources.popular.join(", ")}</p>}
                  </div>
                  <ul className="ai-media__list">
                    {resources?.media.map((item: any, index: number) => {
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
      <Backdrop open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  );
};

export default AIMedia;
