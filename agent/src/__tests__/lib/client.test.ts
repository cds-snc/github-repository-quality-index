import { getClient } from "../../lib/client";

test("returns an octokit client", () => {
  const client = getClient();
  expect(client instanceof Object);
});
