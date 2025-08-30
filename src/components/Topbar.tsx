// TopBar.tsx
import { Navbar, Dropdown } from "react-bootstrap";

interface TopbarProps {
  name: string;
}

function TopBar({ name }: TopbarProps) {
  return (
    <Navbar bg="light" expand="lg" className="px-3 justify-content-end">
      {/* Notificaciones */}

      {/* Menú de usuario */}
      <Dropdown align="end">
        <Dropdown.Toggle
          variant="light"
          id="dropdown-user"
          className="d-flex align-items-center border-0 bg-transparent"
        >
          <span>{name}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/profile">Perfil</Dropdown.Item>
          <Dropdown.Item href="#/settings">Configuración</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#/logout">Cerrar sesión</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Navbar>
  );
}

export default TopBar;
