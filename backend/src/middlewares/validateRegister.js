import { check } from "express-validator";

const validateRegister = [
  check("username", "Le nom d'utilisateur est requis").notEmpty(),
  check("password", "Le mot de passe est requis").notEmpty(),
  check(
    "confirmPassword",
    "La confirmation du mot de passe est requise"
  ).notEmpty(),
  check("email", "L'adresse e-mail est requise").notEmpty(),
  check("confirmEmail", "La confirmation de l'e-mail est requise").notEmpty(),
  check("email", "Format d'email invalide").isEmail(),
  check(
    "password",
    "Le mot de passe doit comporter au moins 8 caractères, avec 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial"
  )
    .isLength({ min: 8 })
    .matches(/[A-Z]/)
    .matches(/[a-z]/)
    .matches(/[0-9]/)
    .matches(/[@$!%*?&]/),
  check("confirmPassword", "Les mots de passe ne correspondent pas").custom(
    (value, { req }) => value === req.body.password
  ),
  check("confirmEmail", "Les emails ne correspondent pas").custom(
    (value, { req }) => value === req.body.email
  ),
];

export default validateRegister;
