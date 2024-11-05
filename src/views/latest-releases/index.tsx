import React, { useEffect, useState } from "react";

// Utils
import { getLatestReleases } from "../../utils/get-resources";

// Components
import Backdrop from "@mui/material/Backdrop";
import Carousel from "../../components/carousel";
import CircularProgress from "@mui/material/CircularProgress";
import { Container, Fade } from "@mui/material";

// Styles
import "./latest-releases.scss";

interface Props {
  url: string;
  label: string;
  type: string;
}

const LatestReleases: React.FC<Props> = ({ url, label, type }) => {
  const [resources, setResources] = useState<any>([]);
  const [open, setOpen] = useState(false);

  const fetchLatestRelease = () => {
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
    fetchLatestRelease();
  }, []);

  return (
    <>
      <Fade in={!!resources.length}>
        <div
          data-testid="latest-releases"
          className="latest-releases"
        >
          <Container>
            <Carousel
              resources={resources}
              label={label}
              type={type}
            />
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
