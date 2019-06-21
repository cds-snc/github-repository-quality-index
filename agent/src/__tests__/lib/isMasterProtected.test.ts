import { isMasterProtected } from "../../lib/isMasterProtected";

process.env.ORGANIZATION = "foo";

test("returns null if github returns a error", async () => {
  const mockClient = {
    repos: {
      getBranchProtection: async () => ({})
    }
  }
  expect(await isMasterProtected(mockClient, "bar")).toEqual(null);
});

test("returns false if github returns a 404", async () => {
  const mockClient = {
    repos: {
      getBranchProtection: async () => {throw {status: 404}}
    }
  }
  expect(await isMasterProtected(mockClient, "bar")).toEqual(false);
});

test("returns true if the github repo has a protected master branch with code review", async () => {
  const mockClient = {
    repos: {
      getBranchProtection: async () => ({data: {required_pull_request_reviews: {}}})
    }
  }
  expect(await isMasterProtected(mockClient, "bar")).toEqual(true);
});

test("returns false if the github repo has a protected master branch without code review", async () => {
  const mockClient = {
    repos: {
      getBranchProtection: async () => ({data: {}})
    }
  }
  expect(await isMasterProtected(mockClient, "bar")).toEqual(false);
});