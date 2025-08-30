import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-dark text-white vh-100 p-3" style={{ width: "250px" }}>
      <h4 className="text-center mb-4">Admin</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link text-white" to="/dashboard">
            Inicio
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/users">
            Usuarios
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/products">
            Productos
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/roles">
            Roles
          </Link>
        </li>
      </ul>
    </div>
  );
}
