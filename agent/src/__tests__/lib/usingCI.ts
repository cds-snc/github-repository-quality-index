import { usingCI } from "../../lib/usingCI";

process.env.ORGANIZATION = "foo";

test("returns null if the Github returns a error", async () => {
  const mockClient = {
    repos: {
      getContents: async () => ({})
    }
  };
  expect(await usingCI(mockClient, "bar")).toEqual(null);
});

test("returns true if the github repo has ci", async () => {
  const mockClient = {
    repos: {
      getContents: async () => ({ data: { content: "aGVsbG8=" } })
    }
  };
  expect(await usingCI(mockClient, "bar")).toEqual(true);
});
