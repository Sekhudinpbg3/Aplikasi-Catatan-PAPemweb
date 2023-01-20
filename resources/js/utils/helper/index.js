import axios from "axios";

const defineApi = ({ token }) => {
  const Ax = axios.create({
    baseURL: "/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return Ax;
};

export { defineApi };
