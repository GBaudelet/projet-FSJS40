import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setMsg, updateField, resetFields } from "../Store/Slices/User";

function Register() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();

    if (
      !user.username ||
      !user.email ||
      !user.confirmEmail ||
      !user.password ||
      !user.confirmPassword
    ) {
      dispatch(setMsg("Remplissez tous les champs"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      dispatch(setMsg("L'adresse email n'est pas valide"));
      return;
    }

    if (user.email !== user.confirmEmail) {
      dispatch(setMsg("Les adresses email ne correspondent pas"));
      return;
    }

    if (user.password !== user.confirmPassword) {
      dispatch(setMsg("Les mots de passe ne correspondent pas"));
      return;
    }

    if (user.password.length < 8) {
      dispatch(setMsg("Le mot de passe doit contenir au moins 8 caractères"));
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(user.password)) {
      dispatch(
        setMsg(
          "Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial"
        )
      );
      return;
    }

    const response = await fetch("/api/v1/authentication/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        email: user.email,
        confirmEmail: user.confirmEmail,
        password: user.password,
        confirmPassword: user.confirmPassword,
      }),
      credentials: "include",
    });

    const data = await response.json();
    if (response.status === 201) {
      dispatch(resetFields());
      navigate("/login");
    } else {
      dispatch(setMsg(data.msg));
    }
  }

  function handleChange(e) {
    dispatch(
      updateField({
        name: e.target.name,
        value: e.target.value,
      })
    );
  }

  useEffect(() => {
    return () => {
      dispatch(setMsg(""));
      dispatch(resetFields());
    };
  }, [dispatch]);

  return (
    <main className="register">
      <form onSubmit={submitHandler}>
        {typeof user.msg === "string" && (
          <p className="error user-msg">{user.msg}</p>
        )}

        <label htmlFor="username">Nom d'utilisateur</label>
        <input
          type="text"
          name="username"
          id="username"
          value={user.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        <label htmlFor="confirmEmail">Confirmez l'email</label>
        <input
          type="email"
          name="confirmEmail"
          id="confirmEmail"
          value={user.confirmEmail}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Mot de passe"
          required
        />

        <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={user.confirmPassword}
          onChange={handleChange}
          placeholder="Mot de passe"
          required
        />

        <button type="submit">S'inscrire</button>
      </form>
    </main>
  );
}

export default Register;
