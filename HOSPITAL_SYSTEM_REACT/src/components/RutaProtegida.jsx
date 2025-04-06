
import { Navigate } from "react-router-dom";

const RutaProtegida = ({ children, rolPermitido }) => {
  const rolUsuario = sessionStorage.getItem("rol");

  if (!rolUsuario || rolUsuario !== rolPermitido) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RutaProtegida;