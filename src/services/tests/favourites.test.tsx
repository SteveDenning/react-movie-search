import axios from "axios";
import { getFavorites, updateFavorite } from "../favorites";
import { headers } from "../headers";
import pluralize from "pluralize";

jest.mock("axios");

let mockStorage = {};

describe("Favorites service (getFavorites)", () => {
  const userId = "12345";
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

    const response = await getFavorites(userId, type);

    expect(axios.get).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/account/${userId}/favorite/${pluralize(type)}?language=en-US&page=1&sort_by=created_at.desc&session_id=null`,
      headers,
    );
    expect(response).toEqual(mockResponse);
  });

  it("Should return undefined when userId or type is missing", async () => {
    await expect(getFavorites("", type)).resolves.toBeUndefined();
    await expect(getFavorites(userId, "")).resolves.toBeUndefined();
  });
});

describe("Favorites service (updateFavorite)", () => {
  const userId = "12345";
  const body = { media_type: "movie", media_id: 1, favorite: true };
  const mockResponse = { data: { success: true } };

  it("Should update favorite status successfully", async () => {
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue(mockResponse);

    const response = await updateFavorite(userId, body);

    expect(axios.post).toHaveBeenCalledWith(`https://api.themoviedb.org/3/account/${userId}/favorite?session_id=null`, body, {
      ...headers,
      method: "POST",
    });
    expect(response).toEqual(mockResponse);
  });
});
