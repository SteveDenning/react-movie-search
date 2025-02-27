import axios from "axios";
import { getGenres } from "../genres";
import { headers } from "../headers";

jest.mock("axios");

describe("Genres service (getGenres)", () => {
  const mediaType = "movie";
  const mockResponse = {
    data: {
      genres: [
        { id: 28, name: "Action" },
        { id: 35, name: "Comedy" },
      ],
    },
  };

  it("Should fetch genres successfully", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(mockResponse);

    const response = await getGenres(mediaType);

    expect(axios.get).toHaveBeenCalledWith(`https://api.themoviedb.org/3/genre/${mediaType}/list?language=en-US`, headers);
    expect(response).toEqual(mockResponse);
  });

  it("Should handle API errors", async () => {
    const errorMessage = "Network Error";
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(new Error(errorMessage));

    await expect(getGenres(mediaType)).rejects.toThrow(errorMessage);
  });
});
