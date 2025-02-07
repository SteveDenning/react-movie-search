import React, { useEffect, useState } from "react";

// Services
import { getMedia, getMediaByID } from "../../services/media";

// Component
import Button from "../../components/button";
import Card from "../../components/card";
import SectionHeading from "../../components/section-heading";
import Tabs from "../../components/tabs";

// Styles
import "./credits.scss";
import { Backdrop, CircularProgress, Container, Fade, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  handleMediaTitle: (title: string) => void;
}

const Credits: React.FC<Props> = ({ handleMediaTitle }) => {
  const [cast, setCast] = useState<any[]>([]);
  const [crew, setCrew] = useState<any[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [heading, setHeading] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState("cast");

  const type = window.location.pathname.split("/")[2];
  const programmeId = window.location.pathname.split("/")[3];
  const pathName = `${type}/${programmeId}/credits?language=en-US`;
  const navigate = useNavigate();

  const getMediaDetails = () => {
    if (programmeId && type) {
      setLoading(true);
      getMediaByID(programmeId, type)
        .then((response: any) => {
          handlePageHeading(response.data.name || response.data.title);
          getCastAndCrew();
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          setError(true);
        });
    }
  };

  const getCastAndCrew = () => {
    getMedia(pathName)
      .then((response: any) => {
        setCast(response.data.cast);
        setCrew(response.data.crew);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
        setLoading(false);
      });
  };

  const handlePageHeading = (heading: string) => {
    handleMediaTitle(heading);
    setHeading(heading);
  };

  const handleTabChange = (tab: { label: string; value: string }) => {
    setSelectedTab(tab.value);
  };

  useEffect(() => {
    getMediaDetails();
  }, []);

  const renderTab = (resource: any, type: string) => {
    return (
      <Fade in={selectedTab === type}>
        <div>
          {resource?.length ? (
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
                    xs={20}
                    sm={10}
                    md={5}
                    lg={4}
                    key={index}
                  >
                    <Card
                      key={item.id + index}
                      resource={item}
                      onClick={() => (window.location.href = `/details/person/${item.id}`)}
                      variant="details"
                    />
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <p className="credits__no-results">Ooops, looks like there&#39;s no {type} available</p>
          )}
        </div>
      </Fade>
    );
  };

  return (
    <Fade in={!loading}>
      <div
        className="credits"
        data-testid="credits"
      >
        <Container>
          <SectionHeading heading={heading}>
            <Button onClick={() => navigate(-1)}>Back</Button>
          </SectionHeading>

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
          {error && (
            <p
              className="error"
              data-testid="details-view-error"
            >
              There was a problem getting the detail page - please try again later
            </p>
          )}
        </Container>
        <Backdrop open={loading}>
          <CircularProgress color="primary" />
        </Backdrop>
      </div>
    </Fade>
  );
};

export default Credits;
