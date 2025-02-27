import axios from "axios";
import { getVideos } from "../videos";
import { headers } from "../headers";

jest.mock("axios");

describe("Videos service (getVideos)", () => {
  it("Should fetch videos correctly for a given id and type", async () => {
    const mockData = { data: { results: [{ id: "1", name: "Trailer" }] } };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(mockData);

    const id = "12345";
    const type = "movie";
    const response = await getVideos(id, type);

    expect(axios.get).toHaveBeenCalledWith(`https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`, headers);
    expect(response).toEqual(mockData);
  });

  it("Should handle API errors correctly", async () => {
    const errorMessage = "Network Error";
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(new Error(errorMessage));

    await expect(getVideos("12345", "movie")).rejects.toThrow("Network Error");
  });
});
