// Middleware pour vérifier l'authentification et l'autorisation des utilisateurs
export default (allowedRoles) => (req, res, next) => {
  console.log("Session:", req.session); // Vérifiez le contenu de la session

  // Vérifiez si la session existe et si l'utilisateur est connecté
  if (req.session && req.session.user) {
    const { role_id } = req.session.user;

    // Vérifiez si le rôle de l'utilisateur est dans la liste des rôles autorisés
    if (allowedRoles.includes(role_id)) {
      return next(); // L'utilisateur a accès, passez au middleware suivant
    } else {
      // Redirection vers la page d'accueil pour les rôles non autorisés
      return res.redirect("/"); // Remplacez '/' par la route de votre page d'accueil si nécessaire
    }
  } else {
    // Redirection vers la page d'accueil si non authentifié
    return res.redirect("/"); // Remplacez '/' par la route de votre page d'accueil si nécessaire
  }
};
