import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login, updateField, setMsg, resetFields } from "../store/Slices/user";

function Login() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    if (!user.username || !user.password) {
      dispatch(setMsg("Remplissez tous les champs"));
      return;
    }

    const response = await fetch("/api/v1/authentication/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    });

    const data = await response.json();
    if (response.status === 200) {
      dispatch(login(data));
      dispatch(resetFields()); // Réinitialiser les champs après une connexion réussie
      navigate("/");
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
    <main>
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

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </main>
  );
}

export default Login;
