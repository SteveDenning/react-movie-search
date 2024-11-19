import React from "react";

// Styles
import { Fade, Grid, Pagination } from "@mui/material";

// Assets
import defaultPlaceholder from "../../assets/images/placeholder.png";

// Styles
import "./resources.scss";

interface Props {
  resources?: any;
  totalResults?: number;
  handlePageChange?: (event: React.ChangeEvent<unknown>, value: number) => void;
  count?: number;
  page?: number;
  mediaType?: string;
}

const Resources: React.FC<Props> = ({ resources, totalResults, handlePageChange, count, page, mediaType = "media_type" }) => {
  return (
    <div
      className="resources"
      data-testid="resources"
    >
      <Fade in={!!resources?.length}>
        <div className="resources">
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
              const imageSrc = item["poster_path"] || item["profile_path"];

              return (
                <Grid
                  component="li"
                  item
                  xs={6}
                  sm={6}
                  lg={2}
                  key={i}
                >
                  <button
                    className="resources__list-item-image-wrapper"
                    onClick={() => (window.location.href = `/details/${item[mediaType] || mediaType}/${item.id}`)}
                    tabIndex={0}
                  >
                    <img
                      src={imageSrc ? `https://image.tmdb.org/t/p/original/${imageSrc}` : defaultPlaceholder}
                      alt={item.title || item.name}
                    />
                  </button>
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
            />
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default Resources;
