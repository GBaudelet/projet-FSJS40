import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setMsg, updateField, resetFields } from "../store/Slices/user";

function Register() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    if (!user.username || !user.password || !user.email || !user.confirmEmail) {
      dispatch(setMsg("Remplissez tous les champs"));
      return;
    }

    // Vérifiez que l'email et la confirmation de l'email correspondent
    if (user.email !== user.confirmEmail) {
      dispatch(setMsg("Les adresses email ne correspondent pas"));
      return;
    }

    const response = await fetch("/api/v1/authentication/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include", // Assurez-vous que les cookies sont inclus dans la requête
    });

    const data = await response.json();
    if (response.status === 201) {
      dispatch(resetFields()); // Réinitialiser les champs après une inscription réussie
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
      dispatch(setMsg("")); // Nettoyer le message d'erreur
      dispatch(resetFields()); // Nettoyer les champs lorsque le composant se démonte
    };
  }, [dispatch]);

  return (
    <main className="register">
      <form onSubmit={submitHandler}>
        {user.msg && <p className="error user-msg">{user.msg}</p>}

        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={user.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={user.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="confirmEmail">Confirm Email</label>
        <input
          type="email"
          name="confirmEmail"
          id="confirmEmail"
          value={user.confirmEmail}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
      </form>
    </main>
  );
}

export default Register;
