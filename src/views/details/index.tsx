import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

// Utils
import { getMediaByID, getMediaVideos, getCasting } from "../../utils/get-resources";

// Components
import Button from "../../components/button";
import Image from "../../components/image";
import Video from "../../components/video";
import Modal from "../../components/modal";

// MUI
import { Backdrop, CircularProgress, Container, Fade } from "@mui/material";

// Styles
import "./details.scss";
import Carousel from "../../components/carousel";

const DetailsView = () => {
  const [backDrop, setBackDrop] = useState<string>("");
  const [loaded, setLoaded] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [resource, setResource] = useState<any>({});
  const [video, setVideo] = useState<string>("");
  const [castings, setCastings] = useState<string>("");

  const navigate = useNavigate();
  const programmeId = window.location.pathname.split("/")[3] as string;
  const type = window.location.pathname.split("/")[2];
  const backgroundImage = backDrop ? `url(${process.env.REACT_APP_TMDB_PATH}/t/p/original/${backDrop})` : "";

  const getMedia = () => {
    if (programmeId && type) {
      getMediaByID(programmeId, type)
        .then((response: any) => {
          setResource(response.data);
          setBackDrop(response.data.backdrop_path);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const getVideos = (id: string, type: string) => {
    if (type !== "person") {
      getMediaVideos(id, type)
        .then((response: any) => {
          setVideo(response.data.results[0]?.key);
          setLoaded(true);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setLoaded(true);
    }
  };

  const getCastingMedia = (id: string, type: string) => {
    if (type == "person") {
      getCasting(id, type)
        .then((response: any) => {
          setCastings(response.data.cast);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setLoaded(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    getVideos(programmeId, type);
    getCastingMedia(programmeId, type);
  }, [resource]);

  useEffect(() => {
    getMedia();
  }, [programmeId]);

  return (
    <>
      <Fade in={loaded}>
        <div
          data-testid="details-view"
          className="details-view"
          style={{ backgroundImage: backgroundImage }}
        >
          <Container>
            <div className="details-view__inner">
              {!!video && (
                <div className="details-view__video">
                  <Video
                    url={video}
                    playing
                  />
                </div>
              )}
              <div data-testid="details-view__inner">
                <div className="details-view__content">
                  {resource["profile_path"] && (
                    <div className="details-view__profile">
                      <div className="details-view__profile-image">
                        <Image
                          resource={resource}
                          size="medium"
                          imagePath="profile_path"
                        />
                      </div>
                      <div className="details-view__profile-details">
                        <h2>{resource.name}</h2>
                        {resource.birthday && <p>{moment(resource.birthday).format("MMMM Do YYYY")}</p>}
                        {resource["place_of_birth"] && <p>{resource["place_of_birth"]}</p>}
                        {resource["known_for_department"] && <p>{resource["known_for_department"]}</p>}
                        {resource["imdb_id"] && (
                          <p className="details-view__imdb">
                            <Button
                              target="_blank"
                              variant="link"
                              href={`https://www.imdb.com/name/${resource["imdb_id"]}`}
                            >
                              <span>IMDb</span>
                            </Button>
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {(resource?.overview?.length || resource?.biography?.length) > 1200 ? (
                    <>
                      <p>
                        {(resource.overview || resource.biography).slice(0, 10000)}.....{" "}
                        {/* <Button
                          onClick={() => setIsOpen(true)}
                          variant="link"
                        >
                          More
                        </Button> */}
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
                      <h2>{resource.title}</h2>
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
                      <p>Networks</p>
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
                  <br />
                  <div className="details-view__back-button">
                    <Button onClick={() => navigate(-1)}>Back</Button>
                  </div>
                </div>
              </div>
            </div>
            {castings.length && (
              <>
                <h2>Known For:</h2>
                <Carousel
                  resources={castings}
                  imagePath="poster_path"
                  media="movie"
                />
              </>
            )}
          </Container>
        </div>
      </Fade>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={!loaded}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
export default DetailsView;
