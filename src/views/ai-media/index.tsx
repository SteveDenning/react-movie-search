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

// Styles
import "./ai-media.scss";

interface Props {
  children?: React.ReactNode;
}

const AIMedia: React.FC<Props> = () => {
  const [response, setResponse] = useState(null);
  const [generating, setGenerating] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [mediaType, setMediaType] = useState("movie");
  const [linkType, setLinkType] = useState("tv");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [movieGenres, setMovieGenres] = useState("");
  const [tvGenres, setTVGenres] = useState("");

  const user = JSON.parse(sessionStorage.getItem("user") || null);

  const handleChange = (event, newAlignment: string) => {
    setMediaType(newAlignment);
    setResponse(null);
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
    if (!movieGenres.length) {
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
        } else {
          setResponse(null);
          setGenerating(false);
          setLoaded(true);
        }
      })
      .catch((error) => {
        console.error("Open AI::", error);
        setResponse(null);
        setGenerating(false);
        setLoaded(true);
      });
  };

  const getMediaBySearchTerm = (query: string, linkType) => {
    getAllMediaFromSearch(`${linkType}?query=${query}`)
      .then((response: any) => {
        if (response.data.results[0].id) {
          window.location.href = `/details/${linkType}/${response.data.results[0].id}`;
        } else {
          alert("TODO - No results found");
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

  const getGenresByName = (genreIds: number[], genres: any[], type: string) => {
    if (genres) {
      const allGenres = genres.filter((genre: { name: string; id: number }) => genreIds.includes(genre.id));
      const genreNames = allGenres.map((genre: { name: string; id: number }) => genre.name);

      console.log(genreNames);
      if (type === "movie") {
        setMovieGenres(genreNames.join(", "));
      } else {
        setTVGenres(genreNames.join(", "));
      }
    }
  };

  const getFavoritesList = (type: string, genres) => {
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
          <p>{mediaType === "movie" ? movieGenres : tvGenres}</p>
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
          {!generating && <Button onClick={getOpenAI}>Generate</Button>}
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
            loaded && (
              <>
                {/* <p className="ai-media__error">
                  Oops! Looks like I had a little AI brain freeze ❄️. I promise it’s not because I was binge-watching cat videos in the background...
                  Or was it? Let&#39;s try that again!
                </p> */}
              </>
            )
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
            You have no saves genres. Please start adding {mediaType} to use this service
            <br />
          </h3>

          <div className="modal__action-buttons"></div>
        </Modal>
      </Container>
    </div>
  );
};

export default AIMedia;
