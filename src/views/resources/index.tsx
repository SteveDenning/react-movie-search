import React from "react";

// Components
import Card from "../../components/card";

// MUI
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
}

const Resources: React.FC<Props> = ({ resources, totalResults, handlePageChange, count, page }) => {
  const screenSize = useScreenSize();
  const isMobile = screenSize.width <= 480;

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
          >
            {resources.map((item: any, i: number) => {
              const segment = item.gender ? 2 : 3;

              return (
                <Grid
                  component="li"
                  item
                  xs={6}
                  sm={6}
                  lg={3}
                  key={i}
                >
                  <Card
                    resource={item}
                    onClick={() => (window.location.href = `/details/${window.location.pathname.split("/")[segment]}/${item.id}`)}
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
    </div>
  );
};

export default Resources;
