import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "../features/auth/Login";
import { Users } from "../components/user/User";
import ProtectedRoute from "./protectedRoute"; // <-- Importa el nuevo componente
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { createContext, useContext, useEffect, useState } from "react";
import { dashboardData } from "../services/dashboardService";

// 1. Define el contexto
interface DashboardContextType {
  name: string;
  message: string;
  isLoading: boolean;
}
const DashboardContext = createContext<DashboardContextType>({
  name: "",
  message: "",
  isLoading: true,
});

// 2. Crea un proveedor para el contexto
const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Llama al servicio para obtener los datos
    dashboardData()
      .then((response) => {
        setName(response.data.user.name);
        setMessage(response.data.message);
      })
      .catch((err) => {
        console.error("Error fetching dashboard data:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Proporciona los valores a los componentes hijos
  return (
    <DashboardContext.Provider value={{ name, message, isLoading }}>
      {children}
    </DashboardContext.Provider>
  );
};

// 3. Define un hook personalizado para usar el contexto
const useDashboardData = () => useContext(DashboardContext);

// Componente Dashboard
const Dashboard = () => {
  const { message, isLoading } = useDashboardData();

  if (isLoading) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Bienvenido al Panel de Administración</h1>
      <p>{message}</p>
    </div>
  );
};

// Nuevo componente de layout que incluye el Sidebar
const MainLayout = () => {
  const { name } = useDashboardData();
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="d-flex flex-column flex-grow-1">
        <Topbar name={name} />
        <main className="flex-grow-1 p-4 bg-light">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// Componentes ficticios para completar el ejemplo
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta para el login, sin el layout del panel de admin */}
        <Route path="/" element={<Login />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route
            element={
              // 4. Envuelve el layout con el proveedor de contexto
              <DashboardProvider>
                <MainLayout />
              </DashboardProvider>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
