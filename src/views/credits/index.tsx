import React, { useEffect, useState } from "react";

// Services
import { getMedia } from "../../services/media";

// Component
import Card from "../../components/card";
import SectionHeading from "../../components/section-heading";
import Tabs from "../../components/tabs";

// Styles
import "./credits.scss";
import { Backdrop, CircularProgress, Container, Fade, Grid } from "@mui/material";

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
  const title = window.location.pathname.split("/")[4] as string;

  const getCastAndCrew = () => {
    if (pathName) {
      getMedia(pathName)
        .then((response: any) => {
          setCast(response.data?.cast);
          setCrew(response.data?.crew);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setError(true);
          setLoading(false);
        });
    }
  };

  const handleTabChange = (tab: { label: string; value: string }) => {
    setSelectedTab(tab.value);
  };

  const handlePageHeading = () => {
    const decodedTitle = decodeURI(title);

    if (decodedTitle) {
      handleMediaTitle(decodedTitle);
      setHeading(decodedTitle);
    }
  };

  useEffect(() => {
    handlePageHeading();
    getCastAndCrew();
  }, []);

  const renderTab = (resource: any, type: string) => {
    return (
      <Fade in={selectedTab === type}>
        <div>
          {resource?.length ? (
            <Grid
              aria-label="credits-results"
              container
              spacing={2}
              rowGap={0}
              component="ul"
              columns={20}
              data-testid="credits-results"
            >
              {resource.map((item: any, index: number) => {
                return (
                  <Grid
                    component="li"
                    item
                    xs={10}
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
            <p
              className="credits__no-results"
              data-testid="credits-no-results"
            >
              Ooops, looks like there&#39;s no {type} available
            </p>
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
          <SectionHeading
            heading={heading}
            backButton
          />

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
              data-testid="credits-error"
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
