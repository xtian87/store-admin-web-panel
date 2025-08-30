import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.BACKEND_API_BASE_URL || "http://localhost";
const API_PORT = import.meta.env.PORT_BACKEND_API_PORT || "3000";
// Instancia de axios para centralizar la configuración
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}:${API_PORT}/api/login`,
  withCredentials: true, // <-- Centraliza la configuración de cookies
});

const checkSession = async () => {
  try {
    // Una petición a un endpoint de tu backend que solo comprueba si la cookie es válida.
    await apiClient.get("/validate-session", { withCredentials: true });
    return true; // Sesión válida
  } catch {
    return false; // Sesión inválida
  }
};

export default function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSession().then((isValid) => {
      setIsAuthenticated(isValid);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Cargando...</div>; // O un spinner
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
