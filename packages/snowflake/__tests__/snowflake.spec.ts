import snowflake from "../internal/snowflake";
it("create 5000", async () => {
  const nextID = snowflake();
  const count = 5000;
  const array = await Promise.all(Array(count).fill(0).map(nextID))
  expect(new Set(array).size).toBe(count);
  expect(array).toEqual(array.slice(0).sort())
})
