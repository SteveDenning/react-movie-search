import React from "react";
import "@testing-library/jest-dom";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Services
import { getFavorites } from "../../../services/favorites";

// Variables
import { variables } from "./config";

// Mock
jest.mock("../../../services/favorites");

// Components
import Resources from "../index";

describe("Resources component", () => {
  describe("Component rendering", () => {
    beforeAll(() => {
      Object.defineProperty(window, "location", {
        value: {
          pathname: "/media-listing/movie/now_playing",
          search: "?page=1&type=movie",
          href: "/details/movie/100",
        },
        writable: true,
      });
    });

    beforeEach(async () => {
      (getFavorites as jest.Mock).mockResolvedValue(variables.favourites);

      await waitFor(() => {
        render(
          <MemoryRouter>
            <Resources
              resources={variables.resources}
              count={3}
              page={1}
              loading={false}
            />
          </MemoryRouter>,
        );
      });
    });

    it("Should render resources", () => {
      expect(screen.getByTestId("resources")).toBeInTheDocument();
    });

    it("Should render pagination", () => {
      expect(screen.getByTestId("pagination")).toBeInTheDocument();
    });

    it("Should allow the user to click a card", async () => {
      expect(screen.getAllByTestId("button")).toHaveLength(3);
      fireEvent.click(screen.getAllByTestId("button")[0]);
      await waitFor(() => expect(window.location.href).toBe("/details/movie/912649"));
    });
  });

  // describe("Component rendering (error state)", () => {
  //   it("Should render the Media listing error message", async () => {
  //     const consoleSpy = jest.spyOn(console, "error").mockImplementation();

  //     (getFavorites as jest.Mock).mockResolvedValue(variables.error);

  //     render(
  //       <MemoryRouter>
  //         <Resources
  //           resources={variables.resources}
  //           count={3}
  //           page={1}
  //           loading={false}
  //         />
  //       </MemoryRouter>,
  //     );
  //     await waitFor(() => expect(consoleSpy).toHaveBeenCalled());
  //   });
  // });
});
