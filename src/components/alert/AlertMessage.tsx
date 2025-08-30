import React from "react";

// Interfaz para las props del componente de alerta
interface AlertMessageProps {
  message: string;
  color: "success" | "danger" | "info" | "warning"; // Define los colores de Bootstrap
  onClose: () => void;
}

/**
 * Componente de alerta reutilizable con estilo de Bootstrap.
 * Muestra un mensaje y un botón para cerrar la alerta.
 *
 * @param {string} message - El mensaje a mostrar en la alerta.
 * @param {string} color - El color de la alerta (ej: 'success', 'danger').
 * @param {Function} onClose - Función a ejecutar cuando se cierra la alerta.
 */
export const AlertMessage: React.FC<AlertMessageProps> = ({
  message,
  color,
  onClose,
}) => {
  return (
    <div
      className={`alert alert-${color} alert-dismissible fade show`}
      role="alert"
    >
      {message}
      <button
        type="button"
        className="btn-close"
        onClick={onClose}
        aria-label="Close"
      ></button>
    </div>
  );
};
