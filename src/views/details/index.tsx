import React, { useEffect, useState } from "react";
import moment from "moment";

// Components
import Accordion from "../../components/accordion";
import AddToFavorites from "../../components/add-to-favorites";
import Button from "../../components/button";
import Image from "../../components/image";
import MediaCarousel from "../../components/media-carousel";
import Modal from "../../components/modal";
import Overview from "../../components/overview";
import SectionHeading from "../../components/section-heading";
import Share from "../../components/share";
import Video from "../../components/video";

// Config
import { config } from "../../config/routes";

// Hocs
import { useUser } from "../../hocs/with-user-provider";

// MUI
import { Backdrop, CircularProgress, Container, Fade } from "@mui/material";

// Services
import { getFavorites } from "../../services/favorites";
import { getMediaByID, getOmdbMedia } from "../../services/media";
import { updateFavorite } from "../../services/favorites";

// Types
import { ResponsiveOptionsType } from "../../models/types";

// Styles
import "./details.scss";

interface Props {
  handleMediaTitle: (title: string) => void;
}

const DetailsView: React.FC<Props> = ({ handleMediaTitle }) => {
  const [backDrop, setBackDrop] = useState<string>("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [resource, setResource] = useState<any>({});
  const [resourceDetails, setResourceDetails] = useState<any>({});
  const [recommendations, setRecommendations] = useState([]);
  const [videoKey, setVideoKey] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenSeasonsModal, setIsOpenSeasonsModal] = useState<boolean>(false);

  const user = useUser();
  const programmeId = window.location.pathname.split("/")[3] as string;
  const type = window.location.pathname.split("/")[2];
  const backgroundImage = backDrop ? `url(${process.env.REACT_APP_TMDB_IMAGE_PATH}/${backDrop})` : "";
  const isMedia = type == "tv" || "movie";
  const isPerson = type == "person";
  const MediaCarouselLabel = isPerson ? "Known for" : "Top Cast";
  const pathName = `${type}/${programmeId}/${isPerson ? "combined_credits" : "credits"}?language=en-US`;

  // Class Definitions
  const baseClass = "details-view";
  const personClass = isPerson ? "details-view--person" : "";
  const classes = [baseClass, personClass].filter(Boolean).join(" ");

  const overview = resource?.overview || resource?.biography || null;
  const title = resource.name || resource.title;
  const rating = Number(resourceDetails?.imdbRating);
  const imdbRatingColor = rating > 7 ? "#00b500" : "#d3d300";

  const responsiveOptions: ResponsiveOptionsType[] = [
    {
      breakpoint: 5000,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 7,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 464,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ];

  const getMediaDetails = () => {
    if (programmeId && type) {
      setLoading(true);
      getMediaByID(programmeId, type)
        .then((response: any) => {
          setResource(response.data);
          setRecommendations(response.data?.recommendations?.results);
          handleMediaTitle(response.data.name || response.data.title);
          handleVideos(response.data.videos?.results || []);
          setBackDrop(response.data?.backdrop_path);
          getFavoritesList();
          setLoading(false);
          getOmdbDetails(response.data.name || response.data.title);
        })
        .catch((error) => {
          console.error("getMediaDetails::", error);
          setLoading(false);
          setError(true);
        });
    }
  };

  const getOmdbDetails = (title: string) => {
    if (title) {
      getOmdbMedia(title)
        .then((response: any) => {
          setResourceDetails(response.data);
        })
        .catch((error) => {
          console.error("getOmdbDetails::", error);
          setLoading(false);
          setError(true);
        });
    }
  };

  const handleVideos = (videos: { key: string }[]) => {
    const trailers = videos.filter((video: any) => video.type === "Trailer");
    trailers.length !== 0 ? setVideoKey(trailers[0]?.key) : setVideoKey(videos[0]?.key);
  };

  const getFavoritesList = () => {
    if (user && !isPerson) {
      getFavorites(user, type)
        .then((response) => {
          const favorites = response?.data.results;
          const isFavorite = !!favorites.find((favorite) => favorite.id == programmeId);

          setIsFavorite(isFavorite);
        })
        .catch((error) => {
          console.error("getFavoritesList::", error);
          setLoading(false);
          setError(true);
        });
    }
  };

  const handleFavorite = () => {
    const body = {
      media_type: type,
      media_id: resource.id,
      favorite: !isFavorite,
    };

    updateFavorite(user, body)
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
          resource={resource}
          onClick={() => setIsOpenModal(true)}
        />
      );
    }
  };

  useEffect(() => {
    getMediaDetails();
  }, []);

  return (
    <>
      {resource && (
        <Fade in={!loading}>
          <div
            data-testid="details-view"
            className={classes}
            style={{ backgroundImage: backgroundImage }}
          >
            <Container>
              <SectionHeading
                heading={title}
                backButton
              />
              <div
                className="details-view__inner"
                data-testid="details-view-inner"
              >
                {videoKey ? (
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
                ) : (
                  !resource["profile_path"] && (
                    <div
                      className="details-view__poster fade-in"
                      data-test-id="details-view-poster"
                    >
                      {renderImage()}
                    </div>
                  )
                )}

                <div className="details-view__content">
                  <div className="details-view__profile">
                    {(resource["profile_path"] || !videoKey) && !!resource.gender && (
                      <div
                        className="details-view__profile-image"
                        data-testid="details-view-profile-image"
                      >
                        {renderImage()}
                      </div>
                    )}

                    <div>
                      <div className="details-view__profile-details">
                        <div className="details-view__title-wrapper">
                          {isMedia && (resource?.["release_date"] || resource?.["first_air_date"]) && (
                            <h2 className="details-view__title details-view__label">
                              <span>({moment(resource?.["release_date"] || resource?.["first_air_date"]).format("YYYY")})</span>

                              {resourceDetails?.imdbRating && resourceDetails?.imdbRating !== "N/A" && (
                                <div className="details-view__imdb-rating">
                                  <span
                                    className="details-view__imdb-rating-score"
                                    style={{ color: imdbRatingColor }}
                                  >
                                    {resourceDetails.imdbRating}
                                  </span>
                                  <span>
                                    / 10 <span style={{ fontSize: "12px" }}> (IMDb)</span>
                                  </span>
                                </div>
                              )}
                            </h2>
                          )}
                          <div className="details-view__actions">
                            <Share
                              title={title}
                              id={title}
                            />
                            {type !== "person" && (
                              <AddToFavorites
                                handleFavorite={handleFavorite}
                                isFavorite={isFavorite}
                                user={user}
                              />
                            )}
                          </div>
                        </div>

                        {resource.birthday && (
                          <p>
                            {resource.deathday
                              ? `Died aged ${moment(resource.deathday).diff(resource.birthday, "years")}`
                              : `${moment().diff(resource.birthday, "years")} years old`}
                          </p>
                        )}

                        {resource["place_of_birth"] && <p>{resource["place_of_birth"]}</p>}

                        {resource["known_for_department"] && <p>Known for: {resource["known_for_department"]}</p>}
                      </div>

                      {overview && (
                        <Overview
                          resource={resource}
                          text={overview}
                        />
                      )}

                      {!!resource.genres?.length && (
                        <>
                          <ul>
                            {resource.genres.map((genre: any) => (
                              <li
                                className="details-view__genre-tag"
                                key={genre.id + genre["name"]}
                              >
                                {genre["name"]}
                                <span>|</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}

                      {resource?.next_episode_to_air && (
                        <p className="details-view__label">
                          Next episode:
                          <span> {moment(resource.next_episode_to_air["air_date"]).format("MMMM Do YYYY")}</span>
                        </p>
                      )}

                      {!!resource.seasons?.length && (
                        <>
                          <div className="details-view__seasons">
                            <Button onClick={() => setIsOpenSeasonsModal(true)}>{resource.seasons.length} Seasons</Button>
                          </div>
                        </>
                      )}

                      {(resource["imdb_id"] || resourceDetails?.imdbID) && (
                        <>
                          <Button
                            target="_blank"
                            variant="imdb"
                            href={`https://www.imdb.com/${isPerson ? "name" : "title"}/${resource["imdb_id"] || resourceDetails.imdbID}`}
                          >
                            IMDb
                          </Button>
                        </>
                      )}

                      {!!resource.networks?.length && (
                        <>
                          <ul className="details-view__network-list">
                            {resource.networks.map((network: any, index: number) => (
                              <li key={network.id + index}>
                                <img
                                  src={`${process.env.REACT_APP_TMDB_IMAGE_PATH}/${network["logo_path"]}`}
                                  alt={network.name + " logo"}
                                  className="details-view__network-image"
                                />
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <MediaCarousel
                label={MediaCarouselLabel}
                pathName={pathName}
                dataResource="cast"
                responsiveOptions={responsiveOptions}
                media={isPerson ? "movie" : "person"}
                buttonText={!isPerson ? "Cast and Crew" : null}
                buttonLink={`${config.credits.path}/${type}/${programmeId}/${title}`}
              />

              {!isPerson && !!recommendations?.length && (
                <MediaCarousel
                  label={`Recommended ${type === "tv" ? "TV Shows" : "Films"}`}
                  resourceItems={recommendations}
                  responsiveOptions={responsiveOptions}
                  media={type}
                />
              )}
            </Container>
          </div>
        </Fade>
      )}
      {error && (
        <p
          className="error"
          data-testid="details-view-error"
        >
          There was a problem getting the detail page - please try again later.
        </p>
      )}
      <Modal
        id={resource.id}
        open={isOpenModal}
        handleClose={() => setIsOpenModal(false)}
        variant={["image"]}
      >
        {renderImage()}
      </Modal>
      <Modal
        id={resource.id + "-seasons"}
        open={isOpenSeasonsModal}
        handleClose={() => setIsOpenSeasonsModal(false)}
        title={title}
      >
        <Accordion
          key={resource.id}
          label="seasons"
          items={resource.seasons}
          hasImage
        />
      </Modal>
      <Backdrop open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  );
};
export default DetailsView;
