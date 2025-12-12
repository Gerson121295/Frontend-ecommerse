import { DeleteUserButton } from "./DeleteUserButton";


// UserRow.jsx
export const UserRow = ({ user }) => {
  const roleColor = (role) => {
    switch (role) {
      case "ROLE_ADMIN":
        return "bg-primary";
      case "ROLE_ASSISTANT":
        return "bg-warning text-dark";
      case "ROLE_USER":
        return "bg-info text-dark";
      default:
        return "bg-secondary";
    }
  };

  return (
    <>
      {/* Nombre */}
      <td className="fw-semibold text-capitalize">{user.nombre}</td>

      {/* Apellido */}
      <td className="text-capitalize">{user.apellido}</td>

      {/* Username */}
      <td>
        <div className="d-flex align-items-center">
          <div>
            <span className="fw-bold text-primary">{user.username}</span>
          </div>
        </div>
      </td>

      {/* Email + Teléfono */}
      <td>
        <div className="d-flex flex-column">
          <span className="fw-semibold">{user.email}</span>
          <span className="text-muted small">
            <i className="bi bi-phone me-1"></i>
            {user.telefono}
          </span>
        </div>
      </td>

      {/* Roles */}
      <td>
        <div className="d-flex flex-wrap gap-1">
          {user.roles.map((role, idx) => (
            <span key={idx} className={`badge ${roleColor(role)}`}>
              {role.replace("ROLE_", "")}
            </span>
          ))}
        </div>
      </td>

      {/* Acciones */}
      <td>
        <div className="d-flex gap-2">
          <DeleteUserButton user={user} /> 
        </div>
      </td>
    </>
  );
};
