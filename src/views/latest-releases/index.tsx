import { useEffect, useState } from "react";
import { getLatestReleases } from "../../utils/services";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

// Styles
import "./latest-releases.scss";
import { Fade } from "@mui/material";
import Image from "../../components/image";

const LatestReleases = () => {
  const [results, setResults] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const fetLatestRelease = () => {
    setOpen(true);
    // Build query for request
    getLatestReleases()
      .then((response: any) => {
        setResults(response.data.results);
        console.log(response.data.results);
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
      <Fade in={!!results.length}>
        <div
          data-testid="latest-releases"
          className="latest-releases"
        >
          <h2>Latest Releases</h2>
          <ul className="latest-releases__list">
            {results.map((item: any, i: number) => {
              return (
                <li
                  key={i}
                  className="latest-releases__list-item"
                >
                  <Image
                    resource={item}
                    size="medium"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </Fade>
      <div>
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  );
};

export default LatestReleases;
