import { hasLicense } from "../../lib/hasLicense";

process.env.ORGANIZATION = "foo";

test("returns null if the Github returns a error", async () => {
  const mockClient = {
    repos: {
      getContents: async () => ({})
    }
  };
  expect(await hasLicense(mockClient, "bar")).toEqual(null);
});

test("returns true if the github repo has LICENSE", async () => {
  const mockClient = {
    repos: {
      getContents: async () => ({ data: { content: "TUlU" } })
    }
  };
  expect(await hasLicense(mockClient, "bar")).toEqual(true);
});

test("returns null if LICENSE is not found", async () => {
  const mockClient = {
    repos: {
      getContents: async () => ({ data: { content: "" } })
    }
  };
  expect(await hasLicense(mockClient, "bar")).toEqual(null);
});
