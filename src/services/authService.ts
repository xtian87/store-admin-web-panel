import axios from "axios";

export const sendLoginData = async (token: string) => {
  const API_BASE_URL =
    import.meta.env.BACKEND_API_BASE_URL || "http://localhost";
  const API_PORT = import.meta.env.PORT_BACKEND_API_PORT || "3000";
  return axios.post(
    `${API_BASE_URL}:${API_PORT}/api/login`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true, // <-- Envía cookies al backend
    }
  );
};
