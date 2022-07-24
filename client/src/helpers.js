// Save login response -> user's name and token -> to session storage.
export const authenticate = (response, next) => {
  if (window !== "undefined") {
    sessionStorage.setItem("token", JSON.stringify(response.data.token));
    sessionStorage.setItem("user", JSON.stringify(response.data.name));
  }
  next();
};

// Access token from session storage.
export const getToken = () => {
  if (window !== "undefined") {
    if (sessionStorage.getItem("token")) {
      return JSON.parse(sessionStorage.getItem("token"));
    }
  }
  return false;
};

// Access user's name from session storage.
export const getUser = () => {
  if (window !== "undefined") {
    if (sessionStorage.getItem("user")) {
      return JSON.parse(sessionStorage.getItem("user"));
    }
  }
  return false;
};

// Remove token from session storage (logout).
export const logOut = (next) => {
  if (window !== "undefined") {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  }
  next();
};
