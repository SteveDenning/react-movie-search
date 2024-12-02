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
  onChange: (event: React.ChangeEvent<any>, value: number) => void;
}

const PaginationComponent: React.FC<Props> = ({ count, onChange, page }) => {
  const screenSize = useScreenSize();
  const isTablet = screenSize.width <= 1024;

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
    </div>
  );
};

export default PaginationComponent;
