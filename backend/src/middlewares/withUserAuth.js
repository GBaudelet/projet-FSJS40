// Middleware pour vérifier l'authentification et l'autorisation des utilisateurs
export default (allowedRoles) => (req, res, next) => {
  // Vérifiez si la session existe et si l'utilisateur est connecté
  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: "Utilisateur non authentifié" });
  }

  const { role_id } = req.session.user;

  // Vérifiez si le rôle de l'utilisateur est dans la liste des rôles autorisés
  if (!allowedRoles.includes(role_id)) {
    return res.status(404).json({ message: "Accès refusé" });
  }

  return next(); // L'utilisateur a accès, passez au middleware suivant
};
