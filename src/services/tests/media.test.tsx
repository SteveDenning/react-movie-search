import axios from "axios";
import { getMedia, getMediaByID } from "../media";
import { headers } from "../headers";

jest.mock("axios");

describe("getMedia", () => {
  const path = "movie/popular";
  const mockResponse = {
    data: {
      results: [
        { id: 1, title: "Inception" },
        { id: 2, title: "Interstellar" },
      ],
    },
  };

  it("should fetch media successfully", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(mockResponse);

    const response = await getMedia(path);

    expect(axios.get).toHaveBeenCalledWith(`https://api.themoviedb.org/3/${path}?language=en-US`, headers);
    expect(response).toEqual(mockResponse);
  });

  it("should handle API errors", async () => {
    const errorMessage = "Network Error";
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(new Error(errorMessage));

    await expect(getMedia(path)).rejects.toThrow(errorMessage);
  });
});

describe("getMediaByID", () => {
  const id = "12345";
  const type = "movie";
  const mockResponse = {
    data: { id: 12345, title: "Inception" },
  };

  it("should fetch media by ID successfully", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(mockResponse);

    const response = await getMediaByID(id, type);

    expect(axios.get).toHaveBeenCalledWith(`https://api.themoviedb.org/3/${type}/${id}?language=en-US`, headers);
    expect(response).toEqual(mockResponse);
  });

  it("should handle API errors", async () => {
    const errorMessage = "Network Error";
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(new Error(errorMessage));

    await expect(getMediaByID(id, type)).rejects.toThrow(errorMessage);
  });
});
