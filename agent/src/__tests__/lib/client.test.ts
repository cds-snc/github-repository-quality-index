import { getClient } from "../../lib/client";

test("returns an octokit client", () => {
  const client = getClient("test");
  expect(client instanceof Object);
});
