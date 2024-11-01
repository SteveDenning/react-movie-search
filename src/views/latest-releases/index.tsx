import { useEffect, useState } from "react";

// Utils
import { getLatestReleases } from "../../utils/services";

// Components
import Backdrop from "@mui/material/Backdrop";
import Carousel from "../../components/carousel";
import CircularProgress from "@mui/material/CircularProgress";
import { Container, Fade } from "@mui/material";

// Styles
import "react-multi-carousel/lib/styles.css";
import "./latest-releases.scss";

const LatestReleases = () => {
  const [resources, setResources] = useState<any>([]);
  const [open, setOpen] = useState(false);

  const fetLatestRelease = () => {
    setOpen(true);
    getLatestReleases()
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
            <h2>Latest Releases</h2>
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
