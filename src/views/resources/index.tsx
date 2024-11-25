import React, { useEffect } from "react";

// Components
import Card from "../../components/card";

// MUI
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Fade, Grid, Pagination } from "@mui/material";

// Styles
import "./resources.scss";

// Utils
import useScreenSize from "../../utils/use-screen-size";

interface Props {
  resources?: any;
  totalResults?: number;
  handlePageChange?: (event: React.ChangeEvent<unknown>, value: number) => void;
  count?: number;
  page?: number;
  loading?: boolean;
}

const Resources: React.FC<Props> = ({ resources, totalResults, handlePageChange, count, page, loading }) => {
  const screenSize = useScreenSize();
  const isMobile = screenSize.width <= 480;

  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div
      className="resources"
      data-testid="resources"
    >
      <Fade in={!!resources?.length}>
        <div className="resources__inner">
          <div className="resources__count">
            <h3>
              Total results - {totalResults < 10000 ? totalResults : 10000} {totalResults > 10000 ? "(Max Results)" : ""}
            </h3>
          </div>
          <Grid
            aria-label="Results"
            container
            spacing={2}
            rowGap={0}
            component="ul"
            columns={20}
          >
            {resources.map((item: any, i: number) => {
              const path = item["media_type"] ? item["media_type"] : window.location.pathname.split("/")[2];

              return (
                <Grid
                  component="li"
                  item
                  xs={10}
                  sm={5}
                  lg={4}
                  key={i}
                >
                  <Card
                    resource={item}
                    onClick={() => (window.location.href = `/details/${path}/${item.id}`)}
                  />
                </Grid>
              );
            })}
          </Grid>
          <div className="resources__pagination">
            <Pagination
              count={count < 500 ? page : 500}
              page={page}
              onChange={handlePageChange}
              color="primary"
              siblingCount={isMobile ? 0 : 3}
            />
          </div>
        </div>
      </Fade>
      <Backdrop open={!!loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  );
};

export default Resources;
