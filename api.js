export function myHTTP() {
  return {
    get(url, cb) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => cb(null, data))
        .catch((err) => cb(`error.statusCode ${err}`, null));
    },
  };
}
