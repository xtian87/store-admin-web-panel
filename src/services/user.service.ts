import axios from "axios";
import type { User } from "../interface/user";

// Obtén las variables de entorno para la URL base y el puerto.
const API_BASE_URL = import.meta.env.BACKEND_API_BASE_URL || "http://localhost";
const API_PORT = import.meta.env.PORT_BACKEND_API_PORT || "3000";

// Configuración de Axios para manejar cookies.
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}:${API_PORT}/api/users`,
  withCredentials: true,
});

export const getUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>("/");
  return response.data;
};

export const createUser = async (
  userData: Omit<User, "id" | "role" | "created_at">
): Promise<User> => {
  const response = await apiClient.post<User>("/", userData);
  return response.data;
};

export const updateUser = async (
  id: number,
  userData: Partial<Omit<User, "id" | "role" | "created_at">>
): Promise<User> => {
  const response = await apiClient.put<User>(`/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await apiClient.delete(`/${id}`);
};
