import React from "react";
import "@testing-library/jest-dom";
import { screen, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Components
import SearchResults from "../index";

// Services
import { getAllMediaFromSearch } from "../../../services/search";

// Variables
import { variables } from "./config";

// Mock
jest.mock("../../../services/search");

describe("Search component", () => {
  describe("Component rendering", () => {
    window.location = {
      search: "?query=harry&filterByType=multi&page=1",
    } as any;

    beforeEach(async () => {
      (getAllMediaFromSearch as jest.Mock).mockResolvedValue(variables.response);

      await waitFor(() => {
        render(
          <MemoryRouter>
            <SearchResults />
          </MemoryRouter>,
        );
      });
    });
    it("Should render the search form", () => {
      expect(screen.getByTestId("search-results")).toBeInTheDocument();
    });
  });

  // describe("Component rendering (error state)", () => {
  //   window.location = {
  //     search: "?query=harry&filterByType=multi&page=1",
  //   } as any;

  //   beforeEach(async () => {
  //     (getAllMediaFromSearch as jest.Mock).mockResolvedValue(variables.error);

  //     await waitFor(() => {
  //       render(
  //         <MemoryRouter>
  //           <SearchResults />
  //         </MemoryRouter>,
  //       );
  //     });
  //   });
  //   it("Should render the Search error message", async () => {
  //     await waitFor(() => expect(screen.queryAllByTestId("search-results-error")[0]).toBeInTheDocument());
  //   });
  // });
});
