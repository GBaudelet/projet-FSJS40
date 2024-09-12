import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  // États pour gérer les valeurs du formulaire
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // État pour gérer les erreurs
  const [success, setSuccess] = useState(""); // État pour gérer les messages de succès

  // Fonction pour gérer la soumission du formulaire
  async function onSubmitHandler(e) {
    e.preventDefault();

    // Validation simple des champs
    if (!username || !email || password.length <= 3) {
      setError(
        "Tous les champs sont requis et le mot de passe doit contenir plus de 3 caractères"
      );
      return;
    }

    // Création de l'objet utilisateur
    const user = {
      username,
      email,
      password,
    };

    try {
      // Envoi des données au serveur
      const response = await fetch("http://localhost:9000/api/v1/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      // Vérification de la réponse du serveur
      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Erreur lors de l'envoi des données : ${errorDetails}`);
      }

      // Réinitialisation des champs du formulaire après la soumission
      setUsername("");
      setEmail("");
      setPassword("");
      setSuccess("Utilisateur enregistré avec succès");
      setError(""); // Réinitialisation des erreurs
    } catch (error) {
      setError(error.message);
      setSuccess(""); // Réinitialisation des messages de succès
    }
  }

  return (
    <main>
      <Link to={"/"}>Back to home</Link>

      <form onSubmit={onSubmitHandler}>
        <legend>Register</legend>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>
      </form>
    </main>
  );
}

export default Register;
