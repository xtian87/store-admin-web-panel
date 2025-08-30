// Componente principal del módulo de usuarios.
import { useEffect, useState } from "react";
import type { User } from "../../interface/user";
import { UserCard } from "./UserCard";
import { UserFormModal } from "./UserFormModal";
import { AlertMessage } from "../alert/AlertMessage";
import {
  getUsers,
  updateUser,
  createUser,
  deleteUser,
} from "../../services/user.service"; // Adjust the path if needed
import type { UserFormData } from "./UserFormData";

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [alert, setAlert] = useState({ show: false, message: "", color: "" });

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = () => handleOpenModal(null);

  const handleOpenModal = (user: User | null) => {
    setUserToEdit(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUserToEdit(null);
  };

  const handleSaveUser = async (formData: UserFormData, userId?: number) => {
    try {
      let message = "";
      if (userId) {
        await updateUser(userId, formData);
        message = "Usuario actualizado exitosamente.";
      } else {
        await createUser(formData);
        message = "Usuario creado exitosamente.";
      }

      setAlert({
        show: true,
        message: message,
        color: "success",
      });
      fetchUsers(); // Recargar la lista después de guardar
      handleCloseModal(); // Cierra el modal solo si el guardado es exitoso
    } catch (error) {
      console.error("Error saving user:", error);
      let errorMessage = "Ocurrió un error al guardar los datos.";
      // Si el error tiene una propiedad 'response.data', lo usamos
      const axiosError = error as any;
      if (axiosError.response?.data?.message) {
        errorMessage = axiosError.response.data.message;
      }

      setAlert({
        show: true,
        message: errorMessage,
        color: "danger",
      });
    }
  };

  const handleDeleteUser = async (id?: number) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar a este usuario?")
    ) {
      try {
        await deleteUser(id!);
        fetchUsers(); // Recargar la lista después de eliminar
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-5">
        <header className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3">Gestión de Usuarios</h1>

          {/* Utiliza el componente de alerta reutilizable */}
          {alert.show && (
            <AlertMessage
              message={alert.message}
              color={alert.color as "success" | "danger"}
              onClose={() => setAlert({ ...alert, show: false })}
            />
          )}

          <button onClick={handleAddUser} className="btn btn-primary">
            <span className="me-2">+</span> Agregar Usuario
          </button>
        </header>

        {isLoading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "200px" }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={handleOpenModal}
                onDelete={handleDeleteUser}
              />
            ))}
          </div>
        )}

        <UserFormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveUser}
          userToEdit={userToEdit}
        />
      </div>
    </div>
  );
};
