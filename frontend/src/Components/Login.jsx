import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login, updateField, setMsg, resetFields } from "../Store/Slices/User";

function Login() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();

    if (!user.username || !user.password) {
      dispatch(setMsg("Veuillez remplir tous les champs."));
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
      credentials: "include",
    });

    const data = await response.json();
    if (response.status === 200) {
      dispatch(login(data));
      dispatch(resetFields());
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
      dispatch(setMsg(""));
      dispatch(resetFields());
    };
  }, [dispatch]);

  return (
    <main className="login">
      <form onSubmit={submitHandler}>
        {user.msg && <p className="error user-msg">{user.msg}</p>}

        <label htmlFor="username">Nom d'utilisateur</label>
        <input
          type="text"
          name="username"
          id="username"
          value={user.username}
          onChange={handleChange}
          placeholder="Entrez votre nom d'utilisateur"
          required
        />

        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Entrez votre mot de passe"
          required
        />

        <button type="submit">Connexion</button>
      </form>
    </main>
  );
}

export default Login;
