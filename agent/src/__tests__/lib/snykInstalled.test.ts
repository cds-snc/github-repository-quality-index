import { snykInstalled } from "../../lib/snykInstalled";

process.env.ORGANIZATION = "foo";

test("returns null if the Github returns a error", async () => {
  const mockClient = {
    search: {
      issuesAndPullRequests: async () => ({})
    }
  }
  expect(await snykInstalled(mockClient, "bar")).toEqual(null);
});

test("returns false if snyk does not show up in the status for a merge", async () => {
  const mockClient = {
    pulls: {
      get: async (): Promise<any> => ({data: {head: {sha: "foo"}}})
    },
    repos: {
      listStatusesForRef: async (): Promise<any> => ({data: []})
    },
    search: {
      issuesAndPullRequests: async (): Promise<any> => ({data: {items: [{pull_number: 1}], total_count:1}})
    }
  }
  expect(await snykInstalled(mockClient, "bar")).toEqual(false);
});

test("returns true if snyk shows up in the status for a merge", async () => {
  const mockClient = {
    pulls: {
      get: async (): Promise<any> => ({data: {head: {sha: "foo"}}})
    },
    repos: {
      listStatusesForRef: async (): Promise<any> => ({data: [{context: "snyk"}]})
    },
    search: {
      issuesAndPullRequests: async (): Promise<any> => ({data: {items: [{pull_number: 1}], total_count:1}})
    }
  }
  expect(await snykInstalled(mockClient, "bar")).toEqual(true);
});