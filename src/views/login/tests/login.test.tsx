import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import LoginIn from "../index";

describe("Login In component", () => {
  describe("Component rendering", () => {
    const toggleDrawer = jest.fn();
    const user = {
      avatar: {
        tmdb: {
          avatar_path: "https://image.tmdb.org/t/p/original/4dztY5QDPjiWj8e8YnenPV4J6SI.png",
        },
      },
      name: "Steve Denning",
    };

    beforeEach(() =>
      render(
        <LoginIn
          onClick={toggleDrawer}
          user={user}
        />,
      ),
    );

    it("Should render a Login In", () => {
      expect(screen.getByTestId("login")).toBeInTheDocument();
    });
  });
});
