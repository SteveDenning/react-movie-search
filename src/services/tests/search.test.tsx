import axios from "axios";
import { getAllMediaFromSearch } from "../search";
import { headers } from "../headers";

jest.mock("axios");

describe("getAllMediaFromSearch", () => {
  const queryString = "movie?query=inception";
  const mockResponse = {
    data: {
      results: [
        { id: 1, title: "Inception" },
        { id: 2, title: "Interstellar" },
      ],
    },
  };

  it("should fetch search results successfully", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(mockResponse);

    const response = await getAllMediaFromSearch(queryString);

    expect(axios.get).toHaveBeenCalledWith(`https://api.themoviedb.org/3/search/${queryString}&language=en-US`, headers);
    expect(response).toEqual(mockResponse);
  });

  it("should handle API errors", async () => {
    const errorMessage = "Network Error";
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(new Error(errorMessage));

    await expect(getAllMediaFromSearch(queryString)).rejects.toThrow(errorMessage);
  });
});
