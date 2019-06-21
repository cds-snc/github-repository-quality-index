import { reviews } from "../../lib/reviews";

process.env.ORGANIZATION = "foo";

test("returns null if the Github returns a error", async () => {
  const mockClient = {
    search: {
      issuesAndPullRequests: async () => ({})
    }
  }
  expect(await reviews(mockClient, "bar")).toEqual(null);
});

test("returns 0 if no merges are done", async () => {
  const mockClient = {
    search: {
      issuesAndPullRequests: async (): Promise<any> => ({data:{items:[], total_count:0}})
    }
  }
  expect(await reviews(mockClient, "bar")).toEqual(0);
});

test("returns 100 if all merges are reviewed", async () => {
  const mockClient = {
    pulls: {
      listReviewRequests: async (): Promise<any> => ({data: {users: ["foo"]}})
    },
    search: {
      issuesAndPullRequests: async (): Promise<any> => ({data: {items: [{pull_number: 1}], total_count:1}})
    }
  }
  expect(await reviews(mockClient, "bar")).toEqual(100);
});

test("returns 0 if no merges are reviewed", async () => {
  const mockClient = {
    pulls: {
      listReviewRequests: async (): Promise<any> => ({data: {users: []}})
    },
    search: {
      issuesAndPullRequests: async (): Promise<any> => ({data: {items: [{pull_number: 1}], total_count:1}})
    }
  }
  expect(await reviews(mockClient, "bar")).toEqual(0);
});