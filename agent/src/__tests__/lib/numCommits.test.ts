import { numCommits } from "../../lib/numCommits";

process.env.ORGANIZATION = "foo";

test("returns null if the Github returns a error", async () => {
  const mockClient = {
    repos: {
      listCommits: async () => ({})
    }
  }
  expect(await numCommits(mockClient, "bar", 60)).toEqual(null);
});

test("returns the number of commits in the last 60 days", async () => {
  const mockClient = {
    repos: {
      listCommits: async () => ({data: [{"test": "test"}, {"test": "Test"}]})
    }
  }
  expect(await numCommits(mockClient, "bar", 60)).toEqual(2);
});