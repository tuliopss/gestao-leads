export const apiUrl = `http://localhost:3000`;

export const requestConfig = (method, data) => {
  let config;

  if (method === "DELETE" || data === null) {
    config = { method, headers: {} };
  } else {
    config = {
      method,
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
  }

  return config;
};
