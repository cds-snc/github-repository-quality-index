import { hasSecurityMd } from "../../lib/hasSecurityMd";

process.env.ORGANIZATION = "foo";
const base64encodedStr = "RGlzY2xvc3VyZSBwb2xpY3kKU2VjdXJpdHkgVXBkYXRlIHBvbGljeQpTZWN1cml0eSByZWxhdGVkIGNvbmZpZ3VyYXRpb24KS25vd24gc2VjdXJpdHkgZ2FwcyAmIGZ1dHVyZSBlbmhhbmNlbWVudHM=";

test("returns null if the Github returns a error", async () => {
  const mockClient = {
    repos: {
      getContents: async () => ({})
    }
  };
  expect(await hasSecurityMd(mockClient, "bar")).toEqual(null);
});

test("returns true if security.md has proper content", async () => {
  const mockClient = {
    repos: {
      getContents: async () => ({
        data: {
          content: base64encodedStr
        }
      })
    }
  };
  expect(await hasSecurityMd(mockClient, "bar")).toEqual(true);
});

test("returns null if security.md is not found", async () => {
  const mockClient = {
    repos: {
      getContents: async () => ({ data: { content: "" } })
    }
  };
  expect(await hasSecurityMd(mockClient, "bar")).toEqual(null);
});
