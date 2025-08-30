import { useEffect, useState } from "react";
import { format } from "date-fns";
import type { UserFormData } from "./UserFormData";
import type { UserFormModalProps } from "../../interface/UserFormModalProps";

const initialFormState = {
  name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "", // 1. Nuevo campo para confirmar la contraseña
  birthday: "",
  role_id: 1,
  uid: "placeholder_uid",
  status: true,
};

export const UserFormModal: React.FC<UserFormModalProps> = ({
  isOpen,
  onClose,
  userToEdit,
  onSave,
}: UserFormModalProps) => {
  const [formData, setFormData] = useState<
    UserFormData & { confirm_password?: string }
  >(initialFormState);
  const [passwordMatchError, setPasswordMatchError] = useState(false); // 2. Nuevo estado para el error

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        name: userToEdit.name || "",
        last_name: userToEdit.last_name || "",
        email: userToEdit.email || "",
        birthday: userToEdit.birthday
          ? format(new Date(userToEdit.birthday), "yyyy-MM-dd")
          : "",
        role_id: userToEdit.role_id,
        uid: userToEdit.uid,
        status: userToEdit.status ?? true,
        password: "",
        confirm_password: "", // También se vacía al editar
      });
    } else {
      setFormData(initialFormState);
    }
    setPasswordMatchError(false); // Resetea el error cuando se abre el modal
  }, [userToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 3. Verificación de contraseñas, solo si se está creando un nuevo usuario
    if (!userToEdit && formData.password !== formData.confirm_password) {
      setPasswordMatchError(true);
      return; // Detiene el envío si no coinciden
    }

    // Crea una nueva instancia de datos para la API
    const dataToSend = { ...formData };

    // Si la fecha de nacimiento existe, la convierte a formato ISO-8601
    if (dataToSend.birthday) {
      // Formato a YYYY-MM-DDTHH:mm:ss.sssZ para que sea aceptado por la API
      dataToSend.birthday = new Date(dataToSend.birthday).toISOString();
    }

    // 4. Se asegura de no enviar el campo `confirm_password` al backend
    delete dataToSend.confirm_password;

    // Llama a la función onSave proporcionada por el componente padre
    // y pasa el ID del usuario a editar si existe
    await onSave(dataToSend, userToEdit?.id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`modal ${isOpen ? "d-block" : ""}`}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {userToEdit ? "Editar Usuario" : "Agregar Usuario"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Apellido</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Fecha de Nacimiento</label>
                <input
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Rol</label>
              </div>

              {/* Contraseña y Confirmar Contraseña solo para crear usuarios */}
              {!userToEdit && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Confirmar Contraseña</label>
                    <input
                      type="password"
                      name="confirm_password"
                      value={formData.confirm_password}
                      onChange={handleChange}
                      className={`form-control ${
                        passwordMatchError ? "is-invalid" : ""
                      }`}
                      required
                    />
                    {passwordMatchError && (
                      <div className="invalid-feedback">
                        Las contraseñas no coinciden.
                      </div>
                    )}
                  </div>
                </>
              )}

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {userToEdit ? "Guardar Cambios" : "Agregar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
