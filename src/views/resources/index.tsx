import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// Components
import Card from "../../components/card";
import Pagination from "../../components/pagination";

// MUI
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Fade, Grid } from "@mui/material";

// Styles
import "./resources.scss";

interface Props {
  resources: any;
  handlePageChange?: (event: React.ChangeEvent<any>, value: number) => void;
  count: number;
  page: number;
  loading: boolean;
}

const Resources: React.FC<Props> = ({ resources, handlePageChange, count, page, loading }) => {
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");

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
          <Grid
            aria-label="Results"
            container
            spacing={2}
            rowGap={0}
            component="ul"
            columns={20}
          >
            {resources.map((item: any, i: number) => {
              const path = item["media_type"] ? item["media_type"] : type;

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
                    variant="resource"
                  />
                </Grid>
              );
            })}
          </Grid>
          {count > 1 && (
            <div className="resources__pagination">
              <Pagination
                count={count}
                page={page}
                onChangePage={handlePageChange}
              />
            </div>
          )}
        </div>
      </Fade>
      <Backdrop open={!!loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  );
};

export default Resources;
