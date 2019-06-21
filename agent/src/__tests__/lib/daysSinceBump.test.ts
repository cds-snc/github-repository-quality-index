import { daysSinceBump } from "../../lib/daysSinceBump";

process.env.ORGANIZATION = "foo";

test("returns null if the Github returns a error", async () => {
  const mockClient = {
    pulls: {
      list: async () => ({})
    }
  }
  expect(await daysSinceBump(mockClient, "bar")).toEqual(null);
});

test("returns null if there are no prs with the correct label", async () => {
  let l: any[] = [];
  const mockClient = {
    pulls: {
      list: async () => ({data: [{"labels": []}, {"labels": l}]})
    }
  }
  expect(await daysSinceBump(mockClient, "bar")).toEqual(null);
});

test("returns the number of days since the last pr with the correct label", async () => {
  let d = new Date();
  d.setDate(d.getDate() - 2);
  console.log(d)
  const mockClient = {
    pulls: {
      list: async () => ({data: [
        {"closed_at": d, "labels": [{"name": "dependencies"}]}
      ]})
    }
  }
  expect(await daysSinceBump(mockClient, "bar")).toEqual(2);
});