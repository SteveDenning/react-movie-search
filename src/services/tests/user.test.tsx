import axios from "axios";

import { getRequestToken, getAccessToken, deleteAccessToken, getAccountDetails, createSessionWithAccessToken } from "../user";

jest.mock("axios");

describe("User service (API calls)", () => {
  it("Should fetch request token successfully", async () => {
    const mockData = { request_token: "mock_token" };
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue({ data: mockData });

    const response = await getRequestToken();
    expect(response.data).toEqual(mockData);
  });

  it("Should fetch access token successfully", async () => {
    const mockData = { access_token: "mock_access_token" };
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue({ data: mockData });

    const response = await getAccessToken({ request_token: "mock_token" });
    expect(response.data).toEqual(mockData);
  });

  it("Should delete access token successfully", async () => {
    const mockData = { success: true };
    (axios.delete as jest.MockedFunction<typeof axios.delete>).mockResolvedValue({ data: mockData });

    const response = await deleteAccessToken("mock_access_token");
    expect(response.data).toEqual(mockData);
  });

  it("Should fetch account details successfully", async () => {
    const mockData = { id: 1, username: "mock_user" };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ data: mockData });

    const response = await getAccountDetails("mock_session_id");
    expect(response.data).toEqual(mockData);
  });

  it("Should create session with access token successfully", async () => {
    const mockData = { session_id: "mock_session_id" };
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue({ data: mockData });

    const response = await createSessionWithAccessToken({ access_token: "mock_access_token" });
    expect(response.data).toEqual(mockData);
  });

  it("Should handle API errors", async () => {
    (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValue(new Error("Network Error"));
    await expect(getRequestToken()).rejects.toThrow("Network Error");
  });
});
