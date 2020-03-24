export default (requestOptions, route, callback) => async (...args) => {
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
