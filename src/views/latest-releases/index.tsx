import { useEffect, useState } from "react";

// Utils
import { getLatestReleases } from "../../utils/services";

// Components
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Fade } from "@mui/material";
import Image from "../../components/image";

// Styles
import "./latest-releases.scss";

const LatestReleases = () => {
  const [results, setResults] = useState<any>([]);
  const [open, setOpen] = useState(false);

  const fetLatestRelease = () => {
    setOpen(true);
    // Build query for request
    getLatestReleases()
      .then((response: any) => {
        setResults(response.data.results);
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
                  onClick={() => (window.location.href = `/details/${item.id}`)}
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
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  );
};

export default LatestReleases;
