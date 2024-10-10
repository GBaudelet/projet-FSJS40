import withAdminAuth from "../middlewares/withAdminAuth.js";
import withUserAuth from "../middlewares/withUserAuth.js";

export default function withBothAuth(req, res, next) {
  // Vérifiez si l'utilisateur est authentifié en tant qu'utilisateur
  withUserAuth(req, res, (err) => {
    if (err) {
      // Si l'utilisateur n'est pas authentifié, vérifiez s'il est administrateur
      return withAdminAuth(req, res, next);
    }
    // Si l'utilisateur est authentifié, passez à la suite
    next();
  });
}
