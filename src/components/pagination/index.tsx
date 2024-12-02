import React from "react";

// Utils
import useScreenSize from "../../utils/use-screen-size";

// MUI
import { Pagination } from "@mui/material";

// Styles
import "./pagination.scss";

interface Props {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<any>, value: number) => void;
}

const PaginationComponent: React.FC<Props> = ({ count, onChange, page }) => {
  const screenSize = useScreenSize();
  const isMobile = screenSize.width <= 480;

  return (
    <div
      className="pagination"
      data-testid="pagination"
    >
      {count > 1 && (
        <Pagination
          count={count < 500 ? count : 500}
          page={page}
          onChange={onChange}
          color="primary"
          siblingCount={isMobile ? 0 : 3}
        />
      )}
    </div>
  );
};

export default PaginationComponent;
