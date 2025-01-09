import React, { useEffect, useState } from "react";
import pluralize from "pluralize";

// Services
import { getAllMediaFromSearch } from "../../services/search";
import { getFavorites } from "../../services/favorites";
import { getGenres } from "../../services/genres";
import useOpenAI from "../../services/openai";

// MUI Components
import { Container, Fade } from "@mui/material";

// Components
import AILoader from "../../components/ai-loader";
import Button from "../../components/button";
import Modal from "../../components/modal";

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
  const [loaded, setLoaded] = useState<boolean>(false);
  const [mediaType, setMediaType] = useState<string>("movie");
  const [linkType, setLinkType] = useState<string>("tv");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType>(null);
  const [movieGenres, setMovieGenres] = useState<string>("");
  const [tvGenres, setTVGenres] = useState<string>("");
  const [genres, setGenres] = useState<string>(" ");

  const user = JSON.parse(sessionStorage.getItem("user") || null);

  if (!user) {
    window.location.href = "/";
  }

  const handleChange = (event, newAlignment: string) => {
    setMediaType(newAlignment);
    setResponse(null);
    setGenres(newAlignment === "tv" ? tvGenres : movieGenres);
  };

  const prompt = `Give me a random list of 20 ${
    mediaType === "movie" ? pluralize(mediaType) : "TV Shows"
  } that must have the following genres only: ${
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
    if (!genres.length) {
      setIsOpen(true);
      return;
    }
    setLoaded(false);
    setGenerating(true);
    setResponse(null);
    useOpenAI(prompt)
      .then((response) => {
        const resource = isJSONFormat(response.choices[0]?.message?.content);

        if (resource) {
          setLinkType(mediaType);
          setResponse(resource);
          setGenerating(false);
          setLoaded(true);
        }
      })
      .catch((error: ErrorType) => {
        console.error("Open AI::", error);
        setResponse(null);
        setGenerating(false);
        setLoaded(true);
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
          <h2
            className="text-glow"
            data-testid="media-carousel-label"
            style={{ marginBottom: "20px" }}
          >
            Let AI generate a list of programmes for you based on genres from your favorite{" "}
            {mediaType === "movie" ? pluralize(mediaType) : "TV Shows"}
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
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          {genres.length ? (
            !generating && <Button onClick={getOpenAI}>Generate</Button>
          ) : (
            <h3 style={{ textAlign: "center" }}>
              You have no saved favourites for {mediaType === "movie" ? pluralize(mediaType) : "TV Shows"}
              <br />
              Please add some to continue
            </h3>
          )}
        </div>
        <div style={{ marginTop: "60px" }}>
          {generating ? (
            <AILoader />
          ) : response?.media.length ? (
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
                        <Button onClick={() => getMediaBySearchTerm(item.name, linkType)}> {item.name}</Button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Fade>
          ) : (
            loaded && <p>Ooops, sorry my AI brain has made a boo boo, please try again</p>
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
        <Modal
          id="ai-media-modal"
          open={isOpen}
          handleClose={() => {
            setIsOpen(false);
          }}
          variant={["small"]}
        >
          <h3 style={{ textAlign: "center" }}>
            You have no saved favourites for {mediaType === "movie" ? pluralize(mediaType) : "TV Shows"}
            <br />
            Please add some to continue
          </h3>

          <div className="modal__action-buttons"></div>
        </Modal>
      </Container>
    </div>
  );
};

export default AIMedia;
