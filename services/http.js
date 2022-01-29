import axios from "axios";
// import AppError from "./AppError";

// Intercept all Errors
// axios.interceptors.response.use(null, (err) => {
//   const error = new AppError(err);

//   return Promise.reject(error);
// });

// export const baseURL = "https://sellit-ng.herokuapp.com/api/v1";
export const baseURL = "http://127.0.0.1:8080/api/v1";

const defaultOptions = (explicitToken) => ({
  // timeout's the request in 10 minute by default
  timeout: 60 * 10 * 1000, // TODO: 10 minutes might be too long, make to about 3-4 minutes
  // withCredentials: true,
  // credentials: "include",
  // headers: {
  //   authorization: `Bearer ${explicitToken}`,
  // },
});

const buildOptions = (options) => ({
  ...defaultOptions(options?.token),
  ...options,
});
const buildURL = (path) => {
  return baseURL + path;
};

export const http = {
  get: (path, options) =>
    axios.get(options?.url || buildURL(path), buildOptions(options)),
  post: (path, data, options) =>
    axios.post(options?.url || buildURL(path), data, buildOptions(options)),
  patch: (path, data, options) =>
    axios.patch(options?.url || buildURL(path), data, buildOptions(options)),
  delete: (path, options) =>
    axios.delete(options?.url || buildURL(path), buildOptions(options)),
};
