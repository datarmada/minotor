const basicDataFetcher = (requestOptions, route, callback) => async (
  ...args
) => {
  try {
    const response = await fetch(
      `http://0.0.0.0:8888/${route}`,
      requestOptions
    );
    callback(response, ...args);
  } catch (err) {
    console.error(err);
  }
};

export const postDataFetcher = (route, callback, body) =>
  basicDataFetcher(
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    },
    route,
    callback
  );

export const getDataFetcher = (route, callback) =>
  basicDataFetcher(
    {
      method: 'GET',
    },
    route,
    callback
  );

export default basicDataFetcher;
