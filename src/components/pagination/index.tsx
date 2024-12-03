import React from "react";

// Utils
import useScreenSize from "../../utils/use-screen-size";

// MUI
import { Pagination } from "@mui/material";
import PaginationItem from "@mui/material/PaginationItem";

// MUI Icons
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// Styles
import "./pagination.scss";

interface Props {
  count: number;
  page: number;
  onChangePage: (event: React.ChangeEvent<any>, value: number) => void;
}

const PaginationComponent: React.FC<Props> = ({ count, onChangePage, page }) => {
  const screenSize = useScreenSize();
  const isTablet = screenSize.width <= 1024;

  return (
    <>
      {count > 1 && (
        <Pagination
          className="pagination"
          data-testid="pagination"
          count={count < 500 ? count : 500}
          page={page}
          onChange={onChangePage}
          siblingCount={isTablet ? 0 : 3}
          renderItem={(item) => (
            <PaginationItem
              {...item}
              components={{
                previous: () => (isTablet ? <NavigateBefore /> : <span>Previous</span>),
                next: () => (isTablet ? <NavigateNextIcon /> : <span>Next</span>),
              }}
            />
          )}
        />
      )}
    </>
  );
};

export default PaginationComponent;
