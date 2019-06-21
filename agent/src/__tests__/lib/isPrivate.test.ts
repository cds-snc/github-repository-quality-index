import { isPrivate } from "../../lib/isPrivate";

process.env.ORGANIZATION = "foo";

test("returns null if the Github returns a error", async () => {
  const mockClient = {
    repos: {
      get: async () => ({})
    }
  }
  expect(await isPrivate(mockClient, "bar")).toEqual(null);
});

test("returns true if the github repo is private", async () => {
  const mockClient = {
    repos: {
      get: async () => ({data: {"private": true}})
    }
  }
  expect(await isPrivate(mockClient, "bar")).toEqual(true);
});

test("returns false if the github repo is not private", async () => {
  const mockClient = {
    repos: {
      get: async () => ({data: {"private": false}})
    }
  }
  expect(await isPrivate(mockClient, "bar")).toEqual(false);
});