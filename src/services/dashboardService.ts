import axios from "axios";
import type { DashboardResponse } from "../interface/dashboardResponse";

export const dashboardData = async () => {
  const token = localStorage.getItem("jwt");
  // Obtén las variables de entorno para la URL base y el puerto.
  const API_BASE_URL =
    import.meta.env.BACKEND_API_BASE_URL || "http://localhost";
  const API_PORT = import.meta.env.PORT_BACKEND_API_PORT || "3000";
  return axios.get<DashboardResponse>(
    `${API_BASE_URL}:${API_PORT}/api/dashboard`,
    {
      withCredentials: true, // <-- Envía la cookie sessionID
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
