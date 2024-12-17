const checkUserPermission = (resourceParam = "id") => {
  return (req, res, next) => {
    try {
      const userIdFromSession = req.session.user.id;
      const userRole = req.session.user.role_id;
      const userIdToDelete = req.params[resourceParam];

      // Vérifiez si l'utilisateur est soit le propriétaire, soit un administrateur
      if (userIdFromSession !== userIdToDelete && userRole !== 1) {
        return res.status(404).json({
          //   msg: "Accès refusé : Vous n'êtes pas autorisé à effectuer cette action.",
        });
      }

      next(); // L'utilisateur est autorisé, passez au middleware suivant
    } catch (error) {
      console.error("Erreur lors de la vérification des permissions :", error);
      res.status(500).json({
        msg: "Erreur serveur lors de la vérification des permissions",
      });
    }
  };
};

export default checkUserPermission;
