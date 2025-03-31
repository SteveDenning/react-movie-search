import axios from "axios";
import { getMedia, getMediaByID, getOmdbMedia } from "../media";
import { headers } from "../headers";

// Variables
import { variables } from "./config";

jest.mock("axios");

describe("Media service (getMedia)", () => {
  const path = "movie/popular";

  it("Should fetch media successfully", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(variables.tmdbResource);

    const response = await getMedia(path);

    expect(axios.get).toHaveBeenCalledWith(`https://api.themoviedb.org/3/${path}?language=en-US`, headers);
    expect(response).toEqual(variables.tmdbResource);
  });

  it("Should handle API errors", async () => {
    const errorMessage = "Network Error";
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(new Error(errorMessage));

    await expect(getMedia(path)).rejects.toThrow(errorMessage);
  });
});

describe("Media service (getOmdbMedia)", () => {
  const title = "The Electric State";

  it("Should fetch media successfully", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(variables.omdbResource);

    const response = await getOmdbMedia(title);

    expect(axios.get).toHaveBeenCalledWith(`https://www.omdbapi.com/?apikey=c43485b9&t=${title}`);
    expect(response).toEqual(variables.omdbResource);
  });

  it("Should handle API errors", async () => {
    const errorMessage = "Network Error";
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(new Error(errorMessage));

    await expect(getOmdbMedia(title)).rejects.toThrow(errorMessage);
  });
});

describe("Media service (getMediaByID)", () => {
  const id = "12345";
  const type = "movie";
  const mockResponse = {
    data: { id: 12345, title: "Inception" },
  };

  it("Should fetch media by ID successfully", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(mockResponse);

    const response = await getMediaByID(id, type);

    expect(axios.get).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/${type}/${id}?append_to_response=videos,recommendations,images,reviews&language=en-US`,
      headers,
    );
    expect(response).toEqual(mockResponse);
  });

  it("Should handle API errors", async () => {
    const errorMessage = "Network Error";
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(new Error(errorMessage));

    await expect(getMediaByID(id, type)).rejects.toThrow(errorMessage);
  });
});
