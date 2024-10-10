import Auth from "../model/Auth.js";
import bcrypt from "bcrypt";

const SALT = 10;

// Fonction pour valider les emails
const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const create = async (req, res) => {
  try {
    const { username, password, email, confirmEmail } = req.body;

    // Vérification que tous les champs requis sont remplis
    if (!username || !password || !email || !confirmEmail) {
      return res
        .status(400)
        .json({ msg: "Tous les champs doivent être remplis." });
    }

    // Vérification du type de champ
    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      typeof email !== "string" ||
      typeof confirmEmail !== "string"
    ) {
      return res.status(400).json({ msg: "Type de champ invalide." });
    }

    // Vérification que l'email a un format valide
    if (!isValidEmail(email)) {
      return res.status(400).json({ msg: "Format d'email invalide." });
    }

    // Vérification que les mots de passe respectent une longueur minimale (par exemple, 6 caractères)
    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Le mot de passe doit comporter au moins 6 caractères." });
    }

    // Vérification que l'email et la confirmation correspondent
    if (email !== confirmEmail) {
      return res.status(400).json({ msg: "Les emails ne correspondent pas" });
    }

    // Vérification si l'utilisateur existe déjà par username ou email
    const [[existingUser]] = await Auth.findOneByUsername(username);
    const [[existingEmail]] = await Auth.findOneByEmail(email);

    if (existingUser) {
      return res.status(400).json({ msg: "Le nom d'utilisateur existe déjà" });
    }

    if (existingEmail) {
      return res.status(400).json({ msg: "L'adresse e-mail existe déjà" });
    }

    // Hachage du mot de passe
    const hash = await bcrypt.hash(password, SALT);
    const [response] = await Auth.create({ username, hash, email }); // Ajout de l'email

    if (response.affectedRows === 1) {
      res.status(201).json({ msg: "Utilisateur créé" });
    } else {
      res.status(500).json({ msg: "Utilisateur non créé" });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const [[user]] = await Auth.findOneByUsername(username);

    if (!user) {
      res.status(400).json({ msg: "User not found" });
    }
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      console.log(match);
      if (match) {
        const userSessionData = {
          id: user.id,
          username: user.username,
          role_id: user.role_id,
        };

        req.session.user = userSessionData;
        res.status(200).json({
          msg: "User logged in",
          isLogged: true,
          user: userSessionData,
        });
      } else {
        res.status(400).json({ msg: "Username or Password invalid" });
      }
    }
  } catch (err) {
    res.status(500).json({ msg: err.msg });
  }
};

const logout = async (req, res) => {
  try {
    // destruction de la session en BDD (store sql)
    req.session.destroy();
    // suppression du cookie de session
    res.clearCookie("connect.sid");
    res.status(200).json({ msg: "User logged out", isLogged: false });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const check_auth = async (req, res) => {
  const { user } = req.session;
  // console.log("check-auth", user)
  if (user) {
    res.json({ isLogged: true, user });
  } else {
    res.status(401).json({ isLogged: false });
  }
};

export { create, login, logout, check_auth };
