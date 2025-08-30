import type { UserFormData } from "../components/user/UserFormData";
import type { Role } from "./Role";
import type { User } from "./user";
// Modal para crear o editar un usuario.

export interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  userToEdit: User | null;
  onSave: (formData: UserFormData, userId?: number) => void;
  roles: Role[];
}
