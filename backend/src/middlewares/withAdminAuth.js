// Middleware pour vérifier si l'utilisateur est authentifié avec le rôle 'admin'
export default (req, res, next) => {
  console.log("Session:", req.session);
  if (req.session && req.session.user) {
    if (req.session.user.role_id === 1) {
      // Vérifiez le rôle (1 pour 'admin')
      next();
    } else {
      res.status(403).json({ msg: "Accès refusé" }); // Message d'accès refusé pour les rôles non autorisés
    }
  } else {
    res.status(401).json({ msg: "Vous devez être connecté" }); // Message d'erreur si non authentifié
  }
};
