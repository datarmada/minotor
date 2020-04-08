const buildBasicFetcher = (requestOptions, route, callback) => async (
  ...args
) => {
  try {
    const response = await fetch(`http://0.0.0.0:8888/${route}`, {
      ...requestOptions,
    });
    callback(response, ...args);
  } catch (err) {
    console.error(err);
  }
};

export const buildJsonPostFetcher = (route, callback, body) => {
  const abortController = new AbortController();
  return {
    fetchData: buildBasicFetcher(
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        signal: abortController.signal,
      },
      route,
      callback
    ),
    abortController,
  };
};

export const buildFilePostFetcher = (route, callback, file) => {
  const abortController = new AbortController();
  return {
    fetchData: buildBasicFetcher(
      {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        file,
        signal: abortController.signal,
      },
      route,
      callback
    ),
    abortController,
  };
};

export const buildGetFetcher = (route, callback) => {
  const abortController = new AbortController();

  return {
    fetchData: buildBasicFetcher(
      {
        method: 'GET',
      },
      route,
      callback
    ),
    abortController,
  };
};

export default buildBasicFetcher;
