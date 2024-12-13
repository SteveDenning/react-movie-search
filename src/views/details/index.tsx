import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

// Utils
import { getMediaByID, getVideos } from "../../utils/get-resources";

// Components
import Button from "../../components/button";
import Image from "../../components/image";
import MediaCarousel from "../../views/media-carousel";
import Modal from "../../components/modal";
import Video from "../../components/video";

// MUI
import { Backdrop, CircularProgress, Container, Fade } from "@mui/material";

// Styles
import "./details.scss";

const DetailsView = () => {
  const [backDrop, setBackDrop] = useState<string>("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [resource, setResource] = useState<any>({});
  const [videoKey, setVideoKey] = useState<string>("");

  const navigate = useNavigate();

  const programmeId = window.location.pathname.split("/")[3] as string;
  const type = window.location.pathname.split("/")[2];
  const backgroundImage = backDrop ? `url(${process.env.REACT_APP_TMDB_PATH}/t/p/original/${backDrop})` : "";
  const isMedia = type == "tv" || "movie";
  const isPerson = type == "person";
  const MediaCarouselLabel = isPerson ? "Known for" : "Top Cast";
  const pathName = `${type}/${programmeId}/credits?language=en-US`;

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
          setBackDrop(response.data.backdrop_path);
          setLoading(false);
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

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    fetchVideos(programmeId, type);
  }, [resource]);

  useEffect(() => {
    getMedia();
  }, [programmeId]);

  return (
    <>
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
                  />
                </div>
              )}
              <div className="details-view__content">
                <div className="details-view__profile">
                  {resource["profile_path"] && (
                    <div className="details-view__profile-image">
                      <Image
                        id={resource.id}
                        resource={resource}
                        size="large"
                      />
                    </div>
                  )}
                  <div>
                    <div className="details-view__profile-details">
                      <h2 className="details-view__title">
                        {resource.name || resource.title}{" "}
                        {isMedia && resource?.["release_date"] && <span>({moment(resource?.["release_date"]).format("YYYY")})</span>}
                      </h2>
                      {resource.birthday && <p>{moment().diff(resource.birthday, "years")} years old</p>}
                      {resource["place_of_birth"] && <p>{resource["place_of_birth"]}</p>}
                      {resource["known_for_department"] && <p>Known for: {resource["known_for_department"]}</p>}
                    </div>
                    {(resource?.overview?.length || resource?.biography?.length) > 400 ? (
                      <>
                        <p>
                          {(resource.overview || resource.biography).slice(0, 400)}.....{" "}
                          <Button
                            onClick={() => setIsOpen(true)}
                            variant="link"
                          >
                            More
                          </Button>
                        </p>

                        <Modal
                          id={resource.id}
                          open={isOpen}
                          handleClose={handleClose}
                        >
                          <p>{resource.overview || resource.biography}</p>
                        </Modal>
                      </>
                    ) : (
                      <>
                        <p>{resource.overview || resource.biography}</p>
                      </>
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
                                src={`${process.env.REACT_APP_TMDB_PATH}/t/p/original/${network["logo_path"]}`}
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
      {error && (
        <p
          className="error"
          data-testid="banner-carousel-error"
        >
          There was a problem getting the detail - please try again later
        </p>
      )}
      <Backdrop open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  );
};
export default DetailsView;
