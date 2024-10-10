import React from "react";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { isLogged, role_id } = useSelector((state) => state.user);

  if (!isLogged || !allowedRoles.includes(role_id)) {
    return <h1>404 - Not Found</h1>; // Affiche le message NOT FOUND
  }

  return element; // Retourne l'élément protégé si autorisé
};

export default ProtectedRoute;
