const BASE_URL =
  process.env.BASE_URL ??
  (() => {
    throw new Error("BASE_URL environment variable is required");
  })();

export { BASE_URL };
