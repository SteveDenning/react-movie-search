import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

// Services
import { getFavorites } from "../../services/favorites";
import { getMediaByID, getMedia } from "../../services/media";
import { updateFavorite } from "../../services/favorites";
import { getVideos } from "../../services/videos";

// Components
import AddToFavorites from "../../components/add-to-favorites";
import Button from "../../components/button";
import Image from "../../components/image";
import MediaCarousel from "../../components/media-carousel";
import Modal from "../../components/modal";
import Overview from "../../components/overview";
import Video from "../../components/video";

// MUI
import { Backdrop, CircularProgress, Container, Fade, Grid } from "@mui/material";

// Styles
import "./details.scss";
import Tabs from "../../components/tabs";
import Card from "../../components/card";

interface Props {
  handleMediaTitle: (title: string) => void;
}

const DetailsView: React.FC<Props> = ({ handleMediaTitle }) => {
  const [backDrop, setBackDrop] = useState<string>("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDetails, setIsDetails] = useState<boolean>(true);
  const [resource, setResource] = useState<any>({});
  const [videoKey, setVideoKey] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState("cast");

  const [cast, setCast] = useState<any[]>([]);
  const [crew, setCrew] = useState<any[]>([]);

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

  const getMediaDetails = () => {
    if (programmeId && type) {
      setLoading(true);
      getMediaByID(programmeId, type)
        .then((response: any) => {
          setResource(response.data);
          handleMediaTitle(response.data.name || response.data.title);
          setBackDrop(response.data?.backdrop_path);
          getFavoritesList();
          if (!isPerson) {
            getCastAndCrew();
          }
          getMediaVideos(programmeId, type);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          setError(true);
        });
    }
  };

  const getCastAndCrew = () => {
    setLoading(true);
    getMedia(pathName)
      .then((response: any) => {
        setCast(response.data.cast);
        setCrew(response.data.crew);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      });
  };

  const getMediaVideos = (id: string, type: string) => {
    if (type !== "person") {
      setLoading(true);
      getVideos(id, type)
        .then((response: any) => {
          const trailers = response.data.results.filter((video: any) => video.type === "Trailer");

          trailers.length !== 0 ? setVideoKey(trailers[0]?.key) : setVideoKey(response.data.results[0]?.key);

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
      getFavorites(user.account_id, type)
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

    updateFavorite(user.account_id, body)
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

  const handleTabChange = (tab: { label: string; value: string }) => {
    setSelectedTab(tab.value);
  };

  const renderTab = (resource: any, type: string) => {
    return (
      <Fade in={selectedTab === type}>
        <div>
          <Grid
            aria-label="Results"
            container
            spacing={2}
            rowGap={0}
            component="ul"
            columns={20}
          >
            {resource.map((item: any, index: number) => {
              return (
                <Grid
                  component="li"
                  item
                  xs={10}
                  sm={5}
                  lg={4}
                  key={index}
                >
                  <Card
                    key={item.id + index}
                    resource={item}
                    onClick={() => (window.location.href = `/details/person/${item.id}`)}
                    handleFavorite={handleFavorite}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </Fade>
    );
  };

  useEffect(() => {
    getMediaDetails();
  }, []);

  console.log(cast?.length, crew?.length);

  return (
    <div>
      {isDetails ? (
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
                                {resource.deathday
                                  ? `Died aged ${moment(resource.deathday).diff(resource.birthday, "years")}`
                                  : `${moment().diff(resource.birthday, "years")} years old`}
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
                          {resource.seasons?.length && (
                            <>
                              <p>Seasons: {resource.seasons?.length}</p>
                            </>
                          )}
                          {resource.networks?.length && (
                            <>
                              <ul>
                                {resource.networks.map((network: any, index: number) => (
                                  <li key={network.id + index}>
                                    <img
                                      src={`${process.env.REACT_APP_TMDB_IMAGE_PATH}/${network["logo_path"]}`}
                                      alt=""
                                      className="details-view__network"
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
                    buttonText={cast?.length > 10 ? "Cast and Crew" : null}
                    onClick={() => setIsDetails(!isDetails)}
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
      ) : (
        <Container>
          <Container>
            <div
              className="favorites"
              data-testid="favorites"
            >
              <Button onClick={() => setIsDetails(!isDetails)}>Back</Button>
              <Tabs
                tabs={[
                  { label: "Cast", value: "cast" },
                  { label: "Crew", value: "crew" },
                ]}
                onClick={handleTabChange}
                initialSelection="cast"
              />
              <div className="favorites__inner">
                {selectedTab === "cast" && renderTab(cast, "cast")}
                {selectedTab === "crew" && renderTab(crew, "crew")}
              </div>
            </div>
          </Container>
        </Container>
      )}
    </div>
  );
};
export default DetailsView;
