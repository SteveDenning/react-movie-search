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
  // const [loaded, setLoaded] = useState<boolean>(false);
  const [mediaType, setMediaType] = useState<string>("movie");
  const [linkType, setLinkType] = useState<string>("tv");
  const [error, setError] = useState<ErrorType>(null);
  const [movieGenres, setMovieGenres] = useState<string>("");
  const [tvGenres, setTVGenres] = useState<string>("");
  const [genres, setGenres] = useState<string>(" ");

  const mediaLabel = mediaType === "movie" ? pluralize(mediaType) : "TV Shows";
  const user = JSON.parse(sessionStorage.getItem("user") || null);

  if (!user) {
    window.location.href = "/";
  }

  const handleChange = (event, newAlignment: string) => {
    setMediaType(newAlignment);
    setResponse(null);
    setGenres(newAlignment === "tv" ? tvGenres : movieGenres);
  };

  const prompt = `Give me a random list of 20 ${mediaLabel} that must have the following genres only: ${
    mediaType === "movie" ? movieGenres : tvGenres
  }, these must be in an array of JSON objects called media, each object should have a name key with the name as the value`;

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
        setMovieGenres(genreNames);
        setGenres(genreNames);
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

  useEffect(() => {
    getGenresForMedia("movie");
    getGenresForMedia("tv");
  }, []);

  return (
    <div
      className="ai-media"
      data-testid="ai-media"
    >
      <Container>
        <div style={{ textAlign: "center", background: "rgba(0,0,0,0.5)", padding: "20px", borderRadius: "10px", marginTop: "20px" }}>
          <h2 className="ai-media__header">
            <AutoAwesomeIcon /> Let AI discover a list of {mediaLabel} based on genres from your favourites <AutoAwesomeIcon />
          </h2>
          <p>{genres}</p>
          <div className="ai-media__toggle-wrapper">
            <Button
              onClick={(event) => handleChange(event, "movie")}
              variant={mediaType === "movie" ? "filled" : "outlined"}
              disabled={generating}
            >
              Movies
            </Button>
            <Button
              onClick={(event) => handleChange(event, "tv")}
              variant={mediaType === "tv" ? "filled" : "outlined"}
              disabled={generating}
            >
              TV Shows
            </Button>
          </div>
        </div>
        <div className="ai-media__generate-action">
          {genres.length ? (
            !generating && (
              <Button
                onClick={getOpenAI}
                className="glow button--icon-button fade-in"
              >
                <AutoAwesomeIcon /> Generate
              </Button>
            )
          ) : (
            <>
              <h4
                style={{ textAlign: "center" }}
                className="fade-in"
              >
                No favorite {mediaLabel}? Guess you&#39;re just winging it. Add at least one from{" "}
                <Button
                  variant="link"
                  onClick={() => (window.location.href = `/media-listing/${mediaType}/popular?page=1`)}
                >
                  {mediaLabel}
                </Button>{" "}
                to unlock this feature!
              </h4>
            </>
          )}
        </div>
        <div className="ai-media__list-wrapper">
          {generating ? (
            <AILoader />
          ) : (
            response?.media.length && (
              <Fade
                in={!!response?.media.length}
                timeout={1000}
              >
                <div>
                  <ul className="ai-media__list">
                    {response?.media.map((item, i) => {
                      return (
                        <li
                          key={i}
                          className="ai-media__list-item"
                        >
                          <Button
                            color="orange"
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
