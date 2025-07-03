import axios from "axios";

import {
  getRequestToken,
  getAccessToken,
  deleteAccessToken,
  getAccountDetails,
  createSessionWithAccessToken,
  getUserDoc,
  getAllUsers,
  addUser,
} from "../user";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
// Firebase
import { db } from "../../firebase";

jest.mock("axios");
jest.mock("firebase/firestore");

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

  it("Should return user data if doc exists", async () => {
    const mockData = { name: "Test User" };
    (doc as jest.Mock).mockReturnValue("docRef");
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      data: () => mockData,
    });

    const result = await getUserDoc("123");
    expect(doc).toHaveBeenCalledWith(db, "users", "123");
    expect(result).toEqual(mockData);
  });

  it("returns null if doc does not exist", async () => {
    (doc as jest.Mock).mockReturnValue("docRef");
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => false,
    });

    const result = await getUserDoc("123");
    expect(result).toBeNull();
  });

  it("Should return all users", async () => {
    const mockDocs = [
      { id: "1", data: () => ({ name: "A" }) },
      { id: "2", data: () => ({ name: "B" }) },
    ];
    const mockSnapshot = { docs: mockDocs };
    (collection as jest.Mock).mockReturnValue("usersCol");
    (getDocs as jest.Mock).mockResolvedValue(mockSnapshot);

    const result = await getAllUsers();
    expect(collection).toHaveBeenCalledWith(db, "users");
    expect(result).toEqual([
      { id: "1", name: "A" },
      { id: "2", name: "B" },
    ]);
  });

  it("Should add a user with correct params", async () => {
    const user = { id: "123", name: "Test User" };
    (doc as jest.Mock).mockReturnValue("userRef");
    const setDoc = require("firebase/firestore").setDoc;
    setDoc.mockResolvedValue(undefined);

    await addUser(user);
    expect(doc).toHaveBeenCalledWith(db, "users", "123");
    expect(setDoc).toHaveBeenCalledWith("userRef", user, { merge: true });
  });

  it("Should throw if user has no id", async () => {
    await expect(addUser({})).rejects.toThrow("User must have an id");
  });
});
