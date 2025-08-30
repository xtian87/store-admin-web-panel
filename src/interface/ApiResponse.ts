// Interfaz para la respuesta del backend
export interface ApiResponse {
  success: boolean;
  message: string;
  errorCode?: string;
}
