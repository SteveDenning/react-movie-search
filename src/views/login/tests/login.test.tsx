import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";

// Components
import LoginIn from "../index";

describe("Login In component", () => {
  describe("Component rendering (logged in)", () => {
    const onClick = jest.fn();
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
          onClick={onClick}
          user={user}
        />,
      ),
    );

    it("Should render a Login In", () => {
      expect(screen.getByTestId("login")).toBeInTheDocument();
    });

    it("Should allow the user to click the button", () => {
      fireEvent.click(screen.getByTestId("login"));

      expect(onClick).toHaveBeenCalled();
    });

    it("Should display an avatar if one is present", () => {
      expect(screen.getByTestId("login-avatar")).toBeInTheDocument();
    });
  });

  describe("Component rendering (logged in no image)", () => {
    const onClick = jest.fn();
    const user = {
      avatar: {
        tmdb: {
          avatar_path: null,
        },
      },
      name: "Steve Denning",
    };

    beforeEach(() =>
      render(
        <LoginIn
          onClick={onClick}
          user={user}
        />,
      ),
    );

    it("Should display the users initials if no avatar is present", () => {
      expect(screen.getByTestId("login-user-initials")).toBeInTheDocument();
    });
  });

  describe("Component rendering (logged out)", () => {
    const onClick = jest.fn();
    const user = null;

    beforeEach(() =>
      render(
        <LoginIn
          onClick={onClick}
          user={user}
        />,
      ),
    );

    it("Should display a user placeholder image when logged out", () => {
      expect(screen.getByTestId("Person3OutlinedIcon")).toBeInTheDocument();
    });
  });
});
