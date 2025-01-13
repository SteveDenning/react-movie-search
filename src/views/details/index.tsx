import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

// Services
import { getFavorites } from "../../services/favorites";
import { getMediaByID } from "../../services/media";
import { updateFavorite } from "../../services/favorites";
import { getVideos } from "../../services/videos";

// Components
import AddToFavorites from "../../components/add-to-favorites";
import Button from "../../components/button";
import Image from "../../components/image";
import MediaCarousel from "../../views/media-carousel";
import Modal from "../../components/modal";
import Overview from "../../components/overview";
import Video from "../../components/video";

// MUI
import { Backdrop, CircularProgress, Container, Fade } from "@mui/material";

// Styles
import "./details.scss";

const DetailsView = () => {
  const [backDrop, setBackDrop] = useState<string>("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [resource, setResource] = useState<any>({});
  const [videoKey, setVideoKey] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user") || null);
  const programmeId = window.location.pathname.split("/")[3] as string;
  const type = window.location.pathname.split("/")[2];
  const backgroundImage = backDrop ? `url(${process.env.REACT_APP_TMDB_IMAGE_PATH}/${backDrop})` : "";
  const isMedia = type == "tv" || "movie";
  const isPerson = type == "person";
  const MediaCarouselLabel = isPerson ? "Known for" : "Top Cast";
  const pathName = `${type}/${programmeId}/credits?language=en-US`;
  const text = resource?.overview || resource?.biography || null;

  const personOptions = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024,
      },
      items: 7,
      slidesToSlide: 7,
    },
  };

  const getMedia = () => {
    if (programmeId && type) {
      setLoading(true);
      getMediaByID(programmeId, type)
        .then((response: any) => {
          setResource(response.data);
          setBackDrop(response.data?.backdrop_path);
          getFavoritesList();
          fetchVideos(programmeId, type);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          setError(true);
        });
    }
  };

  const fetchVideos = (id: string, type: string) => {
    if (type !== "person") {
      setLoading(true);
      getVideos(id, type)
        .then((response: any) => {
          setVideoKey(response.data.results[0]?.key);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          setError(true);
        });
    } else {
      setLoading(false);
    }
  };

  const getFavoritesList = () => {
    if (user && !isPerson) {
      getFavorites(user.id, type)
        .then((response) => {
          const favorites = response?.data.results;
          const isFavorite = !!favorites.find((favorite) => favorite.id == programmeId);

          setIsFavorite(isFavorite);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleFavorite = () => {
    const body = {
      media_type: type,
      media_id: resource.id,
      favorite: !isFavorite,
    };

    updateFavorite(user.id, body)
      .then(() => {
        getFavoritesList();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const renderImage = () => {
    if (resource) {
      return (
        <Image
          id={resource.id}
          resource={resource}
          onClick={() => setIsOpen(true)}
        />
      );
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  return (
    <>
      {resource && (
        <Fade in={!loading}>
          <div
            data-testid="details-view"
            className="details-view"
            style={{ backgroundImage: backgroundImage }}
          >
            <Container>
              <div
                className="details-view__inner"
                data-testid="details-view-inner"
              >
                {!!videoKey && (
                  <div
                    className="details-view__video"
                    data-test-id="details-view-video"
                  >
                    <Video
                      youTubeKey={videoKey}
                      playing
                      responsive
                    />
                  </div>
                )}
                <div className="details-view__content">
                  <div className="details-view__profile">
                    {resource["profile_path"] && <div className="details-view__profile-image">{renderImage()}</div>}
                    <div>
                      <div className="details-view__profile-details">
                        <h2
                          className="details-view__title"
                          data-testid="details-view-title"
                        >
                          {resource.name || resource.title}{" "}
                          {isMedia && resource?.["release_date"] && <span>({moment(resource?.["release_date"]).format("YYYY")})</span>}
                          {user && type !== "person" && (
                            <AddToFavorites
                              handleFavorite={handleFavorite}
                              isFavorite={isFavorite}
                            />
                          )}
                        </h2>
                        {resource.birthday && (
                          <p>
                            {moment(resource.deathday ? resource.deathday : undefined).diff(resource.birthday, "years")} years old
                            {resource.deathday && <span> (Deceased)</span>}
                          </p>
                        )}
                        {resource["place_of_birth"] && <p>{resource["place_of_birth"]}</p>}
                        {resource["known_for_department"] && <p>Known for: {resource["known_for_department"]}</p>}
                      </div>
                      {text && (
                        <Overview
                          resource={resource}
                          text={text}
                        />
                      )}
                      {!!resource.genres?.length && (
                        <>
                          <ul>
                            {resource.genres.map((genre: any) => (
                              <li
                                className="genre-tag"
                                key={genre.id + genre["name"]}
                              >
                                {genre["name"]}
                                <span>|</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                      {resource.seasons?.length && (
                        <>
                          <p>Seasons: {resource.seasons?.length}</p>
                        </>
                      )}
                      {resource.networks?.length && (
                        <>
                          <ul>
                            {resource.networks.map((network: any, i: number) => (
                              <li key={network.id + i}>
                                <img
                                  src={`${process.env.REACT_APP_TMDB_ROOT}/t/p/original/${network["logo_path"]}`}
                                  alt=""
                                  style={{ width: "100px", background: "#ccc", padding: "10px", marginRight: "10px", borderRadius: "10px" }}
                                />
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                      {resource["imdb_id"] && (
                        <Button
                          target="_blank"
                          variant="imdb"
                          href={`https://www.imdb.com/${isPerson ? "name" : "title"}/${resource["imdb_id"]}`}
                        >
                          IMDb
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="details-view__back-button">
                    <Button onClick={() => navigate(-1)}>Back</Button>
                  </div>
                </div>
              </div>
              <MediaCarousel
                label={MediaCarouselLabel}
                pathName={pathName}
                dataResource="cast"
                responsiveOptions={personOptions}
                media={type === "person" ? "movie" : "person"}
              />
            </Container>
          </div>
        </Fade>
      )}
      {error && (
        <p
          className="error"
          data-testid="details-view-error"
        >
          There was a problem getting the detail page - please try again later
        </p>
      )}
      <Modal
        id={resource.id}
        open={isOpen}
        handleClose={() => setIsOpen(false)}
        variant={["image"]}
      >
        {renderImage()}
      </Modal>
      <Backdrop open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  );
};
export default DetailsView;
