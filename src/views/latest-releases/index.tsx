import React, { useEffect, useState } from "react";

// Utils
import { getLatestReleases } from "../../utils/get-resources";

// Components
import Backdrop from "@mui/material/Backdrop";
import Carousel from "../../components/carousel";
import CircularProgress from "@mui/material/CircularProgress";
import { Container, Fade } from "@mui/material";

// Styles
import "react-multi-carousel/lib/styles.css";
import "./latest-releases.scss";

interface Props {
  url: string;
  label: string;
}

const LatestReleases: React.FC<Props> = ({ url, label }) => {
  const [resources, setResources] = useState<any>([]);
  const [open, setOpen] = useState(false);

  const fetLatestRelease = () => {
    setOpen(true);
    getLatestReleases(url)
      .then((response: any) => {
        setResources(response.data.results);
        setOpen(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetLatestRelease();
  }, []);

  return (
    <>
      <Fade in={!!resources.length}>
        <div
          data-testid="latest-releases"
          className="latest-releases"
        >
          <Container>
            <h2>Latest {label} Releases</h2>
            <Carousel resources={resources} />
          </Container>
        </div>
      </Fade>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default LatestReleases;
