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
import Select from "../../components/select";
import Tabs from "../../components/tabs";

// Utils
import useCustomGenres from "../../utils/use-custom-genres";
import useDefineMediaType from "../../utils/use-define-media-type";

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
  const [movieGenres, setMovieGenres] = useState<string>("");
  const [tvGenres, setTVGenres] = useState<string>("");
  const [error, setError] = useState<ErrorType>(null);
  const [selectedGenres, setSelectedGenres] = useState<string>(null);
  const [genres, setGenres] = useState<string>(" ");
  const [selectedTab, setSelectedTab] = useState("movies");
  const [genreOptions, setGenreOptions] = useState([]);

  const mediaLabel = mediaType === "movie" ? pluralize(mediaType) : "TV Shows";
  const user = JSON.parse(sessionStorage.getItem("user") || null);

  if (!user) {
    window.location.href = "/";
  }

  const customGenres = useCustomGenres();

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

  const prompt1 = `Create a random list of 30 ${
    handleMediaTypeLabel().label
  } , where each movie must include at least one genre from the array [${genres}]. Focus on the top three most popular genres from the array, prioritizing their frequency. The list should be ordered in descending order, starting with ${
    handleMediaTypeLabel().label
  }  from the most popular genre. Return the result as a JSON object with a key name called popular showing the top four most frequent genres and an array called media, where each object has a name key containing the movie name as its value. Ensure variety in the selection.`;

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
    useOpenAI(prompt1)
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

  const getMediaBySearchTerm = (query: string) => {
    getAllMediaFromSearch(`${"multi"}?query=${query}`)
      .then((response: any) => {
        const mediaType = useDefineMediaType(response.data.results[0]);

        if (response.data.results[0].id) {
          window.location.href = `/details/${mediaType}/${response.data.results[0].id}`;
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
      const genreName = genres.find((item: { id: number; name: string }) => item.id === genre)?.name;
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
    const genreNames = event.map((genre: { label: string; value: number }) => genre.label).join(", ");
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
          {handleMediaTypeLabel().description}
          <AutoAwesomeIcon />
        </h2>

        <Container>
          <Tabs
            tabs={[
              { label: "Movies", value: "movies" },
              { label: "TV", value: "tv" },
              { label: "Genres", value: "select" },
            ]}
            onClick={(event) => handleChange(event)}
            initialSelection="movies"
          />
        </Container>
      </div>
      <Container>
        <div>
          {selectedTab === "select" ? (
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
              {renderGenerateButton(!selectedGenres?.length)}
            </div>
          ) : (
            <>
              <p className="ai-media__genres">{[...new Set(genres.split(" "))].join(" ")}</p>
              <p className="ai-media__genres">ALL - {genres}</p>

              <div className="ai-media__generate-action">
                {genres.length ? (
                  !generating && renderGenerateButton(false)
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
                  {response?.popular && <p>Top four most popular genres: {response.popular.join(", ")}</p>}
                  <ul className="ai-media__list">
                    {response?.media.map((item, i) => {
                      return (
                        <li
                          key={i}
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
    </div>
  );
};

export default AIMedia;
