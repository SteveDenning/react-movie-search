import axios from "axios";
import { getFavorites, updateFavorite } from "../favorites";
import { headers } from "../headers";
import pluralize from "pluralize";

jest.mock("axios");

let mockStorage = {};

describe("Favorites service (getFavorites)", () => {
  const user = {
    account_id: "6710dbd71b912add2edbd598",
    session_id: "1c9eaabba0c78782035e900323753c3319cceb1f",
  };
  const type = "movie";

  beforeAll(() => {
    global.Storage.prototype.setItem = jest.fn((key, value) => {
      mockStorage[key] = value;
    });
    global.Storage.prototype.getItem = jest.fn((key) => mockStorage[key]);
  });

  const mockResponse = {
    data: {
      results: [
        { id: 1, title: "Inception" },
        { id: 2, title: "Interstellar" },
      ],
    },
  };

  it("Should fetch favorite items successfully", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(mockResponse);

    const response = await getFavorites(user, type);

    expect(axios.get).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/account/${user.account_id}/favorite/${pluralize(type)}?language=en-US&page=1&sort_by=created_at.desc&session_id=${
        user.session_id
      }`,
      headers,
    );
    expect(response).toEqual(mockResponse);
  });

  it("Should return undefined when userId or type is missing", async () => {
    await expect(getFavorites("", type)).resolves.toBeUndefined();
    await expect(getFavorites(user.account_id, "")).resolves.toBeUndefined();
  });
});

describe("Favorites service (updateFavorite", () => {
  const user = {
    account_id: "6710dbd71b912add2edbd598",
    session_id: "1c9eaabba0c78782035e900323753c3319cceb1f",
  };
  const body = { media_type: "movie", media_id: 1, favorite: true };
  const mockResponse = { data: { success: true } };

  it("Should update favorite status successfully", async () => {
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue(mockResponse);

    const response = await updateFavorite(user, body);

    expect(axios.post).toHaveBeenCalledWith(`https://api.themoviedb.org/3/account/${user.account_id}/favorite?session_id=${user.session_id}`, body, {
      ...headers,
      method: "POST",
    });
    expect(response).toEqual(mockResponse);
  });
});
