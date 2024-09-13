import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toggleMenu } from "../store/Slices/menu";
import { setMsg, updateField } from "../store/Slices/user";

function Register() {
  const menu = useSelector((state) => state.menu);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (menu.isOpen) dispatch(toggleMenu());
    return () => {
      dispatch(updateField({ username: user.username, password: "" }));
    };
  }, []);

  async function submitHandler(e) {
    e.preventDefault();
    if (!user.username || !user.password) {
      setMsg("Remplissez tous les champs");
      return;
    }

    const response = await fetch("/api/v1/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    if (response.status === 201) {
      navigate("/login");
    } else {
      dispatch(setMsg(data.msg));
    }
  }

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
          onChange={(e) =>
            dispatch(
              updateField({
                ...user,
                [e.target.name]: e.target.value,
              })
            )
          }
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={(e) =>
            dispatch(
              updateField({
                ...user,
                [e.target.name]: e.target.value,
              })
            )
          }
          required
        />

        <button type="submit">Register</button>
      </form>
    </main>
  );
}

export default Register;
