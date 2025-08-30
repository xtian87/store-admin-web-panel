// Componente para mostrar un usuario en formato de tarjeta.
import type { User } from "../../interface/user";
interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <div className="d-flex align-items-center mb-2">
              <div
                className="rounded-circle bg-light d-flex justify-content-center align-items-center me-3"
                style={{ width: "40px", height: "40px" }}
              >
                <span className="text-muted fw-bold">
                  {user.name ? user.name[0] : "U"}
                </span>
              </div>
              <h5 className="card-title mb-0">
                {user.name} {user.last_name}
              </h5>
            </div>
            <p className="card-text text-muted mb-1">
              <small className="fw-bold text-dark">Email:</small> {user.email}
            </p>
            <p className="card-text text-muted mb-1">
              <small className="fw-bold text-dark">Rol:</small> {user.role.text}
            </p>
            <p className="card-text text-muted">
              <small className="fw-bold text-dark">Estado:</small>{" "}
              {user.status ? "Activo" : "Inactivo"}
            </p>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <button
              onClick={() => onEdit(user)}
              className="btn btn-outline-primary btn-sm me-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil"
                viewBox="0 0 16 16"
              >
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5.5 14h.5a.5.5 0 0 1 .5-.5v-.5a.5.5 0 0 1-.5-.5H5a.5.5 0 0 1-.5-.5v-.5a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1-.5-.5h-.5a.5.5 0 0 1-.5-.5v-.293z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(user.id)}
              className="btn btn-outline-danger btn-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
